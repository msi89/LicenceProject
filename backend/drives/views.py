from core.contrib.helpers import FileSystem
from .serializers import (
    DocumentSerializer, FolderSerializer, UploadSerializer, CreateFoldetSerializer)
from rest_framework import serializers, viewsets, status, mixins
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from .models import Document, Folder
from rest_framework.decorators import action
import os
from datetime import date


class FolderViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer

    def list(self, request):
        queryset = self.get_queryset().filter(owner=request.user)
        serializer = FolderSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def cwd(self, request):
        folder = self.get_queryset().filter(
            owner=request.user, name='/', is_deleted=False).first()
        if folder:
            serializer = FolderSerializer(folder)
            return Response(serializer.data)
        raise Response({'detail': 'Root folder not found'}, 404)

    def create(self, request):
        form = CreateFoldetSerializer(data=request.data)
        if form.is_valid():
            result = {}
            parent = Folder.objects.filter(id=form.data.get(
                'parent'), owner=request.user).first()
            if parent:
                print('p', parent.path)
                print('name', form.data.get('name'))
                path = os.path.join(parent.path, form.data.get('name'))
                # replace(' ', '_')
                result['path'] = path
                result['name'] = form.data.get('name')
                result['parent'] = parent.id
                result['owner'] = request.user.id
                serializer = FolderSerializer(data=result)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(serializer.errors,
                                    status=status.HTTP_400_BAD_REQUEST)
            else:
                raise Response({'detail': 'Directory not allowed'})

        else:
            return Response(form.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        folder = self.get_queryset().filter(pk=pk,
                                            owner=request.user, is_deleted=False).first()
        print('folder', folder)
        if folder:
            if folder.name != '/':
                folder.is_deleted = True
                folder.deleted_at = date.today()
                folder.save()
            return Response({}, 204)
        else:
            return Response({'detail': 'Folder not found'}, 404)


class DocumentViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                      viewsets.GenericViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def list(self, request):
        queryset = self.get_queryset(owner=request.user)
        serializer = DocumentSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Document.objects.all()
        doc = get_object_or_404(queryset, pk=pk)
        serializer = DocumentSerializer(doc)
        return Response(serializer.data)

    @ action(detail=False, methods=['post'])
    def upload(self, request):
        form = UploadSerializer(data=request.data)
        if form.is_valid():
            if request.POST.get('directory'):
                directory = Folder.objects.filter(
                    id=request.POST.get('directory'), owner=request.user).first()
            else:
                directory = Folder.objects.filter(
                    name="/", owner=request.user).first()
            if directory is None:
                raise serializers.ValidationError(
                    {'directory': ('directory not valid: {}'.format(
                        request.POST.get('directory')))})

            password = request.POST.get('password', None)
            file = request.FILES['file']
            result = FileSystem().save_file(
                file, f'media/documents/{directory.path}', password)
            result['url'] = "http://{}/{}".format(
                request.get_host(), result['url'])
            result['owner'] = request.user.id
            result['directory'] = directory.id
            serializer = DocumentSerializer(data=result)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors,
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(form.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        pass

from core.contrib.helpers import FileSystem
from .serializers import (
    DocumentSerializer, FolderSerializer, UploadSerializer,
    CreateFoldetSerializer, DownloadSerializer, UpdateFileSerializer)
from rest_framework import serializers, viewsets, status, mixins
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.http import FileResponse
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
                path = os.path.join(
                    parent.path, form.data.get('name')).replace(' ', '_')
                abs_path = os.path.join(os.getcwd(), 'media', path)
                if os.path.exists(abs_path):
                    return Response({'detail': 'Каталог уже существует'}, 400)
                os.makedirs(abs_path)
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
        if folder:
            if folder.name != '/':
                folder.is_deleted = True
                folder.deleted_at = date.today()
                folder.save()
            return Response({}, 204)
        else:
            return Response({'detail': 'Папка не найдена'}, 404)

    @action(detail=False, methods=['get'])
    def trash(self, request):
        queryset = self.get_queryset().filter(owner=request.user, is_deleted=True)
        serializer = FolderSerializer(queryset, many=True)
        return Response(serializer.data)


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def list(self, request):
        queryset = self.get_queryset().filter(owner=request.user)
        serializer = DocumentSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Document.objects.all()
        doc = get_object_or_404(queryset, pk=pk)
        serializer = DocumentSerializer(doc)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
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
            filename = file.name
            result = FileSystem().upload(
                file, f'media/{directory.path}', password)
            result['path'] = result['url']
            result['url'] = "http://{}/{}".format(
                request.get_host(), result['url'])
            result['owner'] = request.user.id
            result['directory'] = directory.id
            result['name'] = filename
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
        doc = self.get_queryset().filter(pk=pk,
                                         owner=request.user,
                                         is_deleted=False).first()
        if doc:
            doc.is_deleted = True
            doc.deleted_at = date.today()
            doc.save()
            return Response({}, 204)
        else:
            return Response({'detail': 'Папка не найдена'}, 404)

    @action(detail=False, methods=['get'])
    def trash(self, request):
        queryset = self.get_queryset().filter(owner=request.user, is_deleted=True)
        serializer = DocumentSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def favorites(self, request):
        queryset = self.get_queryset().filter(
            owner=request.user, is_deleted=False, is_favorite=True)
        serializer = DocumentSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def download(self, request, pk=None):
        form = DownloadSerializer(data=request.data)
        if not form.is_valid():
            return Response(form.errors,
                            status=status.HTTP_400_BAD_REQUEST)
        doc = self.get_queryset().filter(
            owner=request.user, is_deleted=False, pk=pk).first()
        if doc is None:
            return Response({'detail': 'Файл не найден'}, 404)
        filepath = os.path.join(os.getcwd(), doc.path)
        path = FileSystem().decode(filepath, form.data.get('password', ''))
        if os.path.exists(path):
            response = FileResponse(open(path, 'rb'))
            # if os.path.exists(filepath):
            #     os.remove(path)
            return response
        else:
            return Response({'detail': 'invalid password'}, 400)


# def try_update():
#     form = UpdateFileSerializer(data=request.data)
#     if form.is_valid():
#         doc = self.get_queryset().filter(
#             pk=pk,
#             owner=request.user,
#             is_deleted=False).first()
#         if doc:
#             encrypted = form.data.get('encrypted')
#             decrypted = form.data.get('decrypted')
#             name = form.data.get('name')
#             directory = form.data.get('directory')

#             if name is not None:
#                 doc.name = name
#             if directory is not None:
#                 doc.directory = directory
#             if encrypted is not None:
#                 filepath = os.path.join(os.getcwd(), doc.path)
#                 FileSystem().encode(filepath, form.data.get('password', ''))
#                 doc.path = doc.path.replace('.aes', '')
#                 doc.url = doc.url.replace('.aes', '')
#                 doc.is_private = True
#             if decrypted is not None:
#                 filepath = os.path.join(os.getcwd(), doc.path)
#                 FileSystem().decode(filepath, form.data.get('password', ''), True)
#                 doc.path = os.path.splitext(doc.path)[0]
#                 doc.url = os.path.splitext(doc.url)[0]
#                 doc.is_private = False
#             doc.save()
#             return Response({}, 204)
#         else:
#             return Response({'detail': 'Файл не найден'}, 404)
#     else:
#         return Response(form.errors,
#                         status=status.HTTP_400_BAD_REQUEST)

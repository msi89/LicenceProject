from core.contrib.helpers import FileSystem
from .serializers import DocumentSerializer, FolderSerializer, UploadSerializer
from rest_framework import serializers, viewsets, status, mixins
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
# from rest_framework.permissions import IsAdminUser
from .models import Document, Folder
from rest_framework.decorators import action


class FolderViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer


class DocumentViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                      viewsets.GenericViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    # permission_classes = [IsAdminUser]

    def list(self, request):
        queryset = self.get_queryset()
        serializer = DocumentSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Document.objects.all()
        doc = get_object_or_404(queryset, pk=pk)
        serializer = DocumentSerializer(doc)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def upload(self, request):
        print(request.get_full_path())
        print(request.get_host())
        form = UploadSerializer(data=request.data)
        if form.is_valid():
            password = request.POST.get('password')
            directory = request.POST.get('directory')
            file = request.FILES['file']
            result = FileSystem().save_file(file, 'media/documents', password)
            if directory:
                result['directory'] = directory
            result['url'] = "http://{}/{}".format(
                request.get_host(), result['url'])
            if not request.user.is_anonymous:
                result['owner'] = request.user
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

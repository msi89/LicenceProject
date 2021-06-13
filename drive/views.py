from .serializers import DocumentSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
# from rest_framework.permissions import IsAdminUser
from .models import Document


class DocumentListCreateView(viewsets.ModelViewSet):
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

    def create(self, request):
        pass

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass

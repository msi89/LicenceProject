from .serializers import DocumentSerializer
from rest_framework import generics
from rest_framework.response import Response
# from rest_framework.permissions import IsAdminUser
from .models import Document

class DocumentView(generics.ListCreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    # permission_classes = [IsAdminUser]

    def list(self, request):
        queryset = self.get_queryset()
        serializer = DocumentSerializer(queryset, many=True)
        return Response(serializer.data)
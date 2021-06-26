from rest_framework import serializers
from .models import Document, Folder
from core.contrib.serializers import FolderRelatedField, FileRelatedField


class FolderSerializer(serializers.ModelSerializer):
    children = FolderRelatedField(many=True, read_only=True)
    documents = FileRelatedField(many=True, read_only=True)

    class Meta:
        model = Folder
        fields = ('id', 'name', 'parent', 'children',
                  'is_private', 'documents', 'owner', 'created_at', 'updated_at', 'is_deleted', 'deleted_at')


class CreateFoldetSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200, required=True)
    parent = serializers.IntegerField(required=True)

    def validate(self, attrs):
        parent = attrs.get('parent', 0)
        if not Folder.objects.filter(id=parent).exists():
            raise serializers.ValidationError(
                {'parent': ('parent is directory is not valid')})
        return super().validate(attrs)


class UploadSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=200, required=False)
    directory = serializers.IntegerField(required=False)
    file = serializers.FileField()

    def validate(self, attrs):
        directory = attrs.get('directory')
        if directory is not None:
            if not Folder.objects.filter(id=directory).exists():
                raise serializers.ValidationError(
                    {'directory': ('directory not valid')})
        return super().validate(attrs)


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        # fields = '__all__'
        fields = ['id', 'name', 'size', 'is_private', 'owner', 'url',
                  'directory', 'created_at', 'updated_at']

    def create(self, validated_data: dict):
        doc = Document(**validated_data)
        # request = self.context.get("request")
        # if request and hasattr(request, "user"):
        #     doc.owner = request.user
        doc.save()
        return doc

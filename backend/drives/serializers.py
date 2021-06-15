from rest_framework import serializers
from .models import Document, Folder


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = '__all__'


class UploadSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=200, required=False)
    directory = serializers.IntegerField(required=False)
    file = serializers.FileField()

    def validate(self, attrs):
        directory = attrs.get('directory', 0)
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
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            doc.owner = request.user
        doc.save()
        return doc

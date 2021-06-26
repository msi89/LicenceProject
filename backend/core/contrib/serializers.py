from rest_framework.serializers import Serializer, RelatedField


class FolderRelatedField(RelatedField):
    def to_representation(self, instance):
        return {
            'id': instance.id,
            'name': instance.name,
            'is_private':  instance.is_private,
            'is_deleted':  instance.is_deleted,
            'deleted_at':  instance.is_deleted,
            'created_at':  instance.created_at,
            'updated_at':  instance.updated_at,
            'parent':  instance.parent.id,
            # 'owner':  instance.owner.id
        }


class FileRelatedField(RelatedField):
    def to_representation(self, instance):
        return {
            'id': instance.id,
            'name': instance.name,
            'size': instance.size,
            'url': instance.url,
            'is_private':  instance.is_private,
            'is_favorite':  instance.is_favorite,
            'is_deleted':  instance.is_deleted,
            'created_at':  instance.created_at,
            'updated_at':  instance.updated_at,
            'deleted_at':  instance.deleted_at,
            'directory':  instance.directory.id,
            'owner':  instance.owner.id
        }


class RecursiveField(Serializer):
    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass

    def to_representation(self, instance):
        serializer = self.parent.parent.__class__(
            instance, context=self.context)
        return serializer.data

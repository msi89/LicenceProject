from django.db import models
from django.db.models.fields import UUIDField
from mptt.models import MPTTModel, TreeForeignKey
from django.contrib.auth.models import User
import uuid


def upload_to_dir(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'docs/{0}/{1}'.format(instance.author.pk, filename)


class Folder(MPTTModel):
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=50)
    path = models.CharField(max_length=255, null=True, blank=True)
    parent = TreeForeignKey('self', on_delete=models.CASCADE,
                            null=True, blank=True, related_name='children')
    is_private = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(
        User,  on_delete=models.CASCADE, null=True, blank=True)

    class MPTTMeta:
        order_insertion_by = ['name']

    def __str__(self):
        return self.name

    # def tree(self, folder_id):
    #     if folder_id is None:
    #         return []
    #     category = Folder.objects.get(pk=folder_id)
    #     result = self.tree(category.parent_id)
    #     result.append(category)
    #     return result


class Document(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    size = models.IntegerField(default=0)
    path = models.CharField(max_length=255, null=True, blank=True)
    url = models.URLField(max_length=255, null=True, blank=True)
    directory = models.ForeignKey(
        Folder, related_name='documents', on_delete=models.CASCADE, null=True, blank=True)
    is_private = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(null=True, blank=True)
    is_favorite = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name

from django.db import models
from django.contrib.auth.models import User

def upload_to_dir(instance, filename):
  # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
  return 'user_{0}/{1}'.format(instance.author.pk, filename)


class Folder(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=255)
  parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
  is_private = models.BooleanField(default=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  author = models.ForeignKey(User, on_delete=models.CASCADE)

  def __str__(self):
    return self.name

class Document(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=255)
  content = models.FileField(upload_to=upload_to_dir, null=True, blank=True)
  directory = models.ForeignKey(Folder, on_delete=models.CASCADE, null=True, blank=True)
  is_private = models.BooleanField(default=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  author = models.ForeignKey(User, on_delete=models.CASCADE)

  def __str__(self):
    return self.name

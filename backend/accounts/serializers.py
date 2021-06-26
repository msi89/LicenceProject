from rest_framework import serializers
from django.contrib.auth.models import User
from drives.models import Folder
import os


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'last_name', 'first_name', 'id')


class AccountSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=255, required=False)
    email = serializers.EmailField(max_length=255, required=True)
    password = serializers.CharField(
        max_length=60, min_length=8, write_only=True)
    first_name = serializers.CharField(max_length=60, required=False)
    last_name = serializers.CharField(max_length=60, required=False)

    class Meta:
        model = User
        fields = ('username', 'email', 'last_name', 'first_name', 'password')

    def validate(self, attrs):
        email = attrs.get('email', '')
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                {'email': ('Email is already un use')})
        return super().validate(attrs)

    def create(self, validate_data):
        if 'username' not in validate_data:
            validate_data['username'] = validate_data['email']
        user = User.objects.create_user(**validate_data)
        Folder.objects.create(name='/', owner=user, path=str(user.id))
        os.makedirs(os.path.join(os.getcwd(), str(user.id)))
        return user

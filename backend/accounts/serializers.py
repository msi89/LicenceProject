from rest_framework import serializers
from django.contrib.auth.models import User


class AccountSerializer(serializers.ModelSerializer):
    username = serializers.EmailField(max_length=255)
    password = serializers.CharField(
        max_length=60, min_length=8, write_only=True)
    first_name = serializers.CharField(max_length=60, required=False)
    last_name = serializers.CharField(max_length=60)

    class Meta:
        model = User
        fields = ('username', 'email', 'last_name', 'first_name', 'password')

    def validate(self, attrs):
        username = attrs.get('username', '')
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError(
                {'email': ('Email is already un use')})
        return super().validate(attrs)

    def create(self, validate_data):
        if 'email' not in validate_data:
            validate_data['email'] = validate_data['username']
        return User.objects.create_user(**validate_data)

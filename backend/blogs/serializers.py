from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Blog

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def validate_email(self, value):
        if value and User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class BlogSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.username", read_only=True)

    class Meta:
        model = Blog
        fields = [
            "id",
            "title",
            "content",
            "author",
            "author_name",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["author", "author_name", "created_at", "updated_at"]

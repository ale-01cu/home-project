from rest_framework import serializers
from .models import Actor, Category, Gender

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
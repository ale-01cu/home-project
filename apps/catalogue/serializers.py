from rest_framework import serializers
from .models import (
    Content, 
    Season
)
        
class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = '__all__'

class ContentSerializer(serializers.ModelSerializer):
    seasons = SeasonSerializer(
        many=True, 
        read_only=True
    )
    class Meta:
        model = Content
        fields = '__all__'
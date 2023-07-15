from rest_framework import serializers
from .models import (
    Content, 
    Season
)
from apps.category.serializers import (
    CategorySerializer, 
    ActorSerializer, 
    GenderSerializer
)
        
class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = '__all__'

class ContentDetailSerializer(serializers.ModelSerializer):
    seasons = SeasonSerializer(
        many=True, 
        read_only=True
    )
    category = CategorySerializer()
    genders = GenderSerializer(many=True)
    actors = ActorSerializer(many=True)
    
    class Meta:
        model = Content
        fields = '__all__'
        
class ContentListSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    genders = GenderSerializer(many=True)
    
    class Meta:
        model = Content
        fields = (
            'id', 
            'photo', 
            'name', 
            'category', 
            'genders', 
            'release_year'
        )
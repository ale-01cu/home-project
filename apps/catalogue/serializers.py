from rest_framework import serializers
from .models import (
    Content, 
    Season,
    Image
)
from apps.category.serializers import (
    CategorySerializer, 
    ActorSerializer, 
    GenderSerializer
)

class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'image')
        
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
    images = ImagesSerializer(many=True)
    
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
            'release_date', 
            'release_year'
        )
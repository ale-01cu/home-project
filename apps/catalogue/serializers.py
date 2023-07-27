from rest_framework import serializers
from .models import (
    Content, 
    Season,
    Image,
    Chapter
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
        
class CharapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ('name', 'subtitle')    
    
class SeasonSerializer(serializers.ModelSerializer):
    chapters = CharapterSerializer(many=True)
    number_of_chapters = serializers.SerializerMethodField()
    
    class Meta:
        model = Season
        fields = '__all__'
        
    def get_number_of_chapters(self, obj):        
        return obj.number_of_chapters

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
        exclude = (
            'create_date', 
            'update_date', 
            'status'
        )
        
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
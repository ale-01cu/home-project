from rest_framework import serializers
from .models import Searches
from django.urls import reverse

# Serializer para mostrar el listado del las busquedas
class SearchesListSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()
    
    class Meta:
        model = Searches
        fields = ("id", 'search_text', 'url')
        
    def get_url(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(
            reverse('content-list') + f'?search={obj.search_text}'
        )
        
# Serializer para crear las busquedas
class SearchesCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Searches
        fields = ('search_text', 'processed_search_text')
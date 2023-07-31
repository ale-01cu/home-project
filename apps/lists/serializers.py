from rest_framework import serializers
from .models import CustomsListItem, CustomsList
from apps.catalogue.serializers import ContentListSerializer

class CustomListsSerializer(serializers.ModelSerializer):
    content = ContentListSerializer(
        read_only=True,
        many=True
    )
    
    class Meta:
        model = CustomsListItem
        fields = ('content',)


class CustomListsSerializer(serializers.ModelSerializer):
    custom_list_items = CustomListsSerializer(
        many=True, 
        read_only=True
    )
    
    class Meta:
        model = CustomsList
        fields = ('name', 'custom_list_items')
        
    


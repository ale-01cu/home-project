from rest_framework import serializers
from .models import CustomsListItem, CustomsList
from apps.catalogue.serializers import ContentListSerializer

class CustomListsSerializerItem(serializers.ModelSerializer):
    content = ContentListSerializer(
        read_only=True,
    )
    
    class Meta:
        model = CustomsListItem
        fields = ('id', 'content',)


class CustomListsSerializer(serializers.ModelSerializer):
    custom_list_items = CustomListsSerializerItem(
        many=True, 
        read_only=True
    )
    
    class Meta:
        model = CustomsList
        fields = ('id', 'name', 'custom_list_items')
        
    


from rest_framework import generics
from .serializers import ContentDetailSerializer, ContentListSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .pagination import ContentPagination
from apps.search.searchEngine import SearchEngine

class ContentListAPIView(generics.ListAPIView):
    serializer_class = ContentListSerializer
    filter_backends = [SearchEngine, DjangoFilterBackend]
    search_fields = [
        'name', 
        'description', 
        'category__name',
        'release_year',
        'platform',
        'countrie',
        'genders__name',
        'actors__full_name'
    ]
    filterset_fields = ['category__name', 'genders__name', 'actors__full_name']
    pagination_class = ContentPagination
    # filterset_class = ContentFilter
    
    def get_queryset(self):
        return self.get_serializer_class().Meta.model.objects.filter(
            status=True).order_by(
                '-release_year',
                '-release_date'
            )
    
class ContentDetailAPIView(generics.RetrieveAPIView):
    serializer_class = ContentDetailSerializer
    
    def get_queryset(self):
        return self.get_serializer_class().Meta.model.objects.filter(status=True)
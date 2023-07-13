from rest_framework import generics
from .serializers import ContentDetailSerializer, ContentListSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .pagination import ContentPagination
from rest_framework.filters import SearchFilter

class ContentListAPIView(generics.ListAPIView):
    serializer_class = ContentListSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = [
        'name', 
        'description', 
        'category__name',
        'release_date',
        'release_year',
        'platform',
        'countrie',
        'genders__name',
        'actors__full_name'
    ]
    filterset_fields = ['category__name']
    pagination_class = ContentPagination
    
    def get_queryset(self):
        return self.get_serializer_class().Meta.model.objects.filter(
            status=True).order_by(
                '-release_year',
                '-release_date'
            ).order_by('-create_date')
    
class ContentDetailAPIView(generics.RetrieveAPIView):
    serializer_class = ContentDetailSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category__name']
    pagination_class = ContentPagination
    
    def get_queryset(self):
        return self.get_serializer_class().Meta.model.objects.filter(status=True)
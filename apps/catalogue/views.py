from rest_framework import generics, views, status
from .serializers import ContentDetailSerializer, ContentListSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .pagination import ContentPagination
from rest_framework.filters import SearchFilter
from django.shortcuts import get_object_or_404
from django.http import StreamingHttpResponse, FileResponse
from django.http import FileResponse

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
            )
    
class ContentDetailAPIView(generics.RetrieveAPIView):
    serializer_class = ContentDetailSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category__name']
    pagination_class = ContentPagination
    
    def get_queryset(self):
        return self.get_serializer_class().Meta.model.objects.filter(status=True)
    
class VideoStreamAPIView(views.APIView):
    
    def get_serializer_class(self):
        return ContentDetailSerializer
    
    def get_queryset(self):
        return self.get_serializer_class().Meta.model.objects.filter(status=True)

    def get(self, request, pk=None):
        # Obtener el objeto de contenido correspondiente al video
        queryset = self.get_queryset()
        content = get_object_or_404(queryset, pk=pk)
        video_url = content.path
        
        chunk_size = 8192 # tamaño de cada fragmento en bytes
        response = StreamingHttpResponse(
            FileResponse(
                open(video_url, 'rb'), 
                content_type='video/mp4'
            ), 
            status=200, 
            reason=None, 
            content_type='video/mp4', 
            charset=None
        )
        response['Content-Disposition'] = 'inline; filename="video.mp4"'
        response['Cache-Control'] = 'no-cache'
        response['X-Accel-Buffering'] = 'no'
        response['Transfer-Encoding'] = 'chunked'
        return response
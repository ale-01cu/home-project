from rest_framework import generics, views, status
from .serializers import ContentDetailSerializer, ContentListSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .pagination import ContentPagination
from rest_framework.filters import SearchFilter
from django.http import StreamingHttpResponse
import os
import re
import mimetypes
from wsgiref.util import FileWrapper
from .rangeFileWrapper import RangeFileWrapper
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Chapter
range_re = re.compile(r'bytes\s*=\s*(\d+)\s*-\s*(\d*)', re.I)

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

#TODO: Hacer esta api
class VideoStreamAPIView(views.APIView):
    
    def get_serializer_class(self):
        return ContentDetailSerializer
    
    def get_queryset(self, **kwargs):
        print(kwargs)
        if 'pk' in kwargs.keys(): 
            return self.get_serializer_class().Meta.model.objects.filter(
                status=True, pk=kwargs['pk']).first()
            
        elif 'chapter_pk' in kwargs.keys(): 
            return Chapter.objects.filter(pk=kwargs['chapter_pk']).first()
            
        return self.get_serializer_class().Meta.model.objects.filter(status=True)
    
    def get(self, request, pk=None, chapter_pk=None):
        user = request.user
        
        if chapter_pk:
            content = self.get_queryset(chapter_pk=chapter_pk)
        
        else:
            content = self.get_queryset(pk=pk)
            
        path = content.path
        print(path)
        
        if 'Range' not in request.headers.keys():
            print(f"{user} intento descargar el contenido {content.name}")
            return Response(
                'No esta permitido descargar este medio', 
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        # Esta validacion se activa cuando se envia el header 'gzip, deflate, br' dentro de 'Accept-Encoding' que normalmente esto es enviado en la peticion de descargar
        if 'Accept-Encoding' in request.headers.keys():
            if request.headers['Accept-Encoding'] == 'gzip, deflate, br':
                print(f"{user} intento descargar el contenido {content.name}")
                
                return Response(
                    'No esta permitido descargar este medio', 
                    status=status.HTTP_401_UNAUTHORIZED
                )
                
        
        range_header = request.META.get('HTTP_RANGE', '').strip()
        range_match = range_re.match(range_header)
        size = os.path.getsize(path)
        content_type, encoding = mimetypes.guess_type(path)
        content_type = content_type or 'application/octet-stream'
        
        if range_match:
            first_byte, last_byte = range_match.groups()
            first_byte = int(first_byte) if first_byte else 0
            last_byte = int(last_byte) if last_byte else size - 1
            
            if last_byte >= size:
                last_byte = size - 1
                
            length = last_byte - first_byte + 1
            resp = StreamingHttpResponse(
                RangeFileWrapper(
                    open(path, 'rb'), 
                    offset=first_byte, 
                    length=length
                ), 
                status=206, 
                content_type=content_type
            )
            resp['Content-Length'] = str(length)
            resp['Content-Range'] = 'bytes %s-%s/%s' % (first_byte, last_byte, size)
            
        else:
            resp = StreamingHttpResponse(
                FileWrapper(
                    open(path, 'rb')
                ), 
                content_type=content_type
            )
            resp['Content-Length'] = str(size)
            
        resp['Accept-Ranges'] = 'bytes'

        if int(resp['Content-Length']) == size and 'Range' not in request.headers.keys():
            print(f"{user} intento descargar el contenido {content.name}")
            return Response(
                'No esta permitido descargar este medio', 
                status=status.HTTP_401_UNAUTHORIZED
            )
            
        return resp
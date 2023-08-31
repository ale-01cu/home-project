import os
import re
import mimetypes
from rest_framework import generics, views, status
from .serializers import (
    ContentDetailSerializer, 
    ContentListSerializer,
    ChapterSerializer
)
from django_filters.rest_framework import DjangoFilterBackend
from .pagination import ContentPagination
from django.http import StreamingHttpResponse
from .rangeFileWrapper import RangeFileWrapper
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Chapter
from apps.search.searchEngine import SearchEngine
from .filter import ContentFilter
import ffmpeg
from django.http import FileResponse

range_re = re.compile(r'bytes\s*=\s*(\d+)\s*-\s*(\d*)', re.I)
 
class ChapterRetrieveApiView(generics.RetrieveAPIView):
    serializer_class = ChapterSerializer
    
    def get_queryset(self):
        queryset = self.get_serializer_class().Meta.model.objects.all()
        return queryset

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
    filterset_fields = ['category', 'genders', 'actors']
    pagination_class = ContentPagination
    filterset_class = ContentFilter
    
    # def get_queryset(self):
    #     return self.get_serializer_class().Meta.model.objects.filter(
    #         status=True).order_by(
    #             '-release_year',
    #             '-release_date'
    #         )

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

#TODO: Hacer esta api
class VideoStreamAPIView(views.APIView):
    
    def get_serializer_class(self):
        return ContentDetailSerializer
    
    
    def get_queryset(self, **kwargs):
        if 'pk' in kwargs.keys(): 
            return self.get_serializer_class().Meta.model.objects.filter(
                status=True, pk=kwargs['pk']).first()
            
        elif 'chapter_pk' in kwargs.keys(): 
            return Chapter.objects.filter(pk=kwargs['chapter_pk']).first()
            
        return self.get_serializer_class().Meta.model.objects.filter(status=True)
        
    def get(self, request, pk=None, chapter_pk=None):
        user = request.user
        print(request.headers['Range'])
        
        if chapter_pk:
            content = self.get_queryset(chapter_pk=chapter_pk)
        else:
            content = self.get_queryset(pk=pk)
            
        path = content.path   
        
        range_header = request.META.get('HTTP_RANGE', '').strip()
        range_match = range_re.match(range_header)
        size = os.path.getsize(path)
        content_type, encoding = mimetypes.guess_type(path)
        content_type = content_type or 'application/octet-stream'
    
        
        print("tamaño del archivo: ", size)
        if range_match:
            first_byte, last_byte = range_match.groups()
            first_byte = int(first_byte) if first_byte else 0
            last_byte = int(last_byte) if last_byte else size - 1
            
            print("primer byte: ", first_byte)
            print("segundo byte: ", last_byte)
            
            if last_byte >= size:
                last_byte = size - 1
                
            if first_byte == 0 and last_byte == size - 1:
                length = 500
            else:
                length = last_byte - first_byte + 1
                
            print("tamaño de la respuesta: ", length)
            resp = StreamingHttpResponse(
                RangeFileWrapper(
                    open(path, 'rb'), 
                    offset=first_byte, 
                    length=length
                ), 
                status=206, 
                content_type=content_type
            )
            
            resp['Content-Length'] = str(round(float(length)))
            resp['Content-Range'] = 'bytes %s-%s/%s' % (first_byte, last_byte, size)
           
        else:
            print(f"{user} intento descargar el contenido {content.name}")
            return Response(
                'No esta permitido descargar este medio', 
                status=status.HTTP_401_UNAUTHORIZED
            )
            
        resp['Accept-Ranges'] = 'bytes'
        if int(resp['Content-Length']) == size:
            print("Se devolvio el video completo")


        if int(resp['Content-Length']) == size and 'Range' not in request.headers.keys():
            print(f"{user} intento descargar el contenido {content.name}")
            return Response(
                'No esta permitido descargar este medio', 
                status=status.HTTP_401_UNAUTHORIZED
            )
            
        return resp
    
class SubtitlesAPIView(views.APIView):
    def get_serializer_class(self):
        return ContentDetailSerializer
    
    def get_queryset(self, **kwargs):
        if 'pk' in kwargs.keys(): 
            return self.get_serializer_class().Meta.model.objects.filter(
                status=True, pk=kwargs['pk']).first()
            
        elif 'chapter_pk' in kwargs.keys(): 
            return Chapter.objects.filter(pk=kwargs['chapter_pk']).first()
            
        return self.get_serializer_class().Meta.model.objects.filter(status=True)
    
    def get(self, request, pk=None, chapter_pk=None):      
        print("almejas")  
        if pk:
            content = self.get_queryset(pk=pk)
        else:
            return Response({'error':"El archivo no existe"}, status=status.HTTP_404_NOT_FOUND) 
            
        path = content.path
        filename = os.path.basename(path)
        content_type, encoding = mimetypes.guess_type(path)
        content_type = content_type or 'application/src'
        
        if os.path.exists(path):
            # Abre el archivo en modo binario
            with open(path, 'rb') as f:
                # Crea una respuesta de archivo y establece el tipo MIME adecuado
                response = FileResponse(f, content_type=content_type)
                # Establece el nombre de archivo para la descarga
                response['Content-Disposition'] = f'attachment; filename="{filename}.src"'
                return response
        else:
            # Si el archivo no existe, puedes mostrar un mensaje de error o redirigir a otra página
            return Response({'error':"El archivo no existe"}, status=status.HTTP_404_NOT_FOUND)
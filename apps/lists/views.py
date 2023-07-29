from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from apps.search.serializers import SearchesListSerializer

# Busquedas en Tendencia
class TrendingSearchesAPIView(APIView):
    def get(self, request):
        try:
            searchers = SearchesListSerializer.Meta.model.objects.all(
                ).order_by('-number_searches')[:5]
            
            serializer = SearchesListSerializer(
                searchers, 
                context={'request': request}, 
                many=True
            )
            
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )
            
        except Exception as e:
            print(e)
            return Response(
                {'error': 'Server internal error'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
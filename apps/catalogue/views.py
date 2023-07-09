from rest_framework import generics
from .serializers import ContentSerializer
from django_filters.rest_framework import DjangoFilterBackend

class ContentAPIView(generics.ListAPIView):
    serializer_class = ContentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category']
    
    def get_queryset(self):
        return self.get_serializer_class().Meta.model.objects.filter(status=True)

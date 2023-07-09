from rest_framework import generics
from .serializers import CategorySerializer

class CategoryAPIView(generics.ListAPIView):
    serializer_class = CategorySerializer
    
    def get_queryset(self):
        return self.get_serializer_class().Meta.model.objects.filter(status=True)

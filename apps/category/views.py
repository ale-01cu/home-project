from rest_framework import generics
from .serializers import CategorySerializer, GenderSerializer, ActorSerializer

class CategoryAPIView(generics.ListAPIView):
    serializer_class = CategorySerializer
    
    def get_queryset(self):
        return self.get_serializer_class().Meta.model.objects.filter(status=True)


class GenderAPIView(generics.ListAPIView):
    serializer_class = GenderSerializer
    
    def get_queryset(self):
        return self.get_serializer_class().Meta.model.objects.all()
    
    
class ActorAPIView(generics.ListAPIView):
    serializer_class = ActorSerializer
    
    def get_queryset(self):
        return self.get_serializer_class().Meta.model.objects.all()
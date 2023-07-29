from .views import CategoryAPIView, ActorAPIView, GenderAPIView
from django.urls import path

urlpatterns = [
    path('', CategoryAPIView.as_view(), name='category-list'),
    path('actors/', ActorAPIView.as_view(), name='actor-list'),
    path('genders/', GenderAPIView.as_view(), name='gender-list'),
]
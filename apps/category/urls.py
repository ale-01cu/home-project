from .views import CategoryAPIView
from django.urls import path

urlpatterns = [
    path('', CategoryAPIView.as_view(), name='category-list')
]
from django.urls import path
from .views import ContentAPIView

urlpatterns = [
    path('', ContentAPIView.as_view(), name='content-list')
]
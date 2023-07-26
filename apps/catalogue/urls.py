from django.urls import path
from .views import ContentListAPIView, ContentDetailAPIView, VideoStreamAPIView

urlpatterns = [
    path('', ContentListAPIView.as_view(), name='content-list'),
    path('<int:pk>/', ContentDetailAPIView.as_view(), name='content-detail'),
    path('stream/<int:pk>/', VideoStreamAPIView.as_view(), name='content_stream'),
]
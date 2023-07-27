from django.urls import path
from .views import (
    ContentListAPIView, ContentDetailAPIView, 
    VideoStreamAPIView, ChapterRetrieveApiView
)

urlpatterns = [
    path('', ContentListAPIView.as_view(), name='content-list'),
    path('<int:pk>/', ContentDetailAPIView.as_view(), name='content-detail'),
    path('chapter/<int:pk>/', ChapterRetrieveApiView.as_view(), name='chapter-detail'),
    path('stream/<int:pk>/', VideoStreamAPIView.as_view(), name='content_stream'),
    path('stream/<int:pk>/<int:chapter_pk>/', VideoStreamAPIView.as_view(), name='content_chapter_stream'),
]
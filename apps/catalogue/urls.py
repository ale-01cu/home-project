from django.urls import path
from .views import ContentListAPIView, ContentDetailAPIView

urlpatterns = [
    path('', ContentListAPIView.as_view(), name='content-list'),
    path('<int:pk>/', ContentDetailAPIView.as_view(), name='content-detail')
]
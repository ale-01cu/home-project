from django.urls import path
from .views import TrendingSearchesAPIView

urlpatterns = [
    path('treanding-searches/', TrendingSearchesAPIView.as_view(), name='trending-searches'),
]
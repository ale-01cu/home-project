from django.urls import path
from .views import (
    TrendingSearchesAPIView,
    NewContentAPIView,
    CustomListsAPIView    
)

urlpatterns = [
    path('treanding-searches/', TrendingSearchesAPIView.as_view(), name='trending-searches-list'),
    path('new-content/', NewContentAPIView.as_view(), name='new-content-list'),
    path('custom-lists/', CustomListsAPIView.as_view(), name='custom-lists-list'),
]
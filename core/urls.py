from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),

    path('api/catalogue/', include('apps.catalogue.urls')),
    path('api/category/', include('apps.category.urls')),
    path('api/lists/', include('apps.lists.urls')),
    
    path('admin/', admin.site.urls),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
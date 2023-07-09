from django.contrib import admin
from .models import Image, Season, Content

class SeasonAdmin(admin.TabularInline):
    model = Season
    extra = 1

class ImageAdmin(admin.TabularInline):
    model = Image
    extra = 0

class ContentAdmin(admin.ModelAdmin):
    inlines = [SeasonAdmin, ImageAdmin]
    list_display = (
        'id',
        'name', 
        'format', 
        'size',
        'photo',
        'create_date',
        'status'
    )
    
    list_display_links = ('photo', 'name')
    search_fields = (
        'name', 
        'format', 
        'create_date'
    )
    
    list_filter = (
        'actors', 
        'genders', 
        'release_year', 
        'platform', 
        'spanish'
    )
    
    list_per_page = 25
    
admin.site.register(Content, ContentAdmin)

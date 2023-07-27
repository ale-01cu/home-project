from django.contrib import admin
from .models import Image, Season, Content, Chapter

class CharacterAdminInline(admin.TabularInline):
    model = Chapter
    extra = 0

class SeasonAdminInline(admin.TabularInline):
    model = Season
    extra = 0

class ImageAdmin(admin.TabularInline):
    model = Image
    extra = 0

class CharacterAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'content', 'season', 'path', 'subtitle')
    list_display_links = ('id', 'name')
    search_fields = ('name', 'content__name')
    list_filter = ('content', )
    list_per_page = 25

class ContentAdmin(admin.ModelAdmin):
    inlines = [SeasonAdminInline, CharacterAdminInline, ImageAdmin]
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
admin.site.register(Chapter, CharacterAdmin)

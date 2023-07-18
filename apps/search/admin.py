from django.contrib import admin
from .models import Searches

class SearchesAdmin(admin.ModelAdmin):
    list_display = (
        'search_text', 
        'number_searches', 
        'last_time_searched'
    )
    search_fields = (
        'search_text', 
        'last_time_searched'
    )
    list_display_links = (
        'search_text', 
        'number_searches', 
        'last_time_searched', 
    )
    
    list_per_page = 25

admin.site.register(Searches, SearchesAdmin)

from django.contrib import admin
from .models import CustomsList, CustomsListItem


class CustomListsItemAdminInline(admin.TabularInline):
    model = CustomsListItem
    extra = 1

class CustomListsAdmin(admin.ModelAdmin):
    inlines = [CustomListsItemAdminInline]
    list_display = (
        'name', 
        'status', 
        'start_date', 
        'end_date', 
        'create_date'
    )
    list_display_links = (
        'name', 
        'status', 
        'start_date', 
        'end_date', 
        'create_date'
    )
    
admin.site.register(CustomsList, CustomListsAdmin)

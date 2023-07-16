from django.contrib import admin

from django.contrib import admin
from apps.user.models import UserAccount

class UserAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'nick_name', 
        'is_staff', 
        'is_superuser', 
        'is_active', 
        'last_login', 
        'create_date'
    )
    list_display_links = (
        'id', 
        'nick_name',
    )
    search_fields = (
        'first_name', 
        'last_name', 
        'nick_name', 
        'create_date'
    )
    readonly_fields = ('create_date',)
    list_per_page = 25
    
    
admin.site.register(UserAccount, UserAdmin)

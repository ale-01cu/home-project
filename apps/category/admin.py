from django.contrib import admin
from .models import Category, Actor, Gender

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'price')
    list_display_links = ('name', 'price')

class ActorAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name')
    list_display_links = ('first_name', 'last_name')
    search_fields = ('first_name', 'last_name')
    list_per_page = 25
    
class GenderAdmin(admin.ModelAdmin):
    list_display = ('name',)
    list_display_links = ('name',)
    search_fields = ('name',)
    list_per_page = 25
    
admin.site.register(Category, CategoryAdmin)
admin.site.register(Actor, ActorAdmin)
admin.site.register(Gender, GenderAdmin)
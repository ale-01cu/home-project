from django.db import models
from apps.catalogue.models import Content

class CustomsList(models.Model):
    class Meta:
        verbose_name = 'Lista personalizada'
        verbose_name_plural = 'Listas personalizadas'
        
    name = models.CharField(
        max_length=255,
        verbose_name='Nombre'
    )
    
    status = models.BooleanField(
        default=True,
        verbose_name='Estado'
    )
    
    start_date = models.DateTimeField(
        verbose_name='Fecha del inicio'
    )
    
    end_date = models.DateTimeField(
        verbose_name='Fecha del fin'
    )
    
    create_date = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de creado'
    )
    
    def __str__(self):
        return self.name
    
    
class CustomsListItem(models.Model):
    class Meta:
        verbose_name = 'Producto de la lista'
        verbose_name_plural = 'Productos de las listas'
    
    custom_list = models.ForeignKey(
        CustomsList,
        related_name='custom_list_items', 
        verbose_name='Producto de la lista', 
        on_delete=models.CASCADE
    )
        
    content = models.ForeignKey(
        Content, 
        related_name='custom_list_item', 
        verbose_name='Producto', 
        on_delete=models.CASCADE
    )
    
    add_date = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de Agregado'
    )
    
    def __str__(self):
        return self.product.name

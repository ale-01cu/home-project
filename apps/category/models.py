from django.db import models
from .actions import generate_category_photo_path

class Category(models.Model):
    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'
    
    name = models.CharField(
        max_length=255,
        verbose_name='Nombre de la Categoria'
    )
    
    photo = models.ImageField(
        upload_to=generate_category_photo_path,
        verbose_name='Foto de la Categoria',
        null=True,
        blank=True
    )
    
    price = models.FloatField(
        verbose_name='Precio'
    )
    
    status = models.BooleanField(
        default=True,
        verbose_name='Estado'
    )
  
    def __str__(self) -> str:
        return self.name
    
    
class Gender(models.Model):
    class Meta:
        verbose_name = 'Genero'
        verbose_name_plural = 'Generos'
        
    name = models.CharField(
        max_length=255,
        verbose_name='Nombre del Genero'
    )
  
    def __str__(self) -> str:
        return self.name
      

class Actor(models.Model):
    class Meta:
        verbose_name = 'Actor/Actriz'
        verbose_name_plural = 'Actores'
        
    full_name = models.CharField(
        max_length=255,
        verbose_name='Nombre completo'
    )
    
    def __str__(self) -> str:
        return self.full_name
    
    
# class GenderItem(models.Model):
#     class Meta:
#         verbose_name = 'Genero del contenido'
#         verbose_name_plural = 'Generos del contenido'
        
#     gender = models.ForeignKey(
#         Gender,
#         related_name='gender_item',
#         on_delete=models.CASCADE,
#         verbose_name='Genero'
#     )
    
#     content = models.ForeignKey(
#         Content,
#         on_delete=models.CASCADE,
#         related_name='gender_item',
#         verbose_name='Contenido'
#     )
    
#     def __str__(self) -> str:
#         return self.gender.name
    
# class ActorItem(models.Model):
#     class Meta:
#         verbose_name = 'Actor/Actriz del contenido'
#         verbose_name_plural = 'Actores/Actrices del contenido'
        
#     actor = models.ForeignKey(
#         Actor,
#         related_name='actor_item',
#         on_delete=models.CASCADE,
#         verbose_name='Actore/Actriz'
#     )
    
#     content = models.ForeignKey(
#         Content,
#         on_delete=models.CASCADE,
#         related_name='actor_item',
#         verbose_name='Contenido'
#     )
    
#     def __str__(self) -> str:
#         return self.actor.first_name + " " + self.actor.last_name
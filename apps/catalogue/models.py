from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from .helpers import (
    generate_content_photo_path, 
    generate_content_images_path,
    generate_content_subtitles_path    
)
from .countries import Countries
from apps.category.models import Gender, Actor, Category
from django.core.exceptions import ValidationError

class Content(models.Model):
    class Meta:
        verbose_name = 'Contenido'
        verbose_name_plural = 'Contenidos'
        
    name = models.CharField(
        max_length=100, 
        unique=True,
        null=True,
        blank=True,
        verbose_name='Nombre'
    )
    
    photo = models.ImageField(
        upload_to=generate_content_photo_path,
        verbose_name='Foto de Portada'
    )
    
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='content',
        verbose_name='Categoria'
    )
    
    status = models.BooleanField(
        default=True,
        verbose_name='Estado'
    )
    
    path = models.CharField(
        max_length=255,
        verbose_name='Ruta en disco duro',
        null=True,
        blank=True
    )
    
    format = models.CharField(
        max_length=50, 
        null=True,
        blank=True,
        verbose_name='Formato'
    )
    
    size = models.CharField(
        max_length=10, 
        null=True,
        blank=True,
        verbose_name='Tamaño'
    )
    
    release_date = models.DateField(
        verbose_name='Fecha completa de Estreno',
        null=True,
        blank=True,
    )
    
    release_year = models.IntegerField(
        validators=[
            MaxValueValidator(2100),
            MinValueValidator(1900)
        ],
        verbose_name='Año de Estreno',
        null=True,
        blank=True,
    )
    
    subtitles = models.BooleanField(
        default=False,
        verbose_name='Esta Subtitulada'
    )
    
    spanish = models.BooleanField(
        default=False,
        verbose_name='Esta en Español'
    )
    
    description = models.TextField(
        verbose_name='Descripcion'
    )
    
    platform = models.CharField(
        max_length=100, 
        blank=True,
        verbose_name='Plataforma'
    )
    
    countrie = models.CharField(
        choices=Countries.choices,
        max_length=100, 
        blank=True,
        verbose_name='Pais'
    )
    
    genders = models.ManyToManyField(
        Gender,
        related_name='genders_content',
        verbose_name='Generos'
    )
    
    actors = models.ManyToManyField(
        Actor, 
        related_name='actors_content',
        verbose_name='Actores'
    )
    
    create_date = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de Creado'
    )
    
    update_date = models.DateTimeField(
        auto_now=True,
        verbose_name='Ultima vez modificado'
    )
    
    def __str__(self) -> str:
        return self.name
    
    def clean(self):
        if not self.release_date and not self.release_year:
            raise ValidationError('Debes proporcionar al menos una fecha de lanzamiento.')
    
    
class Image(models.Model):
    class Meta:
        verbose_name = 'Imagen'
        verbose_name_plural = 'Imagenes'
        
    image = models.ImageField(
        unique=True, 
        verbose_name='Url de la Imagen', 
        upload_to=generate_content_images_path,
    )
    
    content = models.ForeignKey(
        Content, 
        on_delete=models.CASCADE, 
        related_name='images', 
        verbose_name='Contenido'
    )
    
    def __str__(self):
        return str(self.image)
    
  
    
class Season(models.Model):
    class Meta:
        verbose_name = 'Temporada'
        verbose_name_plural = 'Temporadas'
        
    content = models.ForeignKey(
        Content, 
        on_delete=models.CASCADE,
        related_name='seasons',
        verbose_name='Temporadas'
    )
    
    number = models.PositiveIntegerField(
        verbose_name='Temporada'
    )
    
    number_of_chapters = models.PositiveIntegerField(
        verbose_name='Cantidad de Capitulos'
    )
    
    path = models.CharField(
        max_length=255,
        verbose_name='Ruta en disco duro de la temporada',
    )
    
    status = models.BooleanField(
        default=True,
        verbose_name='Estado'
    )
    
    was_added = models.BooleanField(
        default=False,
        verbose_name='Fue Agregada'
    )
    
    def __str__(self) -> str:
        return f'Temporada {self.number} de la serie {self.content.name}'
    
    
class Character(models.Model):
    class Meta:
        verbose_name = 'Capitulo'
        verbose_name_plural = 'Capitulos'
        
    content = models.ForeignKey(
        Content, 
        on_delete=models.CASCADE,
        related_name='characters',
        verbose_name='Contenido'
    )
        
    season = models.ForeignKey(
        Season,
        on_delete=models.CASCADE,
        related_name='characters',
        verbose_name='Temporada'
    )
    
    path = models.CharField(
        max_length=255,
        verbose_name='Ruta en disco duro del capitulo',
        null=True,
        blank=True
    )
    
    subtitle = models.FileField(
        upload_to=generate_content_subtitles_path,
        verbose_name='Subtitulo',
        null=True,
        blank=True
    )
    
    name = models.CharField(
        max_length=255,
        verbose_name='Nombre',
    )
  

from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from .helpers import generate_content_photo_path
from .countries import Countries
from apps.category.models import Gender, Actor, Category

class Content(models.Model):
    class Meta:
        verbose_name = 'Contenido'
        verbose_name_plural = 'Contenidos'
        
    name = models.CharField(
        max_length=100, 
        unique=True,
        verbose_name='Nombre'
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
        verbose_name='Ruta en disco duro'
    )
    
    format = models.CharField(
        max_length=50, 
        blank=True,
        verbose_name='Formato'
    )
    
    size = models.CharField(
        max_length=10, 
        blank=True,
        verbose_name='Tamaño'
    )
    
    release_year = models.IntegerField(
            validators=[
                MaxValueValidator(2100),
                MinValueValidator(1900)
            ]
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
    
    photo = models.ImageField(
        upload_to=generate_content_photo_path,
        verbose_name='Foto de Portada'
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
    
    def __str__(self) -> str:
        return self.name
    
    
class Image(models.Model):
    class Meta:
        verbose_name = 'Imagen'
        verbose_name_plural = 'Imagenes'
        
    image = models.ImageField(
        unique=True, 
        verbose_name='Url de la Imagen', 
        upload_to=generate_content_photo_path,
    )
    
    product = models.ForeignKey(
        Content, 
        on_delete=models.CASCADE, 
        related_name='images', 
        verbose_name='Prodduto'
    )
    
    def __str__(self):
        return str(self.image)
  
    
class Season(models.Model):
    class Meta:
        verbose_name = 'Temporada'
        verbose_name_plural = 'Temporadas'
        
    serie = models.ForeignKey(
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
    
    def __str__(self) -> str:
        return f'Temporada {self.number} de la serie {self.serie.name}'
  

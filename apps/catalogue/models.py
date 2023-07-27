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
        verbose_name='Nombre',
        help_text="""
        Se llena automaticamente si no se llena, a travez de la ruta del contenido.
        """
    )
    
    photo = models.ImageField(
        upload_to=generate_content_photo_path,
        verbose_name='Foto de Portada',
        help_text="""
        Imagen que saldra en el catalogo.
        """
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
        blank=True,
        help_text="""
        Este campo es para especificar la ruta de la carpeta de la pelicula o serie pero hay que tener en cuenta los siguientes puntos:
        En caso de los contenidos con un solo video:
            . Si se pone la ruta de la carpeta donde esta el contenido detecta automaticamente el archivo de video dentro de la ruta.
            . De esa ruta es de donde se va a leer el video que ve el usuario.
        En caso de los contenidos con varios videos:
            . En este caso se pone la ruta de la carpeta donde se encuentra el contenido pero esto es solo para saber donde esta el contenido.
            . Se puede dejar en blanco aunque es recomendable usarlo para saber la ubicacion del contenido.
        """
    )
    
    format = models.CharField(
        max_length=50, 
        null=True,
        blank=True,
        verbose_name='Formato',
        help_text="""
        No es obligatorio y en caso de llenar la ruta de la carpeta y sea un slo fichero de video este campo se llenara automaticamente con la informacion del archivo de video.
        """
    )
    
    size = models.CharField(
        max_length=10, 
        null=True,
        blank=True,
        verbose_name='Tamaño',
        help_text="""
        No es obligatorio y en caso de llenar la ruta de la carpeta y sea un solo fichero de video este campo se llenara automaticamente con la informacion del archivo de video.
        """
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
    
    @property
    def number_of_chapters(self):
        return self.chapters.count()
    
    
class Chapter(models.Model):
    class Meta:
        verbose_name = 'Capitulo'
        verbose_name_plural = 'Capitulos'
        
    content = models.ForeignKey(
        Content, 
        on_delete=models.CASCADE,
        related_name='chapters',
        verbose_name='Contenido'
    )
        
    season = models.ForeignKey(
        Season,
        on_delete=models.CASCADE,
        related_name='chapters',
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
        unique=True,
        max_length=255,
        verbose_name='Nombre',
    )
  

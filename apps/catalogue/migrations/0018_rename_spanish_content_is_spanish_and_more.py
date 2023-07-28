# Generated by Django 4.2.2 on 2023-07-28 02:34

import apps.catalogue.helpers
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('catalogue', '0017_alter_chapter_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='content',
            old_name='spanish',
            new_name='is_spanish',
        ),
        migrations.RenameField(
            model_name='content',
            old_name='subtitles',
            new_name='is_subtitled',
        ),
        migrations.AddField(
            model_name='content',
            name='subtitle',
            field=models.FileField(blank=True, null=True, upload_to=apps.catalogue.helpers.generate_content_subtitule_path, verbose_name='Subtitulo'),
        ),
        migrations.AlterField(
            model_name='chapter',
            name='season',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='chapters', to='catalogue.season', verbose_name='Temporada'),
        ),
        migrations.AlterField(
            model_name='content',
            name='format',
            field=models.CharField(blank=True, help_text='\n        No es obligatorio y en caso de llenar la ruta de la carpeta y sea un slo fichero de video este campo se llenara automaticamente con la informacion del archivo de video.\n        ', max_length=50, null=True, verbose_name='Formato'),
        ),
        migrations.AlterField(
            model_name='content',
            name='name',
            field=models.CharField(blank=True, help_text='\n        Se llena automaticamente si no se llena, a travez de la ruta del contenido.\n        ', max_length=100, null=True, unique=True, verbose_name='Nombre'),
        ),
        migrations.AlterField(
            model_name='content',
            name='path',
            field=models.CharField(blank=True, help_text='\n        Este campo es para especificar la ruta de la carpeta de la pelicula o serie pero hay que tener en cuenta los siguientes puntos:\n        En caso de los contenidos con un solo video:\n            . Si se pone la ruta de la carpeta donde esta el contenido detecta automaticamente el archivo de video dentro de la ruta.\n            . De esa ruta es de donde se va a leer el video que ve el usuario.\n        En caso de los contenidos con varios videos:\n            . En este caso se pone la ruta de la carpeta donde se encuentra el contenido pero esto es solo para saber donde esta el contenido.\n            . Se puede dejar en blanco aunque es recomendable usarlo para saber la ubicacion del contenido.\n        ', max_length=255, null=True, verbose_name='Ruta en disco duro'),
        ),
        migrations.AlterField(
            model_name='content',
            name='photo',
            field=models.ImageField(help_text='\n        Imagen que saldra en el catalogo.\n        ', upload_to=apps.catalogue.helpers.generate_content_photo_path, verbose_name='Foto de Portada'),
        ),
        migrations.AlterField(
            model_name='content',
            name='size',
            field=models.CharField(blank=True, help_text='\n        No es obligatorio y en caso de llenar la ruta de la carpeta y sea un solo fichero de video este campo se llenara automaticamente con la informacion del archivo de video.\n        ', max_length=10, null=True, verbose_name='Tamaño'),
        ),
    ]

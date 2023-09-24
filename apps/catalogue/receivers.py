from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Content, Season, Chapter
import os
import mimetypes
from .utils import calculate_size

def iterate_OnePath(path, instance):
    for root, dirs, files in os.walk(path):
        for file in files:
            mimetype, _ = mimetypes.guess_type(file)
            if mimetype is not None and mimetype.startswith('video'):
                file_path = os.path.join(root, file)
                
                instance.path = file_path
                
                if not instance.name:
                    instance.name = str(file.split(".")[0])
                    
                if not instance.format:
                    instance.format = str(file.split(".")[1])
                    
                if not instance.size:
                    instance.size = calculate_size(os.path.getsize(file_path))
                
                instance.save()
                
def iterate_ManyPaths(path, season_instance):
    for root, dirs, files in os.walk(path):
        for file in files:
            mimetype, _ = mimetypes.guess_type(file)
            if mimetype is not None and mimetype.startswith('video'):
                file_path = os.path.join(root, file)
                
                new_character, created = Chapter.objects.get_or_create(
                    content=season_instance.content,
                    season=season_instance,
                    path=file_path,
                    name=str(file.split(".")[0])
                )
                
                if created:
                    # El objeto Chapter fue creado porque no existía previamente
                    # Realiza cualquier otra operación necesaria
                    pass
                else:
                    # El objeto Chapter ya existía en la base de datos
                    # No necesitas hacer nada más
                    pass


@receiver(post_save, sender=Content)
def save_files_videos_signal(sender, instance, **kwargs):
    # Cuamdo es un contenido de un solo video
    path = instance.path
    seasons_exist = instance.seasons.filter(status=True).exists()
    
    if path and not os.path.isfile(path) and not seasons_exist:
        iterate_OnePath(path, instance)
    
                
@receiver(post_save, sender=Season)
def save_files_videos_signal(sender, instance, **kwargs):
    # Cuamdo es un contenido de un solo video
    
    if instance:
        if not instance.was_added:
            iterate_ManyPaths(instance.path, instance)
            instance.was_added = True
            instance.save()
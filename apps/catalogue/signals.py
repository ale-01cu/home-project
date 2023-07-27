from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Content, Season, Character
import os
import mimetypes

def calculate_size(bytes):
    if bytes >= 1073741824:
        bytes = f"{(bytes / 1073741824):.2f} GB"
    elif bytes >= 1048576:
        bytes = f"{(bytes / 1048576):.2f} MB"
    elif bytes >= 1024:
        bytes = f"{(bytes / 1024):.2f} KB"
    elif bytes > 1:
        bytes = f"{bytes} bytes"
    elif bytes == 1:
        bytes = f"{bytes} byte"
    else:
        bytes = "0 bytes"
    return bytes


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
                    instance.format = str(mimetype).split("/")[1]
                    
                if not instance.size:
                    instance.size = calculate_size(os.path.getsize(file_path))
                
                instance.save()
                
def iterate_ManyPaths(path, season_instance):
    for root, dirs, files in os.walk(path):
        for file in files:
            mimetype, _ = mimetypes.guess_type(file)
            if mimetype is not None and mimetype.startswith('video'):
                file_path = os.path.join(root, file)
                
                new_character = Character(
                    content=season_instance.content,
                    season=season_instance,
                    path=file_path,
                    name=str(file.split(".")[0])
                )
                
                new_character.save()



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
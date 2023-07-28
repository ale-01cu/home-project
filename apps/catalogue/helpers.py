import os

def generate_content_photo_path(instance, filename):
    folder_name = f'{instance.category}/{instance.name}/'
    path = os.path.join(folder_name, filename)
    return path

def generate_content_images_path(instance, filename):
    folder_name = f'{instance.content.category}/{instance.content.name}/images/'
    path = os.path.join(folder_name, filename)
    return path

def generate_content_subtitule_path(instance, filename):
    folder_name = f'{instance.category}/{instance.name}/subtitles/'
    path = os.path.join(folder_name, filename)
    return path

def generate_content_subtitles_path(instance, filename):
    folder_name = f'{instance.content.category}/{instance.content.name}/Temporada {instance.season.number}/'
    path = os.path.join(folder_name, filename)
    return path
import os

def generate_content_photo_path(instace, filename):
    folder_name = f'images/{instace.category}/{instace.name}/'
    path = os.path.join(folder_name, filename)
    return path
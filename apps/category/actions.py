import os

def generate_category_photo_path(instace, filename):
    folder_name = f'images/Categorias/{instace.name}/'
    path = os.path.join(folder_name, filename)
    return path

import uuid
from django.utils import timezone

# Genera un id unico
def generate_id():
    now_date = timezone.now().strftime('%Y%m%d%H%M%S')
    return now_date + '-' + str(uuid.uuid4())



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
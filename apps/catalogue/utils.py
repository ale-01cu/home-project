import uuid
from django.utils import timezone

# Genera un id unico
def generate_id():
    now_date = timezone.now().strftime('%Y%m%d%H%M%S')
    return now_date + '-' + str(uuid.uuid4())
from django.db import models

class Searches(models.Model):
    class Meta:
        verbose_name = 'Busqueda'
        verbose_name_plural = 'Busquedas'
        ordering = ('-number_searches', )               # Ordena los elemntos por el numero de veces buscada
        
    search_text = models.CharField(                     # Texto de la busqueda
        max_length=255,
        verbose_name='Texto de la busqueda'
    )
    
    processed_search_text = models.CharField(           # Texto de la busqueda procesado
        max_length=255,
        verbose_name='Texto de la busqueda procesado'
    )
    
    number_searches = models.PositiveIntegerField(      # Cantidad de veces de realizada la busqueda
        verbose_name='Numero de busquedas',
        default=1
    )
    
    last_time_searched = models.DateTimeField(          # Ultima vez que fue buscada
        verbose_name='Fecha de creado',
        auto_now=True
    )
    

    def __str__(self):
        return self.search_text
from django.apps import AppConfig


class CatalogueConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.catalogue'
    verbose_name = 'Catalogo'

    def ready(self):
        import apps.catalogue.receivers
        return super().ready()
import django_filters
from .models import Content

class ContentFilter(django_filters.FilterSet):
    genders = django_filters.CharFilter(method='filter_by_genders')
    actors = django_filters.CharFilter(method='filter_by_actors')

    class Meta:
        model = Content
        fields = ['category', 'genders', 'actors']

    def filter_by_genders(self, queryset, name, value):
        # Separa los géneros pasados como una cadena separada por comas en una lista
        print(value)
        genders = value.split(',')

        # Filtra los elementos que tengan exactamente esos géneros y ninguno más
        for gender in genders:
            queryset = queryset.filter(genders__name=gender)
        
        return queryset.distinct()

    def filter_by_actors(self, queryset, name, value):
        # Separa los actores pasados como una cadena separada por comas en una lista
        actors = value.split(',')

        # Filtra los elementos que tengan exactamente esos actores y ninguno más
        for actor in actors:
            queryset = queryset.filter(actors__full_name=actor)
        
        return queryset.distinct()
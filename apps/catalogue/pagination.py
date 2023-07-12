from rest_framework.pagination import PageNumberPagination

class ContentPagination(PageNumberPagination):
    page_size = 2
    page_query_param = 'p'
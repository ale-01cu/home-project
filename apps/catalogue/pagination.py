from rest_framework.pagination import PageNumberPagination

class ContentPagination(PageNumberPagination):
    page_size = 25
    page_query_param = 'p'
from django.urls import path, re_path

from .views import DocumentListCreateView

urlpatterns = [
    path('', DocumentListCreateView.as_view({
        'get': 'list'
    })),
    path('<int:pk>/', DocumentListCreateView.as_view({
        'get': 'retrieve'
    }))
]

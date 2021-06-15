from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DocumentViewSet, FolderViewSet

router = DefaultRouter()
router.register('documents', DocumentViewSet)
router.register('directories', FolderViewSet)


urlpatterns = [
    path('drives/', include(router.urls))
]

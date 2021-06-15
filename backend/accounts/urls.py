from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import AccountListCreateView, AccountDetailView

urlpatterns = [
    path("", AccountListCreateView.as_view(), name="all-profiles"),
    path("<int:pk>", AccountDetailView.as_view(), name="profile"),
]

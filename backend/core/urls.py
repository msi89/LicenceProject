from django.conf import settings
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic.base import TemplateView
from django.conf.urls.static import static

from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('drives.urls')),
    path('api/auth/', include('djoser.urls.base')),
    path('api/auth/', include('djoser.urls.authtoken')),
    path('api/auth/login', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/auth/login/refresh/',
         TokenRefreshView.as_view(), name='token_refresh'),
    re_path(
        '(^(?!(api|admin|media)).*$)',
        TemplateView.as_view(template_name="index.html")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

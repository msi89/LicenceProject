"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from core import settings
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic.base import TemplateView
from django.contrib.auth.decorators import login_required
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.signin),
    path('logout/', views.signout, name='logout'),
    # path('', login_required(views.home, login_url='login/')),
    re_path(
        'dashboard/.*',
        login_required(TemplateView.as_view(template_name="index.html"),
                       login_url='login/')),
    re_path(
        '(^(?!(api|admin|logout|login)).*$)', TemplateView.as_view(template_name="index.html")),
    path('api/drives/', include('drives.urls'))
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

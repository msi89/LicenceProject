from django.contrib import admin
from django.urls import path, re_path
from django.views.generic.base import TemplateView
from django.contrib.auth.decorators import login_required

from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.signin),
    path('logout/', views.signout, name='logout'),
    path('', login_required(views.home, login_url='login/')),
    re_path(
        'dashboard/.*',
        login_required(TemplateView.as_view(template_name="index.html"),
                       login_url='login/'))
]

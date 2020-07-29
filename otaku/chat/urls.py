# chat/urls.py
from django.urls import path, re_path

from .views import index, room

app_name = 'chat'

urlpatterns = [
    path('index/', index, name='index'),
    re_path('<str:room_name>/', room, name='room'),
]

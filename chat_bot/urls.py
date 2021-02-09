from django.conf.urls import url

from chat_bot import views

urlpatterns = [
    url(r'^api/test/$', views.test),
    url(r'^$', views.index),
    url(r'^api/chat/$', views.chat),
]

from django.conf.urls import url

from chat_bot import views

urlpatterns = [
    url(r'^api/test/$', views.test),
    url(r'^$', views.index),
    url(r'^api/chat/$', views.chat),

    url(r'^api/login/$', views.user_login),
    url(r'^api/logout/$', views.user_logout),
    url(r'^api/register/page/$', views.register_page),
    url(r'^api/register/$', views.user_register),

    url(r'^api/chat-history/$', views.chat_history),
]

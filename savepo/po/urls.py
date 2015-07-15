__author__ = 'alok'

from django.conf.urls import patterns, url
from po import views

urlpatterns = patterns('',
        url(r'^$', views.index, name='index'),
        url(r'^get-address$', views.get_address),
        url(r'^get-coordinates', views.get_coordinates),
        )

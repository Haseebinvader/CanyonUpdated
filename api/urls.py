from django.contrib import admin
from django.urls import path, include

from .views import *
from rest_framework import routers

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register('products', ProductViewSet, basename='products')

urlpatterns = [
    path('', include(router.urls)),
    path('get-data/', DataFetchView.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('get_access_token/', GetAccessTokenView.as_view(), name='get_access_token'),
    path('get_usa_Size/', GetUSASizeView.as_view(), name='GetSize'),
    path('get_js_Size/', GetJSSizeView.as_view(), name='GetSize'),
    path('updateItems/', updateItems)

]

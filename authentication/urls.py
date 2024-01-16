from django.urls import path, include
from .views import *

# Routers provide an easy way of automatically determining the URL conf.

urlpatterns = [
    path('create/', UserCreateAPIView.as_view(), name='user-create'),
    path('login/', loginApi, name='loginCustomer'),
    path('otpVerification/', otpApi, name='otpVerify'),
    path('user/<customerId>/', GetUserByCustomerIdView.as_view(),
         name='get_user_by_name'),
]

from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import generics
import random
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
import requests
import authentication
from django.core.cache import cache
from authentication import serializers
from authentication.serializers import LoginSerializers, OtpSerializer, User_list_Serializers, UserSerializer
from .token import getAccessToken
from django.contrib.auth import authenticate, login
from django.contrib.auth import get_user_model

User = get_user_model()


@api_view(['POST'])
def loginApi(request):
    # permission_classes = (IsAuthenticated,)
    serializer = LoginSerializers(
        data=request.data, context={'request': request})
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    password = serializer.validated_data['password']
    authenticate(request, username=user, password=password)
    account_sid = 'AC759a55b26665d3659422aca2014e394f'
    auth_token = '833f9ffef845fb6aaee4fe2b1a572b9f'
    # client = Client(account_sid, auth_token)
    otpGenerated = random.randint(1000, 9999)
    cache.set('otp', otpGenerated, timeout=120)
    cache.set('user', user)
    # message = client.messages.create(
    # from_='+15417033631',
    # body=f'Your OTP is {otpGenerated}. Do not share your OTP with anyone.',
    # to='+923175001831'
    # )
    return Response(data=otpGenerated, status=status.HTTP_200_OK)


@api_view(['POST'])
def otpApi(request):
    otpGenerated = cache.get('otp')
    userCache = cache.get('user')
    serializer = OtpSerializer(data=request.data, context={'request': request})
    serializer.is_valid(raise_exception=True)
    otp = serializer.validated_data.get('otp')
    if int(otp) == otpGenerated:
        login(request, userCache)
        user = UserSerializer(userCache)
        return Response(data={"user": user.data['customer_id']}, status=status.HTTP_200_OK)
    return Response(data={"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)


class UserCreateAPIView(generics.CreateAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class GetUserByCustomerIdView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        customer_id = self.kwargs.get('customerId')
        if customer_id:
            return get_object_or_404(User, customer_id=customer_id)
        raise Http404()

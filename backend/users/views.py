from django.shortcuts import render
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, RetrieveUpdateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, AddressSerializer, UserUpdateAddressSerializer
from django.contrib.auth import get_user_model
from users.models import Address
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from api.permissions import AdminOrUser


class UserListView(ListAPIView):
    serializer_class = UserSerializer
    permission_class = permission_classes = (IsAuthenticated, IsAdminUser)
    queryset = get_user_model().objects.all()


class CurrentUserView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class AddressCreateView(CreateAPIView):
    permissions_classes = (IsAuthenticated, )
    serializer_class = AddressSerializer

    def create(self, request):
        requestData = self.request.data.copy()
        requestData['user'] = self.request.user.pk
        serializer = self.get_serializer(data=requestData)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class AddressUpdateView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated, AdminOrUser)
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class CurrentUserUpdateAddressView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = get_user_model().objects.all()
    serializer_class = UserUpdateAddressSerializer

    def get_object(self):
        return self.request.user

        return super(CurrentUserUpdateAddressView, self).get_object()

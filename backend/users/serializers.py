from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from django_countries.serializer_fields import CountryField
from django.contrib.auth import get_user_model
from .models import Address


class FilteredListSerializer(serializers.ListSerializer):

    def to_representation(self, data):
        data = data.filter(is_active=True)
        return super(FilteredListSerializer, self).to_representation(data)


class AddressSerializer(serializers.ModelSerializer):

    country = CountryField(country_dict=True)

    class Meta:
        list_serializer_class = FilteredListSerializer
        model = Address
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):

    addresses = AddressSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'first_name',
                  'last_name', 'addresses', 'default_address')


class UserUpdateAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('default_address', )


class CustomRegisterSerializer(RegisterSerializer):

    class Meta:
        model = get_user_model()
        fields = ('email', 'password')

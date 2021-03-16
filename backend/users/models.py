from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth import get_user_model
from django_countries.fields import CountryField


class CustomUser(AbstractUser):
    default_address = models.PositiveIntegerField(default=0)
    stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)


class Address(models.Model):
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="addresses")
    street_address = models.CharField(max_length=100)
    apartment_number = models.CharField(max_length=100, blank=True)
    country = CountryField(multiple=False)
    zip = models.CharField(max_length=10)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.user.email

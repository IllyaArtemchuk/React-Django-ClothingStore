from django.db import models
from products.models import Product
from django.contrib.auth import get_user_model
from .utils import unique_order_id_generator
from django.db.models.signals import pre_save
from django.utils import timezone
from users.models import Address


XS = "EXTRASMALL"
S = "SMALL"
M = "MEDIUM"
L = "LARGE"
XL = "EXTRALARGE"

SIZES = (
    (XS, "Extra Small"),
    (S, "Small"),
    (M, "Medium"),
    (L, "Large"),
    (XL, "Extra Large")
)


class Cart(models.Model):
    user = models.OneToOneField(get_user_model(
    ), on_delete=models.CASCADE, primary_key=True, related_name="cart")
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return self.user.email


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name="items",
                             on_delete=models.CASCADE)
    item = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="items")
    quantity = models.IntegerField(default=1)
    size = models.CharField(choices=SIZES, max_length=10)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "{} of {}".format(self.quantity, self.item.name)


class Order(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    order_id = models.CharField(max_length=20, blank=True)
    total = models.DecimalField(default=0.00, max_digits=100, decimal_places=2)
    created_at = models.DateTimeField(default=timezone.now)
    shipping_address = models.ForeignKey(Address, on_delete=models.PROTECT)
    stripe_charge_id = models.CharField(max_length=50)

    def __str__(self):
        return self.order_id


def pre_save_create_order_id(sender, instance, *args, **kwargs):
    if not instance.order_id:
        instance.order_id = unique_order_id_generator(instance)


pre_save.connect(pre_save_create_order_id, sender=Order)


class OrderItem(models.Model):
    item = models.ForeignKey(
        Product, on_delete=models.PROTECT, related_name="orderitems"
    )
    quantity = models.PositiveSmallIntegerField()
    size = models.CharField(choices=SIZES, max_length=10)
    order = models.ForeignKey(
        Order, related_name="items", on_delete=models.CASCADE)

    def __str__(self):
        return "{} of {}".format(self.quantity, self.item.name)

from django.db import models
from datetime import datetime
from django.utils import timezone
from PIL import Image
from stdimage import StdImageField
import uuid

TAGS = (
    ("SALE", "Sale"),
    ("NEW", "New"),
    ("HOT", "Hot"),
    ("LOW", "Low Stock!"),
    ("OUT", "Out of stock.")
)

SHI = "SHIRT"
PAN = "PANTS"
OUT = "OUTERWEAR"

TYPES = (
    (SHI, "Shirt"),
    (PAN, "Pants"),
    (OUT, "OuterWear"),
)

M = "MALE"
F = "FEMALE"
U = "UNISEX"

GENDERS = (
    (M, "Male"),
    (F, "Female"),
    (U, "Unisex")
)

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


class Product(models.Model):

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=6, choices=GENDERS)
    description = models.CharField(max_length=400)
    created_at = models.DateTimeField(default=timezone.now)
    tag = models.CharField(max_length=4, choices=TAGS, blank=True)
    type = models.CharField(max_length=9, choices=TYPES, blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    sale_price = models.DecimalField(
        max_digits=6, decimal_places=2, blank=True, null=True,)

    def __str__(self):
        return self.name


class ProductStock(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='stock')
    stock = models.IntegerField(default=1)
    size = models.CharField(choices=SIZES, max_length=10)

    def __str__(self):
        return "{} of {} for {}".format(self.stock, self.size, self.product.name)


class ProductImage(models.Model):
    image = StdImageField(
        upload_to="images/", variations={'medium': {'width': 500, 'height': 600}})
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images")

    def __str__(self):
        return "Image {} for {}".format(self.id, self.product.name)

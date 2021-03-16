from django.contrib import admin
from .models import Product, ProductImage, ProductStock


class ImageInline(admin.TabularInline):
    model = ProductImage


class StockInline(admin.TabularInline):
    model = ProductStock


class ProductAdmin(admin.ModelAdmin):
    inlines = [
        ImageInline,
        StockInline
    ]
    list_display = ("name", "type", "price")


admin.site.register(Product, ProductAdmin)

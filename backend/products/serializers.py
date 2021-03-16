from rest_framework import serializers
from .models import Product, ProductImage, ProductStock


class ProductStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductStock
        fields = ('id', 'stock', 'size')


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('image', )


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    stock = ProductStockSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'tag', 'gender', 'stock',
                  'type', 'price', 'sale_price', 'images')


class ProductDetailSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    stock = ProductStockSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'tag', 'gender', 'stock',
                  'type', 'price', 'sale_price', 'images')

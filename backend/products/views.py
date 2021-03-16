from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ProductSerializer, ProductDetailSerializer
from .models import Product
from api.permissions import AdminOrReadOnly


class ProductViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.action == 'list':
            return ProductSerializer
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductSerializer
    queryset = Product.objects.all().order_by('-created_at')
    permission_classes = (AdminOrReadOnly, )

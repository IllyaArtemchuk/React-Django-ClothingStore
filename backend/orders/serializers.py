from rest_framework import serializers
from .models import Cart, CartItem, Order, OrderItem
from products.serializers import ProductSerializer
from users.serializers import AddressSerializer


# CartItem serializer used for creation
class CartItemCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = CartItem
        fields = ('id', 'quantity', 'item', 'cart', 'size')

# CartItem serializer used to update quantity in cart view


class CartItemUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ('id', 'quantity', 'cart', 'size')


class CartItemListSerializer(serializers.ModelSerializer):

    item = ProductSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ('id', 'quantity', 'item', 'size')


class CartSerializer(serializers.ModelSerializer):
    items = CartItemListSerializer(CartItem.objects.all(), many=True)

    class Meta:
        model = Cart
        fields = ('user', 'items')


class CartCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('user',)


class CartTotalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('user',
                  'total', )


class CartDetailSerializer(serializers.ModelSerializer):
    items = CartItemListSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ('user', 'items',)


class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderItemDetailSerializer(serializers.ModelSerializer):

    item = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemDetailSerializer(many=True, read_only=True)
    shipping_address = AddressSerializer(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'


class OrderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


class OrderItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ('item', 'quantity', 'size', 'order')

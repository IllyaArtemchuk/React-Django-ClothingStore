from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, generics, status
from rest_framework.views import APIView
from rest_framework.fields import empty
from rest_framework.response import Response
from django.conf import settings
from decimal import Decimal
from products.models import Product, ProductStock
from .serializers import (OrderSerializer,
                          OrderCreateSerializer,
                          OrderItemCreateSerializer,
                          CartSerializer,
                          CartCreateSerializer,
                          CartDetailSerializer,
                          CartTotalSerializer,
                          CartItemCreateSerializer,
                          CartItemUpdateSerializer,
                          CartItemListSerializer)
from .models import Order, Cart, CartItem, OrderItem
from api.permissions import AdminOrUser, AdminOrCreateReadOnly, AdminOrUserCart, AdminOrCreate
from rest_framework.permissions import IsAuthenticated, IsAdminUser
import stripe

stripe.api_key = settings.STRIPE_TEST_SECRET_KEY


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    permission_classes = (AdminOrCreateReadOnly, )

    def list(self, request):
        if request.user.is_staff:
            queryset = Order.objects.all()
            return Response(OrderSerializer(queryset, many=True).data)
        else:
            queryset = Order.objects.filter(
                user=request.user).order_by('-created_at')
            return Response(OrderSerializer(queryset, many=True).data)

    def create(self, request):
        requestData = self.request.data.copy()
        token = request.META.get("HTTP_STRIPETOKEN")
        print(token)
        requestData['user'] = self.request.user.pk
        requestData['cart'] = Cart.objects.filter(user=request.user).first()
        userCurrent = self.request.user
        if userCurrent.stripe_customer_id != "" and userCurrent.stripe_customer_id is not None:
            customer = stripe.Customer.retrieve(userCurrent.stripe_customer_id)
            customer.sources.create(source=token)
        else:
            customer = stripe.Customer.create(
                email=userCurrent.email
            )
            customer.sources.create(source=token)
            userCurrent.stripe_customer_id = customer['id']
            userCurrent.save()
        amount = requestData['cart'].total
        try:
            charge = stripe.Charge.create(
                amount=int(amount*100),
                currency="usd",
                customer=userCurrent.stripe_customer_id
            )

            requestData['stripe_charge_id'] = charge['id']
            requestData['total'] = amount

            serializer = OrderCreateSerializer(data=requestData)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        except stripe.error.CardError as e:
            body = e.json_body
            err = body.get('error', {})
            return Response({"message": f"{err.get('message')}"}, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.RateLimitError as e:
            # Too many requests made to the API too quickly
            messages.warning(self.request, "Rate limit error")
            return Response({"message": "Rate limit error"}, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.InvalidRequestError as e:
            print(e)
            # Invalid parameters were supplied to Stripe's API
            return Response({"message": "Invalid parameters"}, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.AuthenticationError as e:
            # Authentication with Stripe's API failed
            # (maybe you changed API keys recently)
            return Response({"message": "Not authenticated"}, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.APIConnectionError as e:
            # Network communication with Stripe failed
            return Response({"message": "Network error"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"message": "A serious error occured"}, status=status.HTTP_400_BAD_REQUEST)


class OrderItemCreateView(generics.ListCreateAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemCreateSerializer
    permission_classes = (IsAuthenticated, AdminOrCreate, )

    def post(self, request):
        data = request.data
        if isinstance(data, list):
            serializer = self.get_serializer(data=request.data, many=True)
        else:
            serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CartCreateView(generics.CreateAPIView):
    serializer_class = CartCreateSerializer
    queryset = Cart.objects.all()


# Lowers Product Stock based on cart items
# Also wipes all cart items after checkout is complete to create an empty cart
class CartCheckoutView(APIView):
    def get_object(self, pk):
        try:
            return Cart.objects.get(pk=pk)
        except Cart.DoesNotExist:
            return Reponse(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        currentCart = self.get_object(pk)
        cartItems = CartItem.objects.filter(cart=currentCart)
        cartItems.delete()
        return Response({"message": "All Cart Items Associated With This Cart Have Been Deleted"}, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        currentCart = self.get_object(pk)
        cartItems = CartItem.objects.filter(cart=currentCart)
        for item in cartItems:
            currentProducts = Product.objects.filter(id=item.item.id)
            for product in currentProducts:
                stockObjects = ProductStock.objects.filter(product=product)
                for stockObject in stockObjects:
                    if item.size == stockObject.size:
                        if item.quantity > stockObject.stock:
                            return Response({"message": "There was not enough stock in the store for your order."}, status=status.HTTP_406_NOT_ACCEPTABLE)
                        else:
                            stockObject.stock = stockObject.stock - item.quantity
                            stockObject.save()
                            print(item.quantity)
                            print(stockObject.stock)
        return Response({"message": "Lowered Stock from products."}, status=status.HTTP_200_OK)


# Calculates the amount the user should pay through stripe
class CartUpdateTotalView(generics.RetrieveUpdateAPIView):
    serializer_class = CartTotalSerializer
    queryset = Cart.objects.all()

    def put(self, request, *args, **kwargs):
        kwargs['partial'] = True
        requestData = self.request.data.copy()
        cartItems = CartItem.objects.filter(cart=request.user.pk)
        cart = Cart.objects.filter(user=request.user).first()
        newTotal = 0
        for cartItem in cartItems:
            if cartItem.item.sale_price is not None:
                newTotal = newTotal + \
                    (float(cartItem.item.sale_price)*cartItem.quantity)
            else:
                newTotal = newTotal + \
                    (float(cartItem.item.price)*cartItem.quantity)
        finalTotal = round(Decimal(newTotal), 2)
        requestData['total'] = newTotal
        requestData['user'] = request.user.pk
        serializer = CartTotalSerializer(cart, data=requestData, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CartDetailView(generics.RetrieveUpdateAPIView):
    queryset = Cart.objects.all()
    permission_classes = (IsAuthenticated, AdminOrUser)
    serializer_class = CartDetailSerializer


# Create View for users to add cart items
class CartItemCreateView(generics.CreateAPIView):
    serializer_class = CartItemCreateSerializer
    permission_classes = (IsAuthenticated, )
    queryset = CartItem.objects.all()


# Update view for updating quantity or removing on cart page
class CartItemUpdateView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CartItemUpdateSerializer
    permission_classes = (AdminOrUserCart, )
    queryset = CartItem.objects.all()


# Viewset for admins
class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemListSerializer
    queryset = CartItem.objects.all()
    permission_classes = (IsAdminUser, )

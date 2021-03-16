from orders.views import (OrderViewSet,
                          OrderItemCreateView,
                          CartDetailView,
                          CartCreateView,
                          CartUpdateTotalView,
                          CartCheckoutView,
                          CartItemCreateView,
                          CartItemViewSet,
                          CartItemUpdateView)
from products.views import ProductViewSet
from rest_framework.routers import DefaultRouter
from allauth.account.views import confirm_email
from django.urls import path, re_path

router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename="order")
router.register(r'products', ProductViewSet, basename="product")
router.register(r'admincartitems', CartItemViewSet, basename="cartitem")
urlpatterns = [
    path('cart/<pk>/', CartDetailView.as_view()),
    path('newcart/', CartCreateView.as_view()),
    path('cart-calculate-total/<pk>/', CartUpdateTotalView.as_view()),
    path('cart-checkout/<pk>/', CartCheckoutView.as_view()),
    path('cartitem/create/', CartItemCreateView.as_view()),
    path('cartitem/<pk>/', CartItemUpdateView.as_view()),
    path('orderitem/create/', OrderItemCreateView.as_view()),
]
urlpatterns += router.urls

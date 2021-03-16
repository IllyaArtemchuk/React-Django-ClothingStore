from django.urls import path
from .views import (UserListView,
                    CurrentUserView,
                    AddressCreateView,
                    AddressUpdateView,
                    CurrentUserUpdateAddressView)

urlpatterns = [
    path('', UserListView.as_view()),
    path('current/', CurrentUserView.as_view()),
    path('address/create/', AddressCreateView.as_view()),
    path('address/update/<pk>/', AddressUpdateView.as_view()),
    path('default/update/', CurrentUserUpdateAddressView.as_view())
]

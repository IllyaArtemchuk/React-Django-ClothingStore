from rest_framework import permissions


class AdminOrReadOnly(permissions.BasePermission):
    message = "only administrators can edit products"

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        elif request.user.is_staff == True:
            return True
        else:
            return False


class AdminOrUser(permissions.BasePermission):
    message = "Only admins can access objects other than their own"

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff == True:
            return True
        return obj.user == request.user


class AdminOrCreateReadOnly(permissions.BasePermission):
    message = "Only admins can edit order data"

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff == True:
            return True
        if request.method in permissions.SAFE_METHODS or request.method == "CREATE":
            if request.method != "CREATE":
                return obj.user == request.user
            else:
                return True
        else:
            return False


class AdminOrUserCart(permissions.BasePermission):
    message = "The item must belong to your cart"

    def has_object_permission(self, request, view, obj):
        print(obj.cart)
        print(request.user.pk)
        if request.user.is_staff:
            return True
        if request.user.cart == obj.cart:
            return True
        else:
            return False


class AdminOrCreate(permissions.BasePermission):
    message = "Only admins can see data"

    def has_permission(self, request, view):
        if request.user.is_staff == True:
            return True
        if request.method == "POST":
            return True
        else:
            return False

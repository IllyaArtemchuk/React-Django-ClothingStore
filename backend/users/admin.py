from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser, Address

class AddressInline(admin.TabularInline):
    model = Address


class CustomUserAdmin(UserAdmin):
    inlines = [
        AddressInline
    ]
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['email', 'username' ]

admin.site.register(CustomUser, CustomUserAdmin)
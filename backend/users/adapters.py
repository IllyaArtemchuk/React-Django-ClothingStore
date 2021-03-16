from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings
# This code is required to save custom fields in django rest-auth on registration


class CustomUserAccountAdapter(DefaultAccountAdapter):
    def save_user(self, request, user, form, commit=True):
        """
        Saves a new `User` instance using information provided in the signup form.
        """
        from allauth.account.utils import user_field
        user = super().save_user(request, user, form, False)
        user.save()
        return user

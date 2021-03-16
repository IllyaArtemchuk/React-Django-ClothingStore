from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/v1/', include('api.urls')),
    path('api/v1/rest-auth/', include('rest_auth.urls')),
    path('api/v1/rest-auth/registration/',
         include('rest_auth.registration.urls')),
    path('api/v1/users/', include('users.urls')),
    re_path(".*", TemplateView.as_view(template_name="index.html")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

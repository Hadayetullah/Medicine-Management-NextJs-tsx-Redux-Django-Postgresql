from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('app_useraccount.urls')),
    path('api/product/', include('app_product.urls')),
    path('api/customer/', include('app_sale_product.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

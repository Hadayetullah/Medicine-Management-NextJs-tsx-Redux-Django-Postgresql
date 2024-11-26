"""
ASGI config for apibackend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os

from channels.routing import ProtocolTypeRouter, URLRouter

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'apibackend.settings')

medicine_management_app = get_asgi_application()


from app_product.token_auth import TokenAuthMiddleware

from app_product.routing import websocket_urlpatterns as medicine_websocket_urlpatterns

websocket_urlpatterns = medicine_websocket_urlpatterns

application = ProtocolTypeRouter(
    {
        "http": medicine_management_app,
        "websocket": TokenAuthMiddleware(
            URLRouter(websocket_urlpatterns)
        )
    }
)

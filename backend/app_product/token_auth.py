from django.contrib.auth.models import AnonymousUser
from datetime import datetime

from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware

from rest_framework_simplejwt.tokens import AccessToken

from app_useraccount.models import User


@database_sync_to_async
def get_user(token_key):
    try:
        token = AccessToken(token_key)
        user_id = token.payload['user_id']
        return User.objects.get(pk=user_id)
    except Exception as e:
        return AnonymousUser
    

class TokenAuthMiddleware(BaseMiddleware):
    def __init__(self, inner):
        self.inner = inner
    
    async def __call__(self, scope, receive, send):
        query = dict((x.split('=') for x in scope['query_string'].decode().split('&')))
        token_key = query.get('token')
        user = await get_user(token_key)

        scope['user'] = user
        scope['token_expiry'] = self.get_token_expiry(token_key)

        return await super().__call__(scope, receive, send)
    

    def get_token_expiry(self, token_key):
        try:
            token = AccessToken(token_key)
            expiry = datetime.fromtimestamp(token.payload['exp'])
            return expiry
        except Exception:
            return None
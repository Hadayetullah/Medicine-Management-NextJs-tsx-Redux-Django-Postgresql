import json
import asyncio

from django.contrib.auth.models import AnonymousUser
from datetime import datetime, timezone

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
    

def get_token_expiry(token_key):
    try:
        token = AccessToken(token_key)
        expiry = datetime.fromtimestamp(token.payload['exp'])
        return expiry
    except Exception:
        return None
    

class TokenAuthMiddleware(BaseMiddleware):
    def __init__(self, inner):
        self.inner = inner
    
    async def __call__(self, scope, receive, send):
        query = dict((x.split('=') for x in scope['query_string'].decode().split('&')))
        token_key = query.get('token')
        user = await get_user(token_key)

        scope['user'] = user
        scope['token_expiry'] = get_token_expiry(token_key)

        asyncio.create_task(self.token_validation_loop(scope, send))

        return await super().__call__(scope, receive, send)
    

    async def token_validation_loop(self, scope, send):
        while True:
            token_expiry = scope.get('token_expiry')
            if not token_expiry:
                # Close the connection if the token is invalid
                await send({'type': 'websocket.close'})
                break

            # Check if the token is about to expire
            time_left = (token_expiry - datetime.now(timezone.utc)).total_seconds()
            if time_left < 30:  # 30 seconds threshold for token renewal
                # Request token renewal from the client
                await send({
                    'type': 'websocket.send',
                    'text': json.dumps({'action': 'renew_token'})
                })

            await asyncio.sleep(10)  # Check token validity every 10 seconds
import json
import asyncio
from asgiref.sync import sync_to_async, async_to_sync

from django.contrib.auth.models import AnonymousUser
from datetime import datetime, timezone

from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware

from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.exceptions import AuthenticationFailed

from app_useraccount.models import User
from app_useraccount.util import DeviceBindingAuthentication


# @database_sync_to_async
# def get_user(token_key):
#     try:
#         token = AccessToken(token_key)
#         user_id = token.payload['user_id']
#         return User.objects.get(pk=user_id)
#     except Exception as e:
#         return AnonymousUser
    

# def get_token_expiry(token_key):
#     try:
#         token = AccessToken(token_key)
#         expiry = datetime.fromtimestamp(token.payload['exp'], tz=timezone.utc)
#         return expiry
#     except Exception:
#         return None
    

class TokenAuthMiddleware(BaseMiddleware):
    def __init__(self, inner):
        self.inner = inner
    
    async def __call__(self, scope, receive, send):
        query = dict((x.split('=') for x in scope['query_string'].decode().split('&')))
        token = query.get('token')
        # device_id = query.get('device_id')
        # token_key = query.get('token')
        # user = await get_user(token_key)
        # token_expiry = get_token_expiry(token_key)

        # if not token or not device_id:
        #     await self.close(send)
        #     return

        if not token:
            await self.close(send)
            return
        
        auth = DeviceBindingAuthentication()

        try:
            # user, _ = await sync_to_async(auth.authenticate_credentials)((token, device_id))

            # For testing
            user, _ = await sync_to_async(auth.authenticate_credential)((token))
        except AuthenticationFailed:
            await self.close(send)
            return


        scope['user'] = user
        # scope['token_expiry'] = token_expiry

        # asyncio.create_task(self.token_validation_loop(scope, send))

        return await super().__call__(scope, receive, send)
    

    async def close(self, send):
        """Helper method to close the WebSocket connection."""
        await send({'type': 'websocket.close'})
    

    # async def token_validation_loop(self, scope, send):
    #     short_sleep_done = False
    #     long_sleep_done = False

    #     while True:
    #         token_expiry = scope.get('token_expiry')
    #         if not token_expiry:
    #             # Close the connection if the token is invalid
    #             await send({'type': 'websocket.close'})
    #             break

    #         # Check if the token is about to expire
    #         time_left = (token_expiry - datetime.now(timezone.utc)).total_seconds()
    #         print("Current time : ", datetime.now(timezone.utc))
    #         print("Time Left : ", time_left)
    #         if time_left < 0:
    #             await send({'type': 'websocket.close'})
    #             break

    #         if time_left < 30:  # 30 seconds threshold for token renewal
    #             # Request token renewal from the client
    #             await send({
    #                 'type': 'websocket.send',
    #                 'text': json.dumps({'action': 'renew_token'})
    #             })

    #         # await asyncio.sleep(270)  # Check token validity every 270 seconds (4.5 seconds)

    #         # if not long_sleep_done:
    #         #     # await asyncio.sleep(270)
    #         #     await asyncio.sleep(45)
    #         #     long_sleep_done = True

    #         # elif not short_sleep_done:
    #         #     await asyncio.sleep(15)  # Perform a short sleep first
    #         #     short_sleep_done = True  # Mark the short sleep as done
    #         # else:
    #         #     # await asyncio.sleep(240)  # Use the longer sleep interval afterward
    #         #     await asyncio.sleep(30)  # Use the longer sleep interval afterward
    #         #     short_sleep_done = False  # Mark the short sleep as undone

    #         await asyncio.sleep(30)
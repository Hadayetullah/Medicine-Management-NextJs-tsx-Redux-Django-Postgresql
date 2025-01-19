from django.shortcuts import get_object_or_404
from django.http import Http404
from django.core.mail import EmailMultiAlternatives

from asgiref.sync import sync_to_async, async_to_sync

from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError

from .models import User

class DeviceBindingAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        device_id = request.headers.get('Device-Id')

        if not auth_header or not device_id:
            raise AuthenticationFailed('Missing token or device ID')

        auth_parts = auth_header.split()
        if len(auth_parts) != 2 or auth_parts[0].lower() != 'bearer':
            raise AuthenticationFailed('Invalid authorization header format')

        token_str = auth_parts[1]
        try:
            token = AccessToken(token_str)
            if token.get('device_id') != device_id:
                raise AuthenticationFailed('Invalid device')
        except TokenError:
            raise AuthenticationFailed('Invalid token')

        user = async_to_sync(self.get_user_from_token)(token)
        if not user:
            raise AuthenticationFailed('User not found')

        return (user, None)
    

    def authenticate_credentials(self, token_str, device_id):
        try:
            token = AccessToken(token_str)
            if token.get('device_id') != device_id:
                raise AuthenticationFailed('Invalid device')
        except TokenError:
            raise AuthenticationFailed('Invalid token')

        user = async_to_sync(self.get_user_from_token)(token)
        if not user:
            raise AuthenticationFailed('User not found')

        return user, None
    

    def authenticate_credential(self, token_str):
        try:
            token = AccessToken(token_str)
        except TokenError:
            raise AuthenticationFailed('Invalid token')

        user = async_to_sync(self.get_user_from_token)(token)
        if not user:
            raise AuthenticationFailed('User not found')

        return user, None


    async def get_user_from_token(self, token):
        # Extract 'user_id' from the token
        user_id = token.get('user_id')
        if user_id is None:
            return None
        
        try:
            user = await sync_to_async(get_object_or_404)(User, id=user_id)
            return user
        except Http404:
            # Converting Http404 to AuthenticationFailed
            raise AuthenticationFailed('User not found')




class SendEmail:
    @staticmethod
    def send_email(data):
        email = EmailMultiAlternatives(
            subject=data['subject'],
            text_content=data['text_content'],
            from_email=data['from_email'],
            to_email=[data['to_email']],
        )
        email.attach_alternative(data['html_content'], "text/html")
        email.send(fail_silently=False)



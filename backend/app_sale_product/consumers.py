

import json
from json import JSONDecodeError

from django.shortcuts import get_object_or_404
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from .models import Customer
from .serializers import CustomerSerializer

class CustomerConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Allow connection
        self.room_group_name = 'customers'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, payload_data):
        """
        Handles messages from the WebSocket.
        Expected actions: `add_customer`, `update_customer`, `delete_customer`.
        """
        try:
            data = json.loads(payload_data)
            action = data.get('action')

            # Ensure the user is authenticated
            user = self.scope.get('user')
            if not user or not user.is_authenticated:
                response = {'error': 'User is not authenticated'}

            elif action == 'add_customer':
                response = await self.add_customer(data)

            elif action == 'update_customer':
                response = await self.update_customer(data)

            elif action == 'delete_customer':
                response = await self.delete_customer(data)

            else:
                response = {'error': 'Invalid action'}

        except JSONDecodeError:
            response = {'error': 'Invalid JSON format'}
        except Exception as e:
            response = {'error': f"An unexpected error occurred: {str(e)}"}

        # Send response to WebSocket
        await self.send(payload_data=json.dumps(response))


    async def add_customer(self, data):
        """Handles adding a new customer."""
        serializer = CustomerSerializer(data=data.get('data'))
        if serializer.is_valid():
            customer = serializer.save()

            # Broadcast the new customer to the group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'handle_add_customer',
                    'action': 'add_customer',
                    'message': f"New customer added: {customer.name} ({customer.age})",
                    'customer': serializer.data  # Include the serialized customer object
                }
            )

            return {"message": "Customer added successfully", "data": serializer.data}
        return {"error": serializer.errors}
    
    
    async def handle_add_customer(self, event):
        """Handles broadcasting updates to all WebSocket connections."""
        action = event['action']
        message = event['message']
        customer = event['customer']  # Get the serialized customer object
        
        await self.send(payload_data=json.dumps({
            'action': action,
            'message': message,
            'customer': customer
        }))




    async def update_customer(self, data):
        """Handles updating an existing customer."""
        customer_id = data.get('data', {}).get('id')
        if not customer_id:
            return {"error": "Customer ID is required for update."}

        customer = await database_sync_to_async(get_object_or_404)(Customer, id=customer_id)
        serializer = CustomerSerializer(customer, data=data.get('data'), partial=True)
        if serializer.is_valid():
            customer = serializer.save()
            # Broadcast the updated customer to the group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'handle_update_customer',
                    'action': 'update_customer',
                    'message': f"Updated customer: {customer.name} ({customer.age})",
                    'customer': serializer.data  # Include the serialized customer object
                }
            )

            return {"message": "Customer updated successfully", "data": serializer.data}
        return {"error": serializer.errors}
    

    async def handle_update_customer(self, event):
        """Handles broadcasting updates to all WebSocket connections."""
        action = event['action']
        message = event['message']
        customer = event['customer']  # Get the serialized customer object
        
        await self.send(payload_data=json.dumps({
            'action': action,
            'message': message,
            'customer': customer
        }))




    async def delete_customer(self, data):
        """Handles deleting a customer."""
        customer_id = data.get('data', {}).get('id')
        if not customer_id:
            return {"error": "Customer ID is required for deletion."}

        customer = await database_sync_to_async(get_object_or_404)(Customer, id=customer_id)
        await database_sync_to_async(customer.delete)()

        # Broadcast the updated customer to the group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'handle_delete_customer',
                'action': 'delete_customer',
                'message': f"A customer was deleted",
                'customer': customer_id  # Include the customer id
            }
        )
        
        return {"message": "Customer deleted successfully"}
    

    async def handle_delete_customer(self, event):
        """Handles broadcasting updates to all WebSocket connections."""
        action = event['action']
        message = event['message']
        customer = event['customer']  # Get the serialized customer object
        
        await self.send(payload_data=json.dumps({
            'action': action,
            'message': message,
            'customer': customer
        }))

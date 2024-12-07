from django.db import IntegrityError

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import Medicine, Company, Category, DosageForm

from .serializers import MedicineListSerializer

class MedicineConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Allow connection
        self.room_group_name = 'medicine'
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

    async def receive(self, text_data):
        """
        Handles messages from the WebSocket. 
        Expected actions: `add_medicine`, `update_token`
        """
        data = json.loads(text_data)
        action = data.get('action')

        if action == 'add_medicine':
            # Add a new medicine
            response = await self.add_medicine()
        elif action == 'update_token':
            # Fetch medicines
            response = await self.update_token()
        else:
            response = {'error': 'Invalid action'}

        # Send response to WebSocket
        await self.send(text_data=json.dumps(response))

    async def add_medicine(self, data):
        """Adds a new medicine to the database."""
        try:

            # Ensure the user is authenticated
            user = self.scope.get('user')
            if not user or not user.is_authenticated:
                return {'error': 'User is not authenticated'}
        

            # Fetch or create the related objects using their names
            company, _ = await sync_to_async(Company.objects.get_or_create)(name=data['company_name'])
            category, _ = await sync_to_async(Category.objects.get_or_create)(name=data['category_name'])
            dosage_form, _ = await sync_to_async(DosageForm.objects.get_or_create)(name=data['dosage_form_name'])
            
            # Create the medicine object
            medicine = await sync_to_async(Medicine.objects.create)(
                name=data['name'],
                company=company,
                category=category,
                dosage_form=dosage_form,
                price=data['price'],
                power=data['power'],
                shelf_no=data['shelf_no'],
                created_by=self.scope['user']  # Assuming user is authenticated for now
            )


            # Serialize the medicine object
            medicine_data = MedicineListSerializer(medicine).data
            

            # Broadcast the new medicine to the group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'handle_add_medicine',
                    'message': f"New medicine added: {medicine.category.name}",
                    'medicine': medicine_data  # Include the serialized medicine object
                }
            )

            # Return the medicine data to the client that triggered the creation
            return {'success': "Medicine added successfully!", 'medicine': medicine_data}
        
        except IntegrityError as e:
            return {'error': f"Integrity error occurred: {str(e)}"}

        except Exception as e:
            return {'error': f"An unexpected error occurred: {str(e)}"}




    async def update_token(self):
        # new_token = data.get('token')
        # user = await get_user(new_token)
        user = self.scope.get('user')
        if user.is_authenticated:
            self.scope['user'] = user
            self.scope['token_expiry'] = self.scope.get('token_expiry')
            await self.send(json.dumps({'success': 'Token updated'}))
        else:
            await self.send(json.dumps({'error': 'Invalid token'}))


    async def handle_add_medicine(self, event):
        """Handles broadcasting updates to all WebSocket connections."""
        message = event['message']
        medicine = event['medicine']  # Get the serialized medicine object
        
        await self.send(text_data=json.dumps({
            'message': message,
            'medicine': medicine
        }))




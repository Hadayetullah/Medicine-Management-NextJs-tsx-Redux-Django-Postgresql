import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import Medicine, Company, Category, DosageForm

class MedicineConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Allow connection
        self.room_group_name = 'medicine_updates'
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
        Expected actions: `add_medicine`, `get_medicines`
        """
        data = json.loads(text_data)
        action = data.get('action')

        if action == 'add_medicine':
            # Add a new medicine
            response = await self.add_medicine(data)
        elif action == 'get_medicines':
            # Fetch medicines
            response = await self.get_medicines()
        else:
            response = {'error': 'Invalid action'}

        # Send response to WebSocket
        await self.send(text_data=json.dumps(response))

    async def add_medicine(self, data):
        """Adds a new medicine to the database."""
        try:
            company = await sync_to_async(Company.objects.get)(id=data['company_id'])
            category = await sync_to_async(Category.objects.get)(id=data['category_id'])
            dosage_form = await sync_to_async(DosageForm.objects.get)(id=data['dosage_form_id'])
            
            medicine = await sync_to_async(Medicine.objects.create)(
                company=company,
                category=category,
                dosage_form=dosage_form,
                price=data['price'],
                power=data['power'],
                shelf_no=data['shelf_no'],
                created_by=self.scope['user']  # Assuming user is authenticated
            )

            # Broadcast the new medicine to the group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'medicine_update',
                    'message': f"New medicine added: {medicine.category.name}"
                }
            )

            return {'success': f"Medicine {medicine.category.name} added successfully!"}
        except Exception as e:
            return {'error': str(e)}

    async def get_medicines(self):
        """Retrieves a list of medicines."""
        medicines = await sync_to_async(list)(
            Medicine.objects.values('id', 'category__name', 'price', 'power', 'shelf_no')
        )
        return {'medicines': medicines}

    async def medicine_update(self, event):
        """Handles broadcasting updates to all WebSocket connections."""
        message = event['message']
        await self.send(text_data=json.dumps({'update': message}))

from django.db import IntegrityError

# from datetime import datetime, timezone
# from django.contrib.auth.models import AnonymousUser

import json
from json import JSONDecodeError

from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import Medicine, Company, Category, DosageForm

from .serializers import MedicineListSerializer

# from .token_auth import get_user, get_token_expiry

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
        Expected actions: `add_medicine`, `update_medicine`.
        """
        try:
            # Parse the incoming data
            data = json.loads(text_data)
            action = data.get('action')

            # Ensure the user is authenticated
            user = self.scope.get('user')
            if not user or not user.is_authenticated:
                # await self.send(text_data=json.dumps({'error': 'User is not authenticated'}))
                # return {'error': 'User is not authenticated'}
                response = {'error': 'User is not authenticated'}

            elif action == 'add_medicine':
                # Add a new medicine
                response = await self.add_medicine(data)

            elif action == 'update_medicine':
                data_obj = data.get('data')
                if not data_obj:
                    response = {'error': 'No data provided for update_medicine'}
                else:
                    response = await self.update_medicine(data_obj)

            else:
                response = {'error': 'Invalid action'}

        except JSONDecodeError:
            response = {'error': 'Invalid JSON format'}
        except Exception as e:
            # Log the error if necessary
            response = {'error': f"An unexpected error occurred: {str(e)}"}

        # Send response to WebSocket
        await self.send(text_data=json.dumps(response))


    async def add_medicine(self, data):
        """Adds a new medicine to the database."""

        errors = self.validate_fields(data)
        if errors:
            return {'error': errors}
        
        try:
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
                quantity=data['quantity'],
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
                    'action': 'new_medicine',
                    'message': f"New medicine added: {medicine.name}",
                    'medicine': medicine_data  # Include the serialized medicine object
                }
            )

            # Return the medicine data to the client that triggered the creation
            return {'success': "Medicine added successfully!", 'medicine': medicine_data}
        
        except IntegrityError as e:
            return {'error': f"Integrity error occurred: {str(e)}"}

        except Exception as e:
            return {'error': f"An unexpected error occurred: {str(e)}"}

    async def update_medicine(self, data):
        """Updates an existing medicine entry in the database."""


        ACTION_FIELD_MAP = {
            'name': 'name',
            'company': 'company',
            'category': 'category',
            'dosage_form': 'dosage_form',
            'price': 'price',
            'power': 'power',
            'shelf_no': 'shelf_no',
            'quantity': 'quantity',
        }

        id = data.get('id')
        action = data.get('action')
        value = data.get('value')

        if action not in ACTION_FIELD_MAP:
            return {'error': f"Invalid action: {action}"}
        
        errors = self.validate_fields(data)
        if errors:
            return {'error': errors}


        try:
            # Fetch the medicine instance
            medicine = await sync_to_async(Medicine.objects.select_related('company', 'category', 'dosage_form').get)(pk=id)
            field_name = ACTION_FIELD_MAP[action]

            # Handle related fields: update the `name` field of the foreign key object
            if action == 'company':
                related_obj = medicine.company
            elif action == 'category':
                related_obj = medicine.category
            elif action == 'dosage_form':
                related_obj = medicine.dosage_form
            else:
                related_obj = None

            if related_obj:
                setattr(related_obj, 'name', value)  # Update the name field
                await sync_to_async(related_obj.save)()  # Save the updated object

            else:
                # Update the direct field of the Medicine instance
                setattr(medicine, field_name, value)
                await sync_to_async(medicine.save)(update_fields=[field_name])

            # Serialize and broadcast the updated medicine
            medicine_data = MedicineListSerializer(medicine).data
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'handle_update_medicine',
                    'action': 'update_medicine',
                    'message': f"Medicine updated: {medicine.name}",
                    'medicine': medicine_data,
                }
            )

            return {'success': "Medicine updated successfully!", 'action': 'update_medicine', 'sub_action': action, 'medicine': medicine_data}

        except Medicine.DoesNotExist:
            return {'error': f"Medicine with ID {id} does not exist."}
        except IntegrityError as e:
            return {'error': f"Integrity error occurred: {str(e)}"}
        except Exception as e:
            return {'error': f"An unexpected error occurred: {str(e)}"}


    async def handle_add_medicine(self, event):
        """Handles broadcasting updates to all WebSocket connections."""
        action = event['action']
        message = event['message']
        medicine = event['medicine']  # Get the serialized medicine object
        
        await self.send(text_data=json.dumps({
            'action': action,
            'message': message,
            'medicine': medicine
        }))


    async def handle_update_medicine(self, event):
        """Handles broadcasting updates to all WebSocket connections."""
        action = event['action']
        message = event['message']
        medicine = event['medicine']  # Get the serialized medicine object
        
        await self.send(text_data=json.dumps({
            'action': action,
            'message': message,
            'medicine': medicine
        }))


    def validate_fields(self, data_entry):
            errors = {}
            
            # Validate price (float, must be > 0)
            price = data_entry.get('price')
            if price is not None:
                try:
                    price = float(price)
                    if price <= 0:
                        errors['price'] = "Price must be greater than 0."
                except ValueError:
                    errors['price'] = "Price must be a valid number."

            # Validate power (float, must be > 0)
            power = data_entry.get('power')
            if power is not None:
                try:
                    power = float(power)
                    if power <= 0:
                        errors['power'] = "Power must be greater than 0."
                except ValueError:
                    errors['power'] = "Power must be a valid number."

            # Validate quantity (integer, must be >= 0)
            quantity = data_entry.get('quantity')
            if quantity is not None:
                try:
                    quantity = int(quantity)
                    if quantity < 0:
                        errors['quantity'] = "Quantity must be a non-negative integer."
                except ValueError:
                    errors['quantity'] = "Quantity must be a valid integer."

            # Validate shelf_no (integer, must be > 0)
            shelf_no = data_entry.get('shelf_no')
            if shelf_no is not None:
                try:
                    shelf_no = int(shelf_no)
                    if shelf_no <= 0:
                        errors['shelf_no'] = "Shelf number must be greater than 0."
                except ValueError:
                    errors['shelf_no'] = "Shelf number must be a valid integer."

            return errors
    

    # async def update_token(self, data):
    #     new_access_token = data.get('token')

    #     renewed_user = await get_user(new_access_token)
    #     new_token_expiry = get_token_expiry(new_access_token)

    #     user = self.scope.get('user')
    #     old_token_expiry = self.scope.get('token_expiry')

    #     if isinstance(renewed_user, AnonymousUser) or not new_token_expiry:
    #             # Close the WebSocket if the user is anonymous or the token is invalid/expired
    #             await self.send({'type': 'websocket.close'})
    #             return

    #     if user.is_authenticated:
    #         time_left = (old_token_expiry - datetime.now(timezone.utc)).total_seconds()
    #         if time_left < 0:
    #             await self.send({'type': 'websocket.close'})
    #             return
            
    #         self.scope['user'] = renewed_user
    #         self.scope['token_expiry'] = new_token_expiry
    #         await self.send(json.dumps({'success': 'Token updated'}))
            
    #     else:
    #         # await self.send(json.dumps({'error': 'Invalid token'}))
    #         await self.send({'type': 'websocket.close'})




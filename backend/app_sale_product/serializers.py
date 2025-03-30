from django.db import transaction
from rest_framework import serializers
from .models import Customer, PrescribedMedicines
from  app_product.models import Medicine


from app_product.serializers import MedicineListSerializer



class PrescribedMedicinesSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)  # Allow updating existing prescriptions
    is_deleted = serializers.BooleanField(write_only=True, required=False)
    medicine = serializers.UUIDField(write_only=True)  # Accepts UUID for POST
    medicine_details = MedicineListSerializer(source='medicine', read_only=True)  # Returns full medicine data for GET

    class Meta:
        model = PrescribedMedicines
        fields = ['id', 'medicine', 'medicine_details', 'is_deleted', 'sold_quantity']

    def create(self, validated_data):
        """Handles creating a new prescription and updating medicine quantity."""
        medicine_uuid = validated_data.pop('medicine')
        
        try:
            medicine = Medicine.objects.get(id=medicine_uuid)
        except Medicine.DoesNotExist:
            raise serializers.ValidationError({"medicine": "Invalid medicine UUID."})

        # Ensure enough stock is available
        sold_quantity = validated_data.get("sold_quantity", 0)
        # print("sold_quantity :" , sold_quantity)
        if medicine.quantity < sold_quantity:
            raise serializers.ValidationError({"medicine": "Not enough stock available."})

        with transaction.atomic():  # Ensures atomicity
            # Reduce medicine quantity
            medicine.quantity -= sold_quantity
            medicine.save()

            # Create prescription
            prescription = PrescribedMedicines.objects.create(medicine=medicine, **validated_data)

        return prescription
    

    def update(self, instance, validated_data):
        """Handles updating a prescription and adjusting medicine quantity accordingly."""
        medicine = instance.medicine  # Existing medicine
        old_sold_quantity = instance.sold_quantity  # Old sold quantity
        new_sold_quantity = validated_data.get("sold_quantity", old_sold_quantity)

        with transaction.atomic():
            # Adjust medicine quantity based on the difference
            quantity_change = new_sold_quantity - old_sold_quantity

            if medicine.quantity < quantity_change and medicine.quantity < 1:
                raise serializers.ValidationError({"medicine": "Not enough stock available."})

            medicine.quantity -= quantity_change
            medicine.save()

            # Update prescription
            instance.sold_quantity = new_sold_quantity
            instance.save()

        return instance 




class CustomerSerializer(serializers.ModelSerializer):
    customer_prescriptions = PrescribedMedicinesSerializer(many=True)  # Matches related_name in model

    class Meta:
        model = Customer
        fields = ['id', 'name', 'age', 'phone', 'address', 'email', 'customer_prescriptions']

    def create(self, validated_data):
        prescriptions_data = validated_data.pop('customer_prescriptions', [])
        customer = Customer.objects.create(**validated_data)

        for prescription in prescriptions_data:
            prescription_instance = PrescribedMedicinesSerializer(data=prescription)
            if prescription_instance.is_valid(raise_exception=True):
                prescription_instance.save(customer=customer)  # Set customer field

        return customer


    def update(self, instance, validated_data):
        prescriptions_data = validated_data.pop('customer_prescriptions', [])
        existing_prescriptions = {p.id: p for p in instance.customer_prescriptions.all()}  # Existing prescriptions
        
        with transaction.atomic():
            # Update customer details
            instance.name = validated_data.get('name', instance.name)
            instance.age = validated_data.get('age', instance.age)
            instance.phone = validated_data.get('phone', instance.phone)
            instance.address = validated_data.get('address', instance.address)
            instance.email = validated_data.get('email', instance.email)
            instance.save()

            for prescription_data in prescriptions_data:
                prescription_id = prescription_data.get("id")

                # ✅ **Handle Deletion Using `is_deleted` Flag**
                if prescription_data.get("is_deleted", False):
                    if prescription_id in existing_prescriptions:
                        prescription_instance = existing_prescriptions[prescription_id]
                        prescription_instance.medicine.quantity += prescription_instance.sold_quantity  # Restore stock
                        prescription_instance.medicine.save()
                        prescription_instance.delete()
                    continue  # Skip further processing for this item

                # ✅ **Handle Updating Existing Prescriptions**
                if prescription_id and prescription_id in existing_prescriptions:
                    prescription_instance = existing_prescriptions[prescription_id]
                    prescription_serializer = PrescribedMedicinesSerializer(
                        prescription_instance, data=prescription_data, partial=True
                    )
                    if prescription_serializer.is_valid(raise_exception=True):
                        prescription_serializer.save()

                # ✅ **Handle Creating New Prescriptions**
                else:
                    prescription_serializer = PrescribedMedicinesSerializer(data=prescription_data)
                    if prescription_serializer.is_valid(raise_exception=True):
                        prescription_serializer.save(customer=instance)

        return instance

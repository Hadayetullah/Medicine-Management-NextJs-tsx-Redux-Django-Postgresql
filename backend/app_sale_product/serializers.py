from django.db import transaction
from rest_framework import serializers
from .models import Customer, PrescribedMedicines
from  app_product.models import Medicine


from app_product.serializers import MedicineListSerializer



class PrescribedMedicinesSerializer(serializers.ModelSerializer):
    medicine = serializers.UUIDField(write_only=True)  # Accepts UUID for POST
    medicine_details = MedicineListSerializer(source='medicine', read_only=True)  # Returns full medicine data for GET

    class Meta:
        model = PrescribedMedicines
        fields = ['id', 'medicine', 'medicine_details', 'sold_quantity']

    def create(self, validated_data):
        """Handles creating a new prescription and updating medicine quantity."""
        medicine_uuid = validated_data.pop('medicine')
        
        try:
            medicine = Medicine.objects.get(id=medicine_uuid)
        except Medicine.DoesNotExist:
            raise serializers.ValidationError({"medicine": "Invalid medicine UUID."})

        # return PrescribedMedicines.objects.create(medicine=medicine, **validated_data)

        # Ensure enough stock is available
        sold_quantity = validated_data.get("sold_quantity", 0)
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

            if medicine.quantity < quantity_change and quantity_change > 0:
                raise serializers.ValidationError({"medicine": "Not enough stock available."})

            medicine.quantity -= quantity_change
            medicine.save()

            # Update prescription
            instance.sold_quantity = new_sold_quantity
            instance.save()

        return instance
    

    def delete(self, instance):
        """Handles deleting a prescription and restoring medicine quantity."""
        with transaction.atomic():
            # Restore medicine quantity when prescription is deleted
            medicine = instance.medicine
            medicine.quantity += instance.sold_quantity
            medicine.save()

            instance.delete()
    




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
                prescribed_medicine = prescription_instance.save(customer=customer)  # Set customer field

        return customer

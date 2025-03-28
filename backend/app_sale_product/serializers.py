from rest_framework import serializers
from .models import Customer, PrescribedMedicines
from  app_product.models import Medicine



class PrescribedMedicinesSerializer(serializers.ModelSerializer):
    medicine = serializers.UUIDField()  # Accepts UUID instead of ID

    class Meta:
        model = PrescribedMedicines
        fields = ['id', 'medicine', 'sold_quantity']

    def create(self, validated_data):
        medicine_uuid = validated_data.pop('medicine')
        try:
            medicine = Medicine.objects.get(id=medicine_uuid)
        except Medicine.DoesNotExist:
            raise serializers.ValidationError({"medicine": "Invalid medicine UUID."})

        return PrescribedMedicines.objects.create(medicine=medicine, **validated_data)


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

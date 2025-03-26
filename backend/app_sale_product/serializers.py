from rest_framework import serializers
from .models import PrescriptionDetail, PrescribedMedicine
from  app_product.serializers import MedicineSerializer
from  app_product.models import Medicine

class PrescribedMedicineSerializer(serializers.ModelSerializer):
    # medicine = MedicineSerializer()  # Nested serializer for medicine details
    # medicine = serializers.UUIDField()
    medicine = serializers.PrimaryKeyRelatedField(queryset=Medicine.objects.all())  # Converts UUID to Medicine instance

    class Meta:
        model = PrescribedMedicine
        fields = ["id", "medicine", "sold_quantity"]



class PrescriptionDetailSerializer(serializers.ModelSerializer):
    customer_prescription = PrescribedMedicineSerializer(many=True)  # Fetch related medicines

    class Meta:
        model = PrescriptionDetail
        fields = ["id", "name", "age", "phone", "address", "email", "customer_prescription"]

    def create(self, validated_data):
        medicines_data = validated_data.pop("customer_prescription")  # Extract prescribed medicines
        prescription = PrescriptionDetail.objects.create(**validated_data)

        for medicine_data in medicines_data:
            medicine = medicine_data["medicine"]
            PrescribedMedicine.objects.create(
                prescription=prescription, 
                medicine=medicine, 
                sold_quantity=medicine_data["sold_quantity"]
            )
        return prescription
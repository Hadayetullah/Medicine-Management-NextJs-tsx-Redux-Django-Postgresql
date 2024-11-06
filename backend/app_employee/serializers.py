from rest_framework import serializers
from app_product.models import Medicine
from .models import CreatedBy, UpdatedBy, AddMedicine, SellMedicine
from app_product.serializers import MedicineSerializer


# CreatedBy Serializer
class CreatedBySerializer(serializers.ModelSerializer):
    class Meta:
        model = CreatedBy
        fields = '__all__'

# UpdatedBy Serializer
class UpdatedBySerializer(serializers.ModelSerializer):
    class Meta:
        model = UpdatedBy
        fields = '__all__'

# AddMedicine Serializer
class AddMedicineSerializer(serializers.ModelSerializer):
    medicine = MedicineSerializer(read_only=True)
    created_by = CreatedBySerializer(read_only=True)
    updated_by = UpdatedBySerializer(read_only=True)

    class Meta:
        model = AddMedicine
        fields = ['id', 'medicine', 'created_by', 'updated_by']
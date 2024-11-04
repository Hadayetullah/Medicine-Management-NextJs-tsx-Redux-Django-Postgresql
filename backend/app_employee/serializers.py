from rest_framework import serializers
from app_product.models import Medicine
from .models import CreatedBy, UpdatedBy, AddMedicine, SellMedicine


class AddMedicineSerializer(serializers.Serializer):
    class Meta:
        model = Medicine
        exclude = ('id', 'created_at',)
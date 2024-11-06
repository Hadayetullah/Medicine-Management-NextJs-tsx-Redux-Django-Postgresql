from rest_framework import serializers

from .models import Medicine


# Medicine Serializer
class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = ['id', 'brand', 'company', 'category', 'dosage_form', 'price', 'power', 'shelf_no', 'image', 'created_at', 'modified_at']
from rest_framework import serializers

from .models import Medicine

class MedicineListSerializer(serializers.Serializer):
    class Meta:
        model = Medicine
        exclude = ('image', 'created_at', 'modified_at')
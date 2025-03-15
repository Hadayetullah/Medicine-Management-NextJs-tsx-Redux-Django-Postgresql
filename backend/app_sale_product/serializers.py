from rest_framework import serializers
from .models import PrescriptionDetail, PrescribedMedicine

class PrescribedMedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrescribedMedicine
        fields = '__all__'

class PrescriptionDetailSerializer(serializers.ModelSerializer):
    prescribed_data = PrescribedMedicineSerializer(many=True)

    class Meta:
        model = PrescriptionDetail
        fields = '__all__'

    def create(self, validated_data):
        medicines = validated_data.pop('prescribed_data')
        prescription = PrescriptionDetail.objects.create(**validated_data)
        for medicine in medicines:
            PrescribedMedicine.objects.create(prescription=prescription, **medicine)
        return prescription

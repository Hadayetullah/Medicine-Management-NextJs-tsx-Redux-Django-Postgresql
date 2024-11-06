from rest_framework import serializers

from .models import Company, Category, DosageForm, Medicine


# Medicine Serializer 
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class DosageFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = DosageForm
        fields = '__all__'


class MedicineSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    dosage_form = DosageFormSerializer(read_only=True)

    class Meta:
        model = Medicine
        fields = ['id', 'company', 'category', 'dosage_form', 'price', 'power', 'shelf_no', 'image', 'created_at']
from uuid import UUID
from rest_framework import serializers

from app_useraccount.models import User
from .models import Company, Category, DosageForm, Medicine, UpdatedBy, Customer, EditedBy, SellRecord


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

class UpdatedBySerializer(serializers.ModelSerializer):
    class Meta:
        model = UpdatedBy
        fields = '__all__'


class MedicineSerializer(serializers.ModelSerializer):
    # Use nested serializers for GET responses
    company = CompanySerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    dosage_form = DosageFormSerializer(read_only=True)

    # Use PrimaryKeyRelatedField for POST requests
    company_id = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), write_only=True, source='company')
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), write_only=True, source='category')
    dosage_form_id = serializers.PrimaryKeyRelatedField(queryset=DosageForm.objects.all(), write_only=True, source='dosage_form')

    class Meta:
        model = Medicine
        fields = [
            'id', 'name', 'company', 'category', 'dosage_form', 
            'company_id', 'category_id', 'dosage_form_id',
            'price', 'power', 'quantity', 'shelf_no', 'image', 'created_by', 'created_at'
        ]



class MedicineListSerializer(serializers.ModelSerializer):
    # Use nested serializers for GET responses
    company = CompanySerializer()
    category = CategorySerializer()
    dosage_form = DosageFormSerializer()

    class Meta:
        model = Medicine
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Convert UUID fields to strings
        for key, value in representation.items():
            if isinstance(value, UUID):
                representation[key] = str(value)
        return representation



class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class EditedBySerializer(serializers.ModelSerializer):
    class Meta:
        model = EditedBy
        fields = '__all__'



from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import CreatedBy, UpdatedBy, AddMedicine, SellMedicine
from app_product.models import Company, Category, DosageForm, Medicine
from app_product.serializers import MedicineSerializer
from .serializers import AddMedicineSerializer



''' Create your views here. '''
class AddMedicineView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        company_data = request.data.get('company')
        category_data = request.data.get('category')
        dosage_form_data = request.data.get('dosage_form')

        # Get or create related objects based on name
        company, _ = Company.objects.get_or_create(name=company_data)
        category, _ = Category.objects.get_or_create(name=category_data)
        dosage_form, _ = DosageForm.objects.get_or_create(name=dosage_form_data)

        # Prepare data for MedicineSerializer with IDs
        medicine_data = {
            'company_id': company.id,
            'category_id': category.id,
            'dosage_form_id': dosage_form.id,
            'price': request.data.get('price'),
            'power': request.data.get('power'),
            'shelf_no': request.data.get('shelf_no'),
            'image': request.data.get('image')
        }

        medicine_serializer = MedicineSerializer(data=medicine_data, context={'request': request})

        if medicine_serializer.is_valid():
            medicine = medicine_serializer.save()

            created_by = CreatedBy.objects.create(user=request.user)
            add_medicine = AddMedicine.objects.create(medicine=medicine, created_by=created_by)
            add_medicine_serializer = AddMedicineSerializer(add_medicine)
            


            return Response({'msg': 'Medicine added successfully', 'medicine': add_medicine_serializer.data}, status=status.HTTP_201_CREATED)
        return Response(medicine_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


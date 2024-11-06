from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import CreatedBy, UpdatedBy, AddMedicine, SellMedicine
from app_product.models import Company, Category, DosageForm, Medicine
from app_product.serializers import MedicineSerializer



''' Create your views here. '''
class AddMedicineView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        company_data = request.data.get('company')
        category_data = request.data.get('category')
        dosage_form_data = request.data.get('dosage_form')

        company, _ = Company.objects.get_or_create(name=company_data)
        category, _ = Category.objects.get_or_create(name=category_data)
        dosage_form, _ = DosageForm.objects.get_or_create(name=dosage_form_data)

        medicine_data = {
            'company': company,
            'category': category,
            'dosage_form': dosage_form,
            'price': request.data.get('price'),
            'power': request.data.get('power'),
            'shelf_no': request.data.get('shelf_no'),
            'image': request.data.get('image')
        }

        # created_by = CreatedBy.objects.create(user=request.user)
        # serializer = AddMedicineSerializer(data=medicine_data)

        medicine_serializer = MedicineSerializer(data=medicine_data)

        if medicine_serializer.is_valid():
            medicine = medicine_serializer.save()

            created_by = CreatedBy.objects.create(user=request.user)
            AddMedicine.objects.create(medicine=medicine, created_by=created_by)
            # add_medicine = AddMedicine.objects.create(medicine=medicine, created_by=created_by)
            # add_medicine_serializer = AddMedicineSerializer(add_medicine)
            # add_medicine = AddMedicine.objects.create(medicine=medicine, created_by=created_by)
            return Response({'msg': 'Medicine added successfully', 'medicine': medicine.data}, status=status.HTTP_201_CREATED)
        return Response(medicine_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


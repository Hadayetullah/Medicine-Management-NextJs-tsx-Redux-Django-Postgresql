from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .models import Company, Category, DosageForm, UpdatedBy, Medicine
from app_useraccount.models import User

from .serializers import MedicineSerializer

''' Create your views here. '''
class MedicineView(APIView):
    permission_classes = [IsAuthenticated]


    def get(self, request):
        medicines = Medicine.objects.all()
        serializer = MedicineSerializer(medicines, many=True, context={'request': request})
        return Response({'message': 'Medicine added successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    

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
            'name': request.data.get('name'),
            'company_id': company.id,
            'category_id': category.id,
            'dosage_form_id': dosage_form.id,
            'price': request.data.get('price'),
            'power': request.data.get('power'),
            'shelf_no': request.data.get('shelf_no'),
            'image': request.data.get('image'),
            'created_by': '',
            'created_by': request.user.id
        }

        medicine_serializer = MedicineSerializer(data=medicine_data, context={'request': request})

        if medicine_serializer.is_valid():
            medicine_serializer.save()

            return Response({'msg': 'Medicine added successfully', 'medicine': medicine_serializer.data}, status=status.HTTP_201_CREATED)
        return Response(medicine_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

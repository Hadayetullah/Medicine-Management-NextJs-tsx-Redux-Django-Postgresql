from django.db import transaction

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Customer
from .serializers import CustomerSerializer

class CustomerListCreateAPIView(APIView):
    def get(self, request):
        customers = Customer.objects.prefetch_related("customer_prescriptions__medicine").all()
        serializer = CustomerSerializer(customers, many=True)
        return Response(
            {"message": "Customers retrieved successfully", "data": serializer.data},
            status=status.HTTP_200_OK
        )

    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Customer created successfully", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"message": "Failed to create customer", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )


class CustomerDetailAPIView(APIView):
    """
    Handles retrieving, updating, and deleting a specific customer.
    """

    def get(self, request, id):
        customer = get_object_or_404(Customer, id=id)
        serializer = CustomerSerializer(customer)
        return Response(
            {"message": "Customer retrieved successfully", "data": serializer.data},
            status=status.HTTP_200_OK
        )

    def put(self, request, id):
        customer = get_object_or_404(Customer, id=id)
        serializer = CustomerSerializer(customer, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Customer updated successfully", "data": serializer.data},
                status=status.HTTP_200_OK
            )
        return Response(
            {"message": "Failed to update customer", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    def patch(self, request, id):
        customer = get_object_or_404(Customer, id=id)
        serializer = CustomerSerializer(customer, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Customer partially updated successfully", "data": serializer.data},
                status=status.HTTP_200_OK
            )
        return Response(
            {"message": "Failed to partially update customer", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, id):
        customer = get_object_or_404(Customer, id=id)

        with transaction.atomic():
            # Restore medicine stock for all prescriptions before deleting
            for prescription in customer.customer_prescriptions.all():
                medicine = prescription.medicine
                medicine.quantity += prescription.sold_quantity
                medicine.save()
                
                prescription.delete()  # Delete each prescription

            customer.delete()  # Delete the customer

        return Response(
            {"message": "Customer and all prescriptions deleted successfully, stock restored"},
            status=status.HTTP_200_OK
        )

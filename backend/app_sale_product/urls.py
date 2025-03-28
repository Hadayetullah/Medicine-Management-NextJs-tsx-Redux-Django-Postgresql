from django.urls import path
from .views import CustomerListCreateAPIView, CustomerDetailAPIView

urlpatterns = [
    path('prescriptions/', CustomerListCreateAPIView.as_view(), name='prescription'),
    path('prescriptions/<int:id>/', CustomerDetailAPIView.as_view(), name='prescription_detail'),
]

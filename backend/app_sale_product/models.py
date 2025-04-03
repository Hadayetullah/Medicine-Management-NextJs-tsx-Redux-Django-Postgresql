import uuid

from django.db import models
from simple_history.models import HistoricalRecords

from app_product.models import Medicine


# Create your models here.
class Customer(models.Model):
    name = models.CharField(max_length=255)
    age = models.IntegerField(default=0)
    phone = models.CharField(max_length=15, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    history = HistoricalRecords()  # Track customer updates

    def __str__(self):
        return f"{self.name} ({self.age} years old))"


class PrescribedMedicines(models.Model):
    customer = models.ForeignKey(Customer, related_name="customer_prescriptions", on_delete=models.CASCADE)  # FK to Customer
    medicine = models.ForeignKey(Medicine, related_name="medicine_data", on_delete=models.CASCADE)
    sold_quantity = models.IntegerField(default=0)
    history = HistoricalRecords()  # Track updates on prescriptions

    def __str__(self):
        return f"{self.medicine.name} - ({self.sold_quantity} qty)"

    

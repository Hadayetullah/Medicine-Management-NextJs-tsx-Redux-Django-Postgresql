from django.db import models

from app_product.models import Medicine

# Create your models here.
class PrescriptionDetail(models.Model):
    name = models.CharField(max_length=255)
    age = models.IntegerField()
    phone = models.CharField(max_length=15, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    email = models.EmailField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.age} years old)"
    

class PrescribedMedicine(models.Model):
    prescription = models.ForeignKey(PrescriptionDetail, related_name="customer_prescription", on_delete=models.CASCADE)
    medicine = models.ForeignKey(Medicine, related_name="medicine_data", on_delete=models.CASCADE)
    sold_quantity = models.IntegerField()

    def __str__(self):
        return f"{self.medicine.name} - (Qty: {self.sold_quantity})"
from django.db import models

from app_product.models import Medicine

# Create your models here.
class PrescribedMedicines(models.Model):
    medicine = models.ForeignKey(Medicine, related_name="medicine_data", on_delete=models.CASCADE)
    sold_quantity = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.medicine.name} - ({self.sold_quantity}qty)"
    

class Customer(models.Model):
    name = models.CharField(max_length=255)
    age = models.IntegerField(default=0)
    phone = models.CharField(max_length=15, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    prescription = models.ForeignKey(PrescribedMedicines, related_name="prescribed_medicines", on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.age} years old)"
    

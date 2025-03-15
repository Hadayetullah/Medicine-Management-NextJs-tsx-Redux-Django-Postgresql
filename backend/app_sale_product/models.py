from django.db import models

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
    prescription = models.ForeignKey(PrescriptionDetail, related_name="medicine_data", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    dosage_form = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    power = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.name} - {self.power}mg (Qty: {self.quantity})"
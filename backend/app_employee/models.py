import uuid
from django.db import models
from app_useraccount.models import User
from app_product.models import Medicine


# Create your models here.
class CreatedBy(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='creates_by')
    created_at = models.DateTimeField(auto_now_add=True)


class UpdatedBy(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='updates_by')
    updated_at = models.DateTimeField(auto_now_add=True)


class AddMedicine(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    medicine = models.ForeignKey(Medicine, on_delete=models.CASCADE, related_name='added_medicines')
    created_by = models.ForeignKey(CreatedBy, on_delete=models.CASCADE, related_name='created_medicines')
    updated_by = models.ForeignKey(UpdatedBy, on_delete=models.CASCADE, related_name='updated_medicines', null=True, blank=True)


class SellMedicine(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer_name = models.CharField(max_length=255)
    customer_age = models.IntegerField()
    customer_phone = models.CharField(max_length=20, null=True, blank=True)
    medicine_list = models.ManyToManyField(Medicine, related_name='sells')
    sold_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sells_employee')
    sold_at = models.DateTimeField(auto_now_add=True)

import uuid
from django.db import models
from app_useraccount.models import User
from app_product.models import Medicine


# Create your models here.
class CreatedBy(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, related_name='creates_by')
    created_at = models.DateTimeField(auto_now_add=True)


class UpdatedBy(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, related_name='updates_by')
    updated_at = models.DateTimeField(auto_now_add=True)


class AddMedicine(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    medicine = models.ForeignKey(Medicine, related_name='added_medicines')
    created_by = models.ForeignKey(CreatedBy, related_name='created_medicines')
    updated_by = models.ForeignKey(UpdatedBy, related_name='updated_medicines')


class SellMedicine(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    medicine_list = models.ManyToManyField(Medicine, related_name='sells')
    sold_by = models.ForeignKey(User, related_name='sells_employee')
    sold_at = models.DateTimeField(auto_now_add=True)

import uuid
from django.db import models
from app_useraccount.models import User
from app_product.models import Medicine


# Create your models here.
class CreatedBy(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User)
    created_at = models.DateTimeField(auto_now_add=True)


class UpdatedBy(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User)
    updated_at = models.DateTimeField(auto_now_add=True)


class AddMedicine(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    medicine = models.ForeignKey(Medicine)
    created_by = models.ForeignKey(CreatedBy)
    updated_by = models.ForeignKey(UpdatedBy)

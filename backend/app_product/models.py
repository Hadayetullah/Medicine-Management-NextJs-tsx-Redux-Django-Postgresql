import uuid
from django.conf import settings
from django.db import models

from app_useraccount.models import User

# Create your models here.


class Company(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    

class DosageForm(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class UpdatedBy(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='updates_by')
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.name


class Medicine(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, blank=True, null=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='companies')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='categories')
    dosage_form = models.ForeignKey(DosageForm, on_delete=models.CASCADE, related_name='dosages')
    price = models.FloatField(default=0)
    power = models.FloatField(default=0)
    quantity = models.IntegerField(default=0)
    shelf_no = models.IntegerField(default=0)
    image = models.ImageField(upload_to='uploads/image', null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='createdby')
    updated_by = models.ForeignKey(UpdatedBy, on_delete=models.CASCADE, related_name='updatedby', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.category.name
    
    def image_url(self):
        if self.image:
            return f'{settings.WEBSITE_URL}{self.image.url}'
        else:
            return ''
        


class Customer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer_name = models.CharField(max_length=255)
    customer_age = models.IntegerField()
    customer_phone = models.CharField(max_length=20, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.customer_name


class EditedBy(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='edit_by')
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.name

class SellRecord(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customer')
    medicine = models.ManyToManyField(Medicine, related_name='medicines')
    sold_by = models.ForeignKey(User, related_name='soldby', on_delete=models.CASCADE)
    edited_by = models.ManyToManyField(EditedBy, related_name='editedby')
    sold_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.customer.customer_name
        



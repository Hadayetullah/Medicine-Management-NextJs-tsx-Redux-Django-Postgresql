import uuid
from django.conf import settings
from django.db import models

# Create your models here.


class Company(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    

class DosageForm(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Medicine(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='companies')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='categories')
    dosage_form = models.ForeignKey(DosageForm, on_delete=models.CASCADE, related_name='dosages')
    price = models.FloatField()
    power = models.FloatField()
    shelf_no = models.IntegerField()
    image = models.ImageField(upload_to='uploads/image', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.brand
    
    def medicine_pic_url(self):
        if self.image:
            return f'{settings.WEBSITE_URL}{self.image.url}'
        else:
            return ''

from django.contrib import admin
from .models import Company, Category, DosageForm, Medicine, UpdatedBy, Customer, SellRecord

# Register your models here.
admin.site.register(Company)
admin.site.register(Category)
admin.site.register(DosageForm)
admin.site.register(Medicine)
admin.site.register(UpdatedBy)
admin.site.register(Customer)
admin.site.register(SellRecord)

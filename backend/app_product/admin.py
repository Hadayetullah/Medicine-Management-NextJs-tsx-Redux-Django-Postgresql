from django.contrib import admin
from .models import Company, Category, DosageForm, Medicine, UpdatedBy

# Register your models here.
admin.site.register(Company)
admin.site.register(Category)
admin.site.register(DosageForm)
admin.site.register(Medicine)
admin.site.register(UpdatedBy)

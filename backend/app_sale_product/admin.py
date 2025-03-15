from django.contrib import admin

from .models import PrescriptionDetail, PrescribedMedicine

# Register your models here.
admin.site.register(PrescriptionDetail)
admin.site.register(PrescribedMedicine)
from django.contrib import admin
from .models import AddMedicine, CreatedBy, UpdatedBy

# Register your models here.
admin.site.register(AddMedicine)
admin.site.register(CreatedBy)
admin.site.register(UpdatedBy)

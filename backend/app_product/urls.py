from django.urls import path
from .views import MedicineView

urlpatterns = [
   path('medicine/', MedicineView.as_view(), name='api_medicine'),
]
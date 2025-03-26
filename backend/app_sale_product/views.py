from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import PrescriptionDetail
from .serializers import PrescriptionDetailSerializer

# Create your views here.
class PrescriptionAPIView(APIView):
    def get(self, request):
        name = request.query_params.get("name")
        age = request.query_params.get("age")

        if name and age:
            prescriptions = PrescriptionDetail.objects.filter(name=name, age=age)
        else:
            prescriptions = PrescriptionDetail.objects.all()

        if not prescriptions.exists():
            return Response({"message": "No prescription found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = PrescriptionDetailSerializer(prescriptions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PrescriptionDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import InstancePrice
from .serializer import CloudPriceSerializer

class CloudPriceListView(APIView):
    def get(self, request):
        cloud_type = request.query_params.get('cloud_type', None)
        location = request.query_params.get('location', None)
        num_cpus = request.query_params.get('num_cpus', None)
        ram_gb = request.query_params.get('ram_gb', None)

        queryset = InstancePrice.objects.all()

        if cloud_type:
            queryset = queryset.filter(cloud_type=cloud_type)
        if location:
            queryset = queryset.filter(location=location)
        if num_cpus:
            queryset = queryset.filter(num_cpus=num_cpus)
        if ram_gb:
            queryset = queryset.filter(ram_gb=ram_gb)

        serializer = CloudPriceSerializer(queryset, many=True)
        return Response(serializer.data)

from rest_framework import serializers
from .models import InstancePrice

class CloudPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstancePrice
        fields = '__all__'

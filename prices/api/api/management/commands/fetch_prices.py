import requests
from django.core.management.base import BaseCommand
from pricing.models import CloudPrice
from datetime import date

class Command(BaseCommand):
    help = 'Fetch AWS price data and store it'

    def handle(self, *args, **kwargs):
        # Example URL for AWS price list
        url = "https://api.example.com/aws-pricing"  # Replace with actual AWS Price API endpoint
        response = requests.get(url)
        data = response.json()  # Assuming the API returns JSON data

        for item in data:
            cloud_type = "aws"
            location = item['location']
            num_cpus = item['num_cpus']
            ram_gb = item['ram_gb']
            price = item['price']

            CloudPrice.objects.create(
                cloud_type=cloud_type,
                location=location,
                num_cpus=num_cpus,
                ram_gb=ram_gb,
                price=price,
                date_fetched=date.today()
            )

        self.stdout.write(self.style.SUCCESS('Successfully fetched and stored price data'))

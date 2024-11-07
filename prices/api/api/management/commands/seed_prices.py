from django.core.management.base import BaseCommand
from api.models import InstancePrice
from decimal import Decimal
import random

class Command(BaseCommand):
    help = 'Seed the database with initial cloud instance prices'

    def handle(self, *args, **kwargs):
        # Clear existing data
        InstancePrice.objects.all().delete()

        # Sample data
        locations = {
            'aws': ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
            'azure': ['eastus', 'westeurope', 'southeastasia', 'westus2'],
            'gcp': ['us-central1', 'europe-west1', 'asia-southeast1', 'us-west1']
        }

        # Generate sample instances
        instances = []
        for cloud, regions in locations.items():
            for location in regions:
                # Generate different instance sizes
                for cpu in [1, 2, 4, 8, 16]:
                    ram = cpu * 4  # Simple RAM ratio
                    # Random price between $20-100 per CPU
                    price = Decimal(random.uniform(20, 100) * cpu).quantize(Decimal('0.01'))

                    instances.append(InstancePrice(
                        cloud_type=cloud,
                        location=location,
                        num_cpu=cpu,
                        ram_gb=ram,
                        price=price
                    ))

        # Bulk create instances
        InstancePrice.objects.bulk_create(instances)

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {len(instances)} instance prices'))

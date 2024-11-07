from django.db import models
from django.core.validators import MinValueValidator

class InstancePrice(models.Model):
    CLOUD_CHOICES = [
        ('aws', 'AWS'),
        ('azure', 'Azure'),
        ('gcp', 'GCP')
    ]

    cloud_type = models.CharField(max_length=10, choices=CLOUD_CHOICES)
    location = models.CharField(max_length=50, db_index=True)
    num_cpu = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    ram_gb = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    fetched_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=['cloud_type', 'location']),
        ]
        verbose_name = 'Instance Price'
        verbose_name_plural = 'Instance Prices'

    def __str__(self):
        return f"{self.get_cloud_type_display()} - {self.location} - {self.num_cpu} CPUs - {self.ram_gb} GB RAM"

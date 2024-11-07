from django.urls import path
from .pricing import CloudPriceListView

urlpatterns = [
    path('api/', CloudPriceListView.as_view(), name='cloud_price_list'),
]

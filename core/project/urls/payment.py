from django.urls import path
from azbankgateways.urls import az_bank_gateways_urls
from project.views import callback_gateway_view

app_name = 'payment'
urlpatterns = [
    path('bankgateways/', az_bank_gateways_urls()),
     path('callback-gateway/', callback_gateway_view)
]
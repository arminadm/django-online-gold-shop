from django.urls import path
from azbankgateways.urls import az_bank_gateways_urls
from project.views.payment import payment, callback_gateway_view


urlpatterns = [
    path('bankgateways/', az_bank_gateways_urls()),
    path('callback-gateway/', callback_gateway_view),
    path('pay/', payment)
]
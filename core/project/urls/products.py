from django.urls import path
from project.views import (
    ProductsIndexView,
    ShopCartDetailView,
    ShopCartView,
    AddressView
)

app_name = 'products'

urlpatterns = [
    path('',ProductsIndexView.as_view(), name='products-index'),
    path('shopcart/<slug:slug>/', ShopCartDetailView.as_view(), name='shopcartdetail'),
    path('address/', AddressView.as_view(), name='address'),
    path('shopcart/', ShopCartView.as_view(), name='shopcart'),
]
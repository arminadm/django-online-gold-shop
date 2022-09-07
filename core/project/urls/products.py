from django.urls import path
from project.views import (
    ProductsIndexView,
    ShopCartDetailView,
    ShopCartView,
    AddressView,
    ProductDetailView,
    AddressDelete
)

app_name = 'products'

urlpatterns = [
    path('',ProductsIndexView.as_view(), name='products-index'),
    path('shopcart/<slug:slug>/', ShopCartDetailView.as_view(), name='shopcartdetail'),
    path('address/', AddressView.as_view(), name='address'),
    path('address/delete/<int:id>/', AddressDelete.as_view(), name='deleteaddress'),
    path('shopcart/', ShopCartView.as_view(), name='shopcart'),
    path('<slug:slug>/', ProductDetailView.as_view()),
]
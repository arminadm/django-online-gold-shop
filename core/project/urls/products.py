from django.urls import path
from project.views import (
    ProductsIndexView,
    ShopCartView
)

app_name = 'products'

urlpatterns = [
    path('',ProductsIndexView.as_view(), name='products-index'),
    path('shopcart/<slug:slug>/', ShopCartView.as_view(), name='shopcart')
]
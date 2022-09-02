from os import stat
from urllib import request
from django.shortcuts import render, redirect
from django.views.generic import View
from project.models.products import Products, ShopCart, Photo
from django.shortcuts import get_object_or_404

# Create your views here.
class ProductsIndexView(View):
    def get(self, request, *args, **kwargs):
        products = Products.objects.all()
        shopcart = ShopCart.objects.filter(user=request.user)
        total_price = 0
        for item in shopcart:
            total_price += item.product.price
        context = {
            'products': products,
            'shopcart': shopcart,
            'price': total_price
        }
        
        print(context)
        return render(request, 'category.html', context)

class ShopCartView(View):
    def get(self, request, slug, *args, **kwargs):
        product = get_object_or_404(Products, slug=slug)
        product.popularity += 1
        product.save()
        ShopCart.objects.create(user=request.user, product=product, status=True)
        return redirect('/products/')
    def post(self, request, *args, **kwargs):
        pass
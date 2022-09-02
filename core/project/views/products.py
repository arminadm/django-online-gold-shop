from multiprocessing import context
from django.shortcuts import render, redirect
from django.views.generic import View
from project.models.products import Products, ShopCart
from project.models.registration import Address, Profile
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
        return render(request, 'category.html', context)

class ShopCartDetailView(View):
    def get(self, request, slug, *args, **kwargs):
        product = get_object_or_404(Products, slug=slug)
        product.popularity += 1
        product.save()
        ShopCart.objects.create(user=request.user, product=product, status=True)
        return redirect('/products/')
    def post(self, request, *args, **kwargs):
        pass

class ShopCartView(View):
    def get(self, request, *args, **kwargs):
        shopcart = ShopCart.objects.filter(user=request.user)
        profile = get_object_or_404(Profile, user = request.user)
        address = Address.objects.filter(user = profile)
        total_price = 0
        for item in shopcart:
            total_price += item.product.price
        context = {
            'shopcart': shopcart,
            'price': total_price,
            'address': address
        }
        return render(request, 'panel/order-bag.html', context)

class AddressView(View):
    def get(self, request, *args, **kwargs):
        profile = get_object_or_404(Profile, user = request.user)
        address = Address.objects.filter(user = profile)
        context = {
            'address': address
        }
        print(context)
        return render(request, 'panel/address.html', context)
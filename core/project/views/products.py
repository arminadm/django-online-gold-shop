from django.shortcuts import get_object_or_404, redirect, render
from django.views.generic import View
from project.models.products import Products, ShopCart
from project.models.registration import Address, Profile
from django.http import Http404

# Create your views here.
class ProductsIndexView(View):
    def get(self, request, *args, **kwargs):
        products = Products.objects.all()
        shopcart = ShopCart.objects.filter(user=request.user)
        total_price = 0
        shopcart_count = 0        
        for item in shopcart:
            total_price += item.product.price
            shopcart_count += 1
        context = {
            'products': products,
            'shopcart': shopcart,
            'price': total_price
        }
        api_response = {
        "18ayar": {
            "value": "1276600",
            "change": 9000,
            "timestamp": 1662276596,
            "date": "1401-06-13 11:59:56"
            }
        }
        context['shopcart_count'] = shopcart_count
        context['gold_price'] = api_response['18ayar']['value']
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

class ProductDetailView(View):
    def get(self, request, slug, *args, **kwargs):
        products = get_object_or_404(Products, slug=slug)
        shopcart = ShopCart.objects.filter(user=request.user)
        api_response = {
        "18ayar": {
            "value": "1276600",
            "change": 9000,
            "timestamp": 1662276596,
            "date": "1401-06-13 11:59:56"
            }
        }
        total_price = 0
        shopcart_count = 0
        for item in shopcart:
            total_price += item.product.price
            shopcart_count += 1
        context = {
            'product': products,
            'shopcart': shopcart,
            'price': total_price,
            'shopcart_count': shopcart_count,
            'gold_price': api_response['18ayar']['value']
        }
        return render(request, 'product-detail.html', context)
class ShopCartView(View):
    def get(self, request, *args, **kwargs):
        if self.request.user.is_authenticated:
            shopcart = ShopCart.objects.filter(user=request.user)
            api_response = {
            "18ayar": {
                "value": "1276600",
                "change": 9000,
                "timestamp": 1662276596,
                "date": "1401-06-13 11:59:56"
                }
            }
            total_price = 0
            shopcart_count = 0
            for item in shopcart:
                total_price += item.product.price
                shopcart_count += 1
            context = {
                'shopcart': shopcart,
                'price': total_price,
                'shopcart_count': shopcart_count,
                'gold_price': api_response['18ayar']['value'],
                'user': self.request.user,
                'profile': get_object_or_404(Profile, user = self.request.user),
                'address': Address.objects.filter(user = get_object_or_404(Profile, user = self.request.user))
            }
        return render(request, 'panel/order-bag.html', context)

class AddressView(View):
    def get(self, request, *args, **kwargs):
        if self.request.user.is_authenticated:
            shopcart = ShopCart.objects.filter(user=request.user)
            api_response = {
            "18ayar": {
                "value": "1276600",
                "change": 9000,
                "timestamp": 1662276596,
                "date": "1401-06-13 11:59:56"
                }
            }
            total_price = 0
            shopcart_count = 0
            for item in shopcart:
                total_price += item.product.price
                shopcart_count += 1
            
            context = {
                'shopcart': shopcart,
                'price': total_price,
                'shopcart_count': shopcart_count,
                'gold_price': api_response['18ayar']['value'],
                'user': self.request.user,
                'profile': get_object_or_404(Profile, user = self.request.user),
                'address': Address.objects.filter(user = get_object_or_404(Profile, user = self.request.user))
            }   
        return render(request, 'panel/address.html', context)

    def post(self, request, *args, **kwargs):
        Address.objects.create(user = get_object_or_404(Profile, user = request.user), state = request.POST['state'], city = request.POST['city'], zip_code = request.POST['zip_code'], detail = request.POST['address'], )
        return redirect('/products/address/')

class AddressDelete(View):
    def post(self, request, id, *args, **kwargs):
        try:
            Address.objects.get(id = id).delete()
        except Address.DoesNotExist:
            raise Http404('Address DoesNotExist')
        return redirect('/products/address/')

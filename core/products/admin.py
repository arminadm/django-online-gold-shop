from django.contrib import admin
from products.models import Category, Products, Photo

# Register your models here.
class PhotoAdmin(admin.StackedInline):
    model = Photo
admin.site.register(Photo)

class ProductsAdmin(admin.ModelAdmin):
    inlines = [PhotoAdmin]
    class Meta:
        model = Products
admin.site.register(Products, ProductsAdmin)
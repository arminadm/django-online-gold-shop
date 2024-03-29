from django.contrib import admin
from project.models import Category, Products, Favorite, ShopCart

# Register your models here.
# class PhotoAdmin(admin.StackedInline):
#     model = Photo
# admin.site.register(Photo)

class ProductsAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_date'
    empty_value_display = '-empty-'
    list_display = ['name', 'slug', 'price', 'quantity', 'status', 'created_date', 'updated_date']
    list_filter = ['status']
    search_fields = ['name', 'slug', 'description', 'category'] 
    # inlines = [PhotoAdmin]
    class Meta:
        model = Products
admin.site.register(Products, ProductsAdmin)

class CategoryAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_date'
    list_display = ['name', 'created_date', 'updated_date']
    search_fields = ['name']
admin.site.register(Category, CategoryAdmin)

class ShopCartAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_date'
    list_display = ['user', 'product', 'status', 'updated_date']
    list_filter= ['status']
    search_fields = ['user', 'product']
admin.site.register(ShopCart, ShopCartAdmin)

class FavoriteAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_date'
    list_display = ['user', 'product', 'updated_date']
    search_fields = ['user', 'product']
admin.site.register(Favorite, FavoriteAdmin)
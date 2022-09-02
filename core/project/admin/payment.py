from django.contrib import admin
from project.models.payment import Order

class OrderAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_date'
    empty_value_display = '-empty-'
    list_display = ['user', 'product', 'transaction', 'created_date', 'updated_date']
    search_fields = ['user']
admin.site.register(Order, OrderAdmin)
from django.db import models
from project.models.products import Products
from project.models.registration import User, Address
from azbankgateways.models.banks import Bank

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    product = models.TextField(blank=False, null=False, unique=False)
    transaction = models.ForeignKey(Bank, on_delete=models.DO_NOTHING)
    address = models.ForeignKey(Address, on_delete=models.DO_NOTHING)
    code = models.CharField(max_length=255)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
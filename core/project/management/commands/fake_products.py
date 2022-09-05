from django.core.management.base import BaseCommand
from faker import Faker
from random import choice, randint
from datetime import datetime
from project.models.products import Category, Products

class Command(BaseCommand):
    help = 'generating some Org, Client and employee profiles, 3 assignments, 3 skill set and 3 servicetypes'

    def __init__(self, *args, **kwargs):
        super(Command,self).__init__(*args, **kwargs)
        self.faker = Faker()

    def handle(self, *args, **options):
        # creating 10 categories
        categories = []
        for i in range(10):
            category = Category.objects.create(name=f"Category {i}")
            print(f"successfully created {category.name}")
            categories.append(category)
        
        # creating 100 products
        for i in range(100):
            product = Products.objects.create(
                name = f"Product {i}",
                slug = f"Product_{i}",
                description = self.faker.paragraph(nb_sentences=5),
                price = randint(10000000,1000000000000),
                quantity = randint(1, 30),
                status = choice([False, True]),
            )
            product.category.add(categories[randint(0,9)])
            print(f"successfully created {product.name}")
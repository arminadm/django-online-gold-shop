from django.db import models
from PIL import Image
from .registration import User
from django.template.defaultfilters import slugify

# Create your models here.
class Products(models.Model):
    name = models.CharField(max_length=400, blank=False, null=False)
    slug = models.SlugField(max_length=400,blank=True, null=True, unique=True)
    description = models.TextField()
    price = models.IntegerField(null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True)
    status = models.BooleanField(default=False)
    category = models.ManyToManyField("Category")
    sale_count = models.IntegerField(default=0)
    score = models.FloatField(default=5.0)
    popularity = models.IntegerField(default=0)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)

    class Meta: 
        verbose_name = "محصول"
        verbose_name_plural = "محصولات"

    def __str__(self):
        return f"{self.id} - {self.name} - {self.price} - {self.status}"

class Category(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta: 
        verbose_name = "دسته بندی"
        verbose_name_plural = "دسته بندی ها"

    def __str__(self):
        return f"{self.id} - {self.name}"

class Photo(models.Model):
    products = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='photos')
    photo = models.ImageField(upload_to ='project/static/photos/')

    class Meta: 
        verbose_name = "عکس"
        verbose_name_plural = "عکس ها"

    # resizing the image, you can change parameters like size and quality.
    def save(self, *args, **kwargs):
       super(Photo, self).save(*args, **kwargs)
       img = Image.open(self.photo.path)
       if img.height > 1125 or img.width > 1125:
           img.thumbnail((1125,1125))
       img.save(self.photo.path,quality=70,optimize=True)

# all favorites are here with one query we can find users favorites
class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True) 

class ShopCart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    product = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='product')
    status = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True) 
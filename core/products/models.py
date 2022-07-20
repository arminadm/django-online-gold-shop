from django.db import models
from PIL import Image

# Create your models here.
class Products(models.Model):
    name = models.CharField(max_length=400, blank=False, null=False)
    slug = models.SlugField(max_length=400, blank=False, null=False)
    description = models.TextField()
    price = models.IntegerField(null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True)
    status = models.BooleanField(default=False)
    category = models.ManyToManyField("Category")
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

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
    photo = models.ImageField(upload_to ='photos/')

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

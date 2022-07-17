from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.models import User

# Create your models here.
class CustomUserManager(BaseUserManager):
    """
    this class will make normal and superuser users
    """
    def create_user(self, phone, password, **extra_fields):
        if not phone:
            raise ValueError('You must provide a phone number')
        user = self.model(phone=phone, **extra_fields)
        User.set_unusable_password(self)
        user.save()
        return user
    
    def create_superuser(self, phone, password, **extra_fields):    
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('is_superuser must be True')
        if extra_fields.get('is_staff') is not True:
            raise ValueError('is_staff must be True')
        if extra_fields.get('is_active') is not True:
            raise ValueError('is_active must be True')

        return self.create_user(phone, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    """
    User base models
    note: we dont need to add password model field, AbstractBaseUser already did that for us
    password is going to be generated and set each time user logs in or sign up for the first time
    """
    phone = models.CharField(max_length=15, unique=True, blank=False, null=False)
    is_superuser = models.BooleanField(default=False, null=False, blank=False) # have access to control everything
    is_staff = models.BooleanField(default=False, null=False, blank=False) # have access to log into admin panel
    is_active = models.BooleanField(default=False, null=False, blank=False) # have access to log into site
    is_verified = models.BooleanField(default=False, null=False, blank=False) # after sms verification will be set to True
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "phone"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.phone
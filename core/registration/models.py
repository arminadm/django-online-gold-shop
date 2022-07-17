from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Create your models here.
class CustomUserManager(BaseUserManager):
    """
    this class will make normal and superuser users
    """

    def create_user(self, phone, password, **extra_fields):
        """
        create user with '' password
        """
        if not phone:
            raise ValueError('You must provide a phone number')
        user = self.model(phone=phone, **extra_fields)

        # if we are creating superuser we need to provide a password for admin panel
        if extra_fields.get('is_superuser') is True:   
            user.set_password(password)

        # if we are creating normal user we don't need to provide a password
        else:
            user.set_unusable_password()

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
    sms_verification = models.CharField(max_length=6) # change each time that user logs in or signup for first time
    sms_verification_expire_time = models.DateTimeField(blank=True, null=True) # needed to check how much time has passed since user got new sms_verification code
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
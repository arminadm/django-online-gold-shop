from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError

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
    # change each time that user logs in or signup for first time
    sms_verification = models.CharField(max_length=6)

    # needed to check how much time has passed since user got new sms_verification code
    sms_verification_expire_time = models.DateTimeField(blank=True, null=True) 
    
    # have access to control everything
    is_superuser = models.BooleanField(default=False, null=False, blank=False)
    
    # have access to log into admin panel 
    is_staff = models.BooleanField(default=False, null=False, blank=False) 
    
    # have access to log into site
    is_active = models.BooleanField(default=False, null=False, blank=False) 
    
    # after sms verification will be set to True
    is_verified = models.BooleanField(default=False, null=False, blank=False) 
    
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "phone"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    class Meta: 
        verbose_name = "کاربر"
        verbose_name_plural = "کاربران"

    def __str__(self):
        return f"{self.id} - {self.phone}"

'''
here in this function we will check if national code is a valid one
'''
def validate_national_code(value):
    value = str(value)

    # code must be between 8 and 10 char
    if len(value) < 8 and len(value) > 10:
        raise ValidationError('کد ملی صحیح نمیباشد')
    
    # if its not 10 char we add 0 before it
    if len(value) < 10:
        value = '0'*(10 - len(value)) + value

    value = list(value)
    # here is the first step of algorithm
    total = 0
    for i in range(len(value)):
        if i == len(value)-1:
            continue
        value[i] = int(value[i])
        total += value[i] * (10 - i)
    # second step of algorithm
    reminder = total % 11

    # final check of algorithm that has two part
    if reminder < 2:
        if reminder != int(value[-1]):
            raise ValidationError('کد ملی صحیح نمیباشد')
    else:
        reminder
        if 11 - reminder != int(value[-1]):
            raise ValidationError('کد ملی صحیح نمیباشد')

def validate_zip_code(value):
    value = str(value)
    if len(value) != 10:
        raise ValidationError('کد پستی صحیح نمیباشد')


class Profile(models.Model):
    # we can have access to phone number via user foreign key
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profileUser')
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    national_code = models.CharField(max_length=10,unique=True, blank=True, null=True, validators=[validate_national_code])
    birth_date = models.DateField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta: 
        verbose_name = "پروفایل کاربر"
        verbose_name_plural = "پروفایل کاربران"

    def __str__(self):
        return f"{self.user.id} - {self.user.phone} - {self.first_name} - {self.last_name}"

class Address(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.DO_NOTHING, related_name='profileAdress')
    state = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    zip_code = models.IntegerField(validators=[validate_zip_code])
    # address for this address
    detail = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True) 
    

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

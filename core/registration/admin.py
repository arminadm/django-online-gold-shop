from django.contrib import admin
from registration.models import User, Profile

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_date'
    empty_value_display = '-empty-'
    list_display = ['phone', 'is_superuser', 'is_staff', 'is_active', 'is_verified', 'created_date', 'updated_date']
    list_filter = ['is_superuser', 'is_staff', 'is_active', 'is_verified']
    search_fields = ['phone']
admin.site.register(User, UserAdmin)

class ProfileAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_date'
    empty_value_display = '-empty-'
    list_display = ['user', 'email', 'first_name', 'last_name', 'national_code', 'birth_date', 'created_date', 'updated_date']
    list_filter = ['user__is_superuser', 'user__is_staff', 'user__is_active', 'user__is_verified']
    search_fields = ['user', 'email', 'first_name', 'last_name', 'national_code']
admin.site.register(Profile, ProfileAdmin)
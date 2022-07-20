from django.contrib import admin
from registration.models import User, Profile

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ['created_date']
admin.site.register(User, UserAdmin)
admin.site.register(Profile)
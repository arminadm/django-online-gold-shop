from django import forms
from project.models import User, Profile

class SignUpForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['phone', 'password']

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'email', 'national_code', 'birth_date']
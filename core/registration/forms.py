from django import forms
from registration.models import User

class SignUpForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['phone', 'password']
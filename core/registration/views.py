from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import View
from registration.forms import SignUpForm
from random import randint
from registration.models import User

# Create your views here.
class LoginClassView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'login.html')

class SignUpClassView(View):
    def get(self, request, *args, **kwargs):
        form = SignUpForm()
        context = {
            "form": form
        }
        return render(request, 'sign-up.html', context)
    
    def post(self, request, *args, **kwargs):
        # form = SignUpForm(request.POST)
        # if form.is_valid():
        #     sms_code = randint(100000,999999)
        #     print(sms_code)
        #     phone = form.cleaned_data['phone']
        #     print(phone)
        #     default_password = ''
        #     if kwargs.get('password'):
        #         default_password = kwargs.get('password')
        #     user = User.objects.create_user(phone=phone, password=default_password)
        #     print(form.cleaned_data['phone'])
        #     print(form.cleaned_data['password'])
            return HttpResponse('<h1>done</h1>')

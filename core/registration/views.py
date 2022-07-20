from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import View
from registration.forms import SignUpForm, ProfileForm
from registration.models import Profile, User
from django.contrib.auth import login

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
        form = SignUpForm(request.POST)
        if form.is_valid():
            # normal users does's have password so we use default password (which is '') for them
            # but if we want to create superuser we need to provide a password, this piece of code
            # will handle this for us
            default_password = ''
            phone = form.cleaned_data['phone']
            if kwargs.get('password'):
                default_password = kwargs.get('password')
            user = User.objects.create_user(phone=phone, password=default_password, is_active=True)
            
            # log user in and redirect it to user profile page to complete their information
            login(request, user)
            return HttpResponse('<h1>done</h1>')

class ProfileClassView(View):
    def get(self, request, *args, **kwargs):
        form = ProfileForm
        context = {
            'form': form
        }
        return render(request, 'profile.html', context=context)

    def post(self, request, *args, **kwargs):
        form = ProfileForm(request.POST)
        if form.is_valid():
            profile = Profile.objects.get(user__phone=request.user.phone)
            profile.first_name = form.cleaned_data.get('first_name')
            profile.last_name = form.cleaned_data.get('last_name')
            profile.email = form.cleaned_data.get('email')
            profile.national_code = form.cleaned_data.get('national_code')
            profile.birth_date = form.cleaned_data.get('birth_date')
            profile.save()
            # TODO: redirect to profile
            return HttpResponse('<h1>Form submit</h1>')
        else:
            # TODO: redirect to change-profile with error message
            return HttpResponse('<h1>Form didnt submit</h1>')

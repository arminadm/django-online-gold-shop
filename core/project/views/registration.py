import profile
from random import randint
from django.http import Http404, HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.views.generic import View, TemplateView
from project.forms import ProfileForm, SignUpForm
from project.models import Profile, User
from django.contrib.auth import login, logout, authenticate
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404

# Create your views here.

class IndexClassView(TemplateView):
    template_name= 'index.html'

class LoginClassView(View):
    def get(self, request, *args, **kwargs):
        # user must be logged out to have access to this page
        if request.user.is_authenticated:
            return redirect('/registration/profile/')
        return render(request, 'auth/login.html')
    
    def post(self, request, *args, **kwargs):
        if 'code1' in request.POST:
            code = str(request.POST['code1']) + str(request.POST['code2']) + str(request.POST['code3']) + str(request.POST['code4'])
            phone = request.session['phone']
            try:
                user = User.objects.get(phone=phone)
            except User.DoesNotExist:
                raise Http404('User not found', status=404)
            user = authenticate(username=phone, password=code)
            if user is not None:
                login(request, user)
            else:
                raise ValidationError('کد وارد شده صحیح نمیباشد')
            return redirect('/registration/profile/')
        else:
            phone = request.POST.get('phone')

            """handle exceptions"""
            if phone is None:
                raise Http404('Phone not found', status=404)
            try:
                user = User.objects.get(phone=phone)
            except User.DoesNotExist:
                raise Http404('User not found', status=404)

            code = randint(1000,9999)
            user.set_password(str(1234))
            user.save()
            print(user.phone, code)
            request.session['phone'] = phone
            return render(request, 'auth/login2.html')

class ProfileClassView(View):
    def get(self, request, *args, **kwargs):
        user = request.user
        profile = get_object_or_404(Profile, user=user)
        context = {
            'phone': user.phone,
            'fname': profile.first_name,
            'lname': profile.last_name,
            'nationalCode': profile.national_code,
            'date': profile.birth_date,
            'email': profile.email
        }
        return render(request, 'panel/user-Information.html', context)

    def post(self, request, *args, **kwargs):
        try:
            profile = Profile.objects.get(user__phone=request.user.phone)
        except Profile.DoesNotExist:
            raise Http404('Phone not found', status=404)

        profile.first_name = request.POST['fname']
        profile.last_name = request.POST['lname']
        profile.email = request.POST['email']
        profile.national_code = request.POST['nationalCode']
        profile.birth_date = request.POST['date']
        profile.is_completed = True
        profile.save()
        # TODO: redirect to profile
        return redirect('/registration/profile/')

class LogoutClassView(View):
    def get(self, request, *args, **kwargs):
        # user must be logged in to have access to this page
        if not request.user.is_authenticated:
            # TODO: redirect to bad request page
            return HttpResponse('Unauthorized', status=401)
        logout(request)
        return HttpResponse('successfully logged out')
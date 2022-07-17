from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import View

# Create your views here.
class LoginClassView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'login.html')
from django.urls import path
from registration.views import LoginClassView

app_name = 'registration'

urlpatterns = [
    path('login/', LoginClassView.as_view(), name='login'),
]
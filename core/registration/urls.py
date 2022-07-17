from django.urls import path
from registration.views import LoginClassView, SignUpClassView

app_name = 'registration'

urlpatterns = [
    path('login/', LoginClassView.as_view(), name='login'),
    path('sign-up/', SignUpClassView.as_view(), name='sing-up'),
]
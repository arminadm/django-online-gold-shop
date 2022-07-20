from django.urls import path, include
from registration.views import LoginClassView, SignUpClassView, ProfileClassView, LogoutClassView

app_name = 'registration'

urlpatterns = [
    path('login/', LoginClassView.as_view(), name='login'),
    path('sign-up/', SignUpClassView.as_view(), name='sing-up'),
    path('', include('registration.api.urls')),
    path('profile-edit/', ProfileClassView.as_view(), name='profile-edit'),
    path('logout/', LogoutClassView.as_view(), name='logout'),
]
from django.urls import path, include
from project.views import LoginClassView, SignUpClassView, ProfileClassView, LogoutClassView

app_name = 'registration'

urlpatterns = [
    path('', include('project.api.v1.urls')),
    path('login/', LoginClassView.as_view(), name='login'),
    path('sign-up/', SignUpClassView.as_view(), name='sing-up'),
    path('profile-edit/', ProfileClassView.as_view(), name='profile-edit'),
    path('logout/', LogoutClassView.as_view(), name='logout'),
]
from django.urls import path
from project.views import LoginClassView, ProfileClassView, LogoutClassView, IndexClassView

app_name = 'registration'

urlpatterns = [
    # path('', IndexClassView.as_view(), name='index'),
    path('login/', LoginClassView.as_view(), name='login'),
    path('profile/', ProfileClassView.as_view(), name='profile-edit'),
    path('logout/', LogoutClassView.as_view(), name='logout'),
]
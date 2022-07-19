from asyncio import SendfileNotAvailableError
from django.urls import path
from registration.api.views import SendSMSVerification

urlpatterns = [
    path('send_sms_verification/', SendSMSVerification.as_view(), name='send_sms_verification')
]
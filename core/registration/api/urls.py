from asyncio import SendfileNotAvailableError
from django.urls import path
from registration.api.views import SendSMSVerification, ValidateSMSCode

urlpatterns = [
    path('send_sms_verification/', SendSMSVerification.as_view(), name='send_sms_verification'),
    path('validate_sms_code/', ValidateSMSCode.as_view(), name='validate_sms_code')
]
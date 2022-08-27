from asyncio import SendfileNotAvailableError
from django.urls import path
from project.api.v1.views import SendSignupSMSVerification, SendLoginSMSVerification, ValidateSMSCode

urlpatterns = [
    path('send_signup_sms_verification/', SendSignupSMSVerification.as_view(), name='send_signup_sms_verification'),
    path('send_login_sms_verification/', SendLoginSMSVerification.as_view(), name='send_login_sms_verification'),
    path('validate_sms_code/', ValidateSMSCode.as_view(), name='validate_sms_code'),
]
from django.views.generic import View
from django.http import JsonResponse
from registration.models import User
from random import randint
from datetime import datetime

class SendSMSVerification(View):
    def post(self, request, *args, **kwargs):
        phone = request.POST.get('phone')
        if phone:
            # check if phone is already registered
            if User.objects.filter(phone=phone).exists():
                return JsonResponse({"error": "phone already registered"})

            sms_code = randint(100000,999999)
            
            # TODO: send sms
            print(f"sms_code: {sms_code}")
            
            # We need to store sms_code and it's submit time in registration/login via post method
            sms_code_submit_time = datetime.now()
            request.session['sms_code'] = sms_code
            request.session['sms_code_submit_time'] = f"{sms_code_submit_time}"
            
            return JsonResponse({"success": True})

        else: # phone does not exists
            return JsonResponse({"error": "Phone is required."})
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
            sms_code_generated_time = str(datetime.now())
            request.session['phone'] = phone
            request.session['sms_code'] = sms_code
            request.session['sms_code_generated_time'] = sms_code_generated_time
            
            return JsonResponse({"success": True})

        else: # phone does not exists
            return JsonResponse({"error": "Phone is required."})


class ValidateSMSCode(View):
    def post(self, request, *args, **kwargs):
    
        # user_phone is the phone number that user entered after we send sms code
        # checking this variable is required so user can't change their phone number
        # after he/she got sms code for pervious phone number
        user_phone = request.POST.get('phone')
        
        # user_code is the code that user entered
        user_code = request.POST.get('code')
        
        # main variables are the ones that we saved after generating sms code
        main_phone = request.session['phone']
        main_code = request.session['sms_code']
        main_code_generated_time = request.session['sms_code_generated_time']
        
        # convert str generated time to datetime object
        main_code_generated_time = datetime.strptime(main_code_generated_time, '%Y-%m-%d %H:%M:%S.%f')

        """handling error and exceptions""" 
        if not user_phone == main_phone:
            # user can't change their phone number after they got sms code
            return JsonResponse({'error': 'phone number changed'}, status=400)
        
        if not str(user_code) == str(main_code):
            # code that user entered must be the same as the code we send to him/her via sms
            return JsonResponse({'error': 'verification code does not matched'}, status=400)

        if ((datetime.now() - main_code_generated_time).seconds) > 120:
            # sms code will get expired after 2 minutes
            return JsonResponse({'error': 'code expired'}, status=400)

        # determine the request.sessions
        del request.session['phone']
        del request.session['sms_code']
        del request.session['sms_code_generated_time']

        # validation completed and there is no error
        return JsonResponse({'success': True}, status=200)
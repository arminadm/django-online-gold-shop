import logging
from django.http import HttpResponse, Http404
from azbankgateways import bankfactories, models as bank_models, default_settings as settings
from project.models.registration import Profile
from project.models.products import ShopCart
from project.models.registration import Address
from project.models.payment import Order
from azbankgateways.exceptions import AZBankGatewaysException
from azbankgateways.models import Bank
from django.shortcuts import get_object_or_404


def payment(request):
    shopcart = ShopCart.objects.filter(user=request.user)
    amount = 0
    for item in shopcart:
        amount += item.product.price

    factory = bankfactories.BankFactory()
    try:
        # bank = factory.auto_create()  or factory.create(bank_models.BankType.BMI) or set identifier
        bank = factory.create(bank_models.BankType.ZARINPAL)
        bank.set_request(request)
        bank.set_amount(amount)
        # یو آر ال بازگشت به نرم افزار برای ادامه فرآیند
        bank.set_client_callback_url('/payment/callback-gateway/')

        items = ''
        for item in shopcart:
            items = items + '\n--item: ' + str(item.product.name)

        request.session['items'] = items

        # در صورت تمایل اتصال این رکورد به رکورد فاکتور یا هر چیزی که بعدا بتوانید ارتباط بین محصول یا خدمات را با این
        # پرداخت برقرار کنید. 
        bank_record = bank.ready()
        
        # هدایت کاربر به درگاه بانک
        return bank.redirect_gateway()
    except AZBankGatewaysException as e:
        logging.critical(e)
        # TODO: redirect to failed page.
        raise e    
    
def callback_gateway_view(request):
    tracking_code = request.GET.get(settings.TRACKING_CODE_QUERY_PARAM, None)
    if not tracking_code:
        raise Http404

    try:
        bank_record = bank_models.Bank.objects.get(tracking_code=tracking_code)
    except bank_models.Bank.DoesNotExist:
        raise Http404

    # در این قسمت باید از طریق داده هایی که در بانک رکورد وجود دارد، رکورد متناظر یا هر اقدام مقتضی دیگر را انجام دهیم
    if bank_record.is_success:
        # پرداخت با موفقیت انجام پذیرفته است و بانک تایید کرده است.
        # می توانید کاربر را به صفحه نتیجه هدایت کنید یا نتیجه را نمایش دهید.
        pk = str(bank_record).split('-')[0]
        transactionCode = str(bank_record).split('-')[1]
        this_transaction = get_object_or_404(Bank, pk=pk)
        Order.objects.create(user = request.user, product=request.session['items'],address = Address.objects.filter(user = get_object_or_404(Profile, user = request.user)).first() ,transaction=this_transaction, code = transactionCode)
        return HttpResponse(f"پرداخت با موفقیت انجام شد.<br>کد پیگری شما: {transactionCode}")

    # پرداخت موفق نبوده است. اگر پول کم شده است ظرف مدت ۴۸ ساعت پول به حساب شما بازخواهد گشت.
    return HttpResponse("پرداخت با شکست مواجه شده است. اگر پول کم شده است ظرف مدت ۴۸ ساعت پول به حساب شما بازخواهد گشت.")
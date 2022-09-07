import requests

url = 'http://api.navasan.tech/latest/?api_key=freeF8ECZhloSU5qk0eFnioqy30enQ1l&item=18ayar'
# myobj = {'somekey': 'somevalue'}

# x = requests.post(url)

# print(x.text)
api_response = {
    "18ayar": {
        "value": "1276600",
        "change": 9000,
        "timestamp": 1662276596,
        "date": "1401-06-13 11:59:56"
        }
    }

print(api_response['18ayar']['value'])
import json
import requests

BASE_URL = 'http://localhost:5000'

user = {
  'name': '여준호',
  'email': 'hanaro0704@gmail.com',
  'password': 'iloveblockchain',
  'profileURL': 'https://avatars3.githubusercontent.com/u/32605822?s=460&u=9fe2838306fda39fbeb45c0ef763b7304a2faa04&v=4',
  'isPublisher': True,
  'description': '안녕하세요.',
  'klaytnAddress': '0x4255b46f7481d420f510dea6cd5cd5de59c5b2db',
}

book = {
  'title': '일론 머스크',
  'description': '일론 머스크, 그는 누구인가?',
  'thumbnailURL': 'https://images.unsplash.com/photo-1551946650-60a22105bcb0?auto=format&fit=crop&w=1600&q=80',
}

def api(path):
  return BASE_URL + path

def get_json(request_object):
  value = json.loads(request_object.text)
  print(value)
  return value

get_json(
  requests.get(api('/'))
)

login_response = get_json(
  requests.post(api('/auth/login'), json=user)
)
token = login_response['accessToken']

get_json(
  requests.post(api('/auth/join'), json=user)
)

def headers():
  return {
    'Authorization': 'Bearer {}'.format(token)
  }

get_json(
  requests.get(api('/private'), headers=headers())
)

# get_json(
#   requests.post(api('/book/register'),
#     headers=headers(),
#     json=book,
#   )
# )

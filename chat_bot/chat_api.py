import json

import requests


class ChatApi(object):
    def __init__(self):
        self.url = 'http://api.qingyunke.com/api.php'
        self.app_id = 0

    def chat(self, msg):
        params = {
            'appid': 0,
            'key': 'free',
            'msg': msg
        }
        rep = requests.get(self.url, params=params)
        try:
            result = json.loads(rep.content)
            answer = result['content']
            print(answer)
            return answer
        except Exception as e:
            print("call api error: %e" % e)
            return u'嘤嘤嘤'

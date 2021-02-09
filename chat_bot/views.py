from django.shortcuts import render

# Create your views here.
from chat_bot.chat_api import ChatApi
from chat_bot.utils import render_json
from common.mymako import render_mako_context


def test(request):
    return render_json({"result": True, "msg": "test"})


def index(request):
    return render_mako_context(request, '/chat.html')


def chat(request):
    question = request.GET.get('question')
    if not question:
        return {"result": False, "msg": u"请输入问题"}
    chat_api = ChatApi()
    res = chat_api.chat(question)
    return render_json({"result": True, "msg": res})

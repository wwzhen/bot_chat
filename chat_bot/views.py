# Create your views here.
from django.contrib.auth import authenticate, logout, login
from django.contrib.auth.models import User

from chat_bot.chat_api import ChatApi
from chat_bot.models import ChatLog
from chat_bot.utils import render_json
from common.mymako import render_mako_context


def test(request):
    return render_json({"result": True, "msg": "test"})


def index(request):
    if not request.user.is_authenticated:
        return render_mako_context(request, '/login.html')
    return render_mako_context(request, '/chat.html')


def chat(request):
    question = request.GET.get('question', '')
    bot_name = request.GET.get('bot_name', '')
    if not question:
        return render_json({"result": False, "msg": u"喵喵喵？"})
    ChatLog.objects.create(user_id=request.user.id, bot_name=bot_name, content=question, type='S')
    chat_api = ChatApi()
    res = chat_api.chat(question)
    if res:
        ChatLog.objects.create(user_id=request.user.id, bot_name=bot_name, content=res, type='R')
    return render_json({"result": True, "msg": res})


def user_login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return render_json({"result": True, "msg": u"登录成功"})
    else:
        return render_json({"result": False, "msg": u"登录失败"})


def register(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    User.objects.create(username=username, password=password)
    return render_json({"result": True, "msg": u"创建用户成功"})


def user_logout(request):
    logout(request)
    logout(request)
    return render_json({"result": True, "msg": u"成功登出"})


def chat_history(request):
    if not request.user.is_authenticated:
        return render_json({"result": False, "msg": u"请先登录"})
    else:
        bot_name = request.GET.get('bot_name', '')
        name = request.user.username
        user_id = request.user.id
        chat_model_list = ChatLog.objects.filter(user_id=user_id, bot_name=bot_name, delflag=False).all().order_by(
            'create_time')
        result = list(map(lambda x: x.to_dict(), chat_model_list))
        return render_json({"result": True, "data": result})

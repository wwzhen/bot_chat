# -*- coding:utf-8 -*-
from mako import runtime, filters, cache
UNDEFINED = runtime.UNDEFINED
STOP_RENDERING = runtime.STOP_RENDERING
__M_dict_builtin = dict
__M_locals_builtin = locals
_magic_number = 10
_modified_time = 1612946595.598758
_enable_loop = True
_template_filename = '/Users/zonst/code/bot_chat/templates/login.html'
_template_uri = '/login.html'
_source_encoding = 'utf-8'
_exports = []


def render_body(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        __M_locals = __M_dict_builtin(pageargs=pageargs)
        __M_writer = context.writer()
        __M_writer('<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>登录</title>\n    <link rel="stylesheet" href="/static/css/login.css"/>\n    <link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css">\n</head>\n<body onkeydown="pressLogin()">\n<div id="login-box">\n    <h1>Login</h1>\n    <div class="form">\n        <div class="item">\n            <i class="fa fa-github-alt" style="font-size:24px"></i>\n            <input type="text" id="name" placeholder="Username" value="admin">\n        </div>\n        <div class="item">\n            <i class="fa fa-search" style="font-size:24px"></i>\n            <input type="password" id="password" placeholder="Password" value="aaaaaa">\n        </div>\n    </div>\n    <button onclick="login()">Login</button>\n</div>\n\n</body>\n<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>\n<script type="text/javascript">\n    function login() {\n        let name = $("#name").val().trim()\n        let password = $("#password").val().trim()\n        if (name && password) {\n            $.ajax({\n                url: \'api/login/\',\n                type: \'POST\',\n                data: {\n                    "username": name,\n                    "password": password\n                },\n                success: function (res) {\n                    if (res.result) {\n                        document.location.reload()\n                    }\n                }\n            })\n        }\n    }\n\n    function pressLogin() {\n        if (event.keyCode === 13) {\n            login()\n        }\n    }\n</script>\n</html>')
        return ''
    finally:
        context.caller_stack._pop_frame()


"""
__M_BEGIN_METADATA
{"filename": "/Users/zonst/code/bot_chat/templates/login.html", "uri": "/login.html", "source_encoding": "utf-8", "line_map": {"16": 0, "21": 1, "27": 21}}
__M_END_METADATA
"""

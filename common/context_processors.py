# -*- coding: utf-8 -*-
"""
context_processor for common(setting)

除setting外的其他context_processor内容，均采用组件的方式(string)
"""
from django.conf import settings
import datetime


def mysetting(request):
    context = {
        # 基础信息
        'SITE_URL': settings.SITE_URL,
        # 静态资源
        'STATIC_URL': settings.STATIC_URL,
        'NOW': datetime.datetime.now(),
    }
    return context

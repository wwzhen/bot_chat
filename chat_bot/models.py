import datetime

from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
from django.db.models import DateTimeField


class BaseModel(models.Model):
    class Meta:
        abstract = True

    id = models.IntegerField(primary_key=True, null=False, blank=False)
    create_time = models.DateTimeField(default=datetime.datetime.now())
    update_time = models.DateTimeField(default=datetime.datetime.now())
    delflag = models.BooleanField(default=False)

    def to_dict(self, fields=None, exclude=None):
        data = {}
        for f in self._meta.concrete_fields + self._meta.many_to_many:
            value = f.value_from_object(self)
            if fields and f.name not in fields:
                continue
            if exclude and f.name in exclude:
                continue
            if isinstance(f, DateTimeField):
                value = value.strftime('%Y-%m-%d %H:%M:%S') if value else None
            data[f.name] = value
        return data


# class Bot(models.Model):
#     pass

ChatLogType = (
    ('S', 'sent'),
    ('R', 'receive')
)


class ChatLog(BaseModel):
    user_id = models.IntegerField()
    bot_name = models.CharField(max_length=16)
    content = models.CharField(max_length=64)
    type = models.CharField(max_length=8, choices=ChatLogType, default='S')

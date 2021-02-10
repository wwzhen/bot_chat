# Generated by Django 3.1.6 on 2021-02-10 07:48

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ChatLog',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('create_time', models.DateTimeField(default=datetime.datetime(2021, 2, 10, 7, 48, 15, 749109))),
                ('update_time', models.DateTimeField(default=datetime.datetime(2021, 2, 10, 7, 48, 15, 749145))),
                ('delflag', models.BooleanField(default=False)),
                ('user_id', models.IntegerField()),
                ('bot_name', models.CharField(max_length=16)),
                ('content', models.CharField(max_length=64)),
                ('type', models.CharField(choices=[('S', 'sent'), ('R', 'receive')], default='S', max_length=8)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
# Generated by Django 3.0.2 on 2020-01-27 23:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_auto_20200127_2044'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customuser',
            old_name='defaultAddress',
            new_name='default_address',
        ),
    ]

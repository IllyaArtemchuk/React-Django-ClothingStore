# Generated by Django 3.0.2 on 2020-01-30 22:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0014_auto_20200130_2147'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cart',
            old_name='price',
            new_name='total',
        ),
    ]

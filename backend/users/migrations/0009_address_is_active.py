# Generated by Django 3.0.2 on 2020-02-03 22:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_customuser_stripe_customer_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
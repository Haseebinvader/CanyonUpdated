# Generated by Django 4.2.5 on 2024-01-11 06:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_alter_customer_addressline1_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='country',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='customer',
            name='state',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]

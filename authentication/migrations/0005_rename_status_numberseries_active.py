# Generated by Django 4.2.5 on 2024-01-17 06:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_numberseries_numberseriessetup'),
    ]

    operations = [
        migrations.RenameField(
            model_name='numberseries',
            old_name='status',
            new_name='active',
        ),
    ]

# Generated by Django 4.2.4 on 2023-09-08 09:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_product_crosssectionaldiameter_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='CrossSectionalDiameter',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='InsideDiameter',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='SizeAS568',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]

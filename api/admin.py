from django.contrib import admin
from .models import *

# Register your models here.


class BCCustomerAdmin(admin.ModelAdmin):
    search_fields = ['AntiExplosiveDecompression']
    list_display = ["AntiExplosiveDecompression"]
    list_filter = ['AntiExplosiveDecompression']
    list_per_page = 20  # Apply pagination


admin.site.register(Product, BCCustomerAdmin)
admin.site.register(LastTimeUpdation)

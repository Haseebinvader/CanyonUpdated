from rest_framework import serializers
from .models import *


# Serializers define the API representation.
class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['id','picture1','CureType','picture2','ItemNo','qnty', 'price','HighTemperature', 'Description', 'Description2', 'SearchDescription','Blocked', 'CompoundNumber', 'Material','Durometer','DurometerScale','DurometerRange','Color','LowTemperature','FDACompliant','MaterialSubtype','Brand','MaterialNotes','CrossSectionalGeometry','CrossSectionalDiameter','InsideDiameter','SizeAS568','SizeMetric','SizeJIS','SizeStandard','Online', 'USPClassVI', 'NSF61',"FDAType", "USPClassVI87", "USPClassVI88", "ULListed", "ULRating", "AntiExplosiveDecompression", "NACETM0297", "NORSOKM710", "SteamResistant", "UltraSteamResistant", "LowCompressionSet", "KTW", "WRAS", "A3Sanitary", "MetalDetectable", "CleanRoomManufactured", "NSF51", "InternallyLubricated", "ExternallyLubricated", "ConductiveFiller", "LowCompressionSet"]

# class SizeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = ['SizeStandard']
from django.db import models
import uuid


class Product(models.Model):
    ItemNo = models.CharField(max_length=500, blank=True, null=True)
    qnty = models.FloatField(blank=True, null=True)

    price = models.FloatField(blank=True, null=True)

    Description = models.CharField(max_length=2000, blank=True, null=True)

    Description2 = models.CharField(max_length=2000, blank=True, null=True)

    SearchDescription = models.CharField(
        max_length=2000, blank=True, null=True)

    LotSize = models.IntegerField(blank=True, null=True)

    Blocked = models.CharField(max_length=500, blank=True, null=True)

    CompoundNumber = models.CharField(max_length=500, blank=True, null=True)

    Material = models.CharField(max_length=500, blank=True, null=True)

    Durometer = models.CharField(max_length=500, blank=True, null=True)

    DurometerScale = models.CharField(max_length=500, blank=True, null=True)

    DurometerRange = models.CharField(max_length=500, blank=True, null=True)

    Color = models.CharField(max_length=500, blank=True, null=True)

    LowTemperature = models.IntegerField(blank=True, null=True)

    HighTemperature = models.FloatField(blank=True, null=True)

    FDACompliant = models.CharField(max_length=500, blank=True, null=True)

    MaterialSubtype = models.CharField(max_length=500, blank=True, null=True)

    CureType = models.CharField(max_length=500, blank=True, null=True)

    Encapsulated = models.CharField(max_length=500, blank=True, null=True)

    Brand = models.CharField(max_length=500, blank=True, null=True)

    SalesNotes = models.TextField(blank=True, null=True)

    MaterialNotes = models.TextField(blank=True, null=True)

    CleanRoomManufactured = models.CharField(
        max_length=500, blank=True, null=True)

    FDAType = models.CharField(max_length=500, blank=True, null=True)

    USPClassVI = models.CharField(max_length=500, blank=True, null=True)

    USPClassVI87 = models.CharField(max_length=500, blank=True, null=True)

    USPClassVI88 = models.CharField(max_length=500, blank=True, null=True)

    A3Sanitary = models.CharField(max_length=500, blank=True, null=True)

    KTW = models.CharField(max_length=500, blank=True, null=True)

    WRAS = models.CharField(max_length=500, blank=True, null=True)

    ULListed = models.CharField(max_length=500, blank=True, null=True)

    ULRating = models.CharField(max_length=500, blank=True, null=True)

    MetalDetectable = models.CharField(max_length=500, blank=True, null=True)

    NSF61 = models.CharField(max_length=500, blank=True, null=True)

    NSF51 = models.CharField(max_length=500, blank=True, null=True)

    AntiExplosiveDecompression = models.CharField(
        max_length=500, blank=True, null=True)

    NACETM0297 = models.CharField(max_length=500, blank=True, null=True)

    NORSOKM710 = models.CharField(max_length=500, blank=True, null=True)

    UltraLowTemperature = models.CharField(
        max_length=500, blank=True, null=True)

    UltraHighTemperature = models.CharField(
        max_length=500, blank=True, null=True)

    SteamResistant = models.CharField(max_length=500, blank=True, null=True)

    UltraSteamResistant = models.CharField(
        max_length=500, blank=True, null=True)

    InternallyLubricated = models.CharField(
        max_length=500, blank=True, null=True)

    ExternallyLubricated = models.CharField(
        max_length=500, blank=True, null=True)

    ConductiveFiller = models.CharField(max_length=500, blank=True, null=True)

    LowCompressionSet = models.CharField(max_length=500, blank=True, null=True)

    CrossSectionalGeometry = models.CharField(
        max_length=500, blank=True, null=True)

    CrossSectionalDiameter = models.FloatField(blank=True, null=True)

    InsideDiameter = models.FloatField(blank=True, null=True)
    SizeAS568 = models.CharField(max_length=500, blank=True, null=True)

    SizeJIS = models.CharField(max_length=500, blank=True, null=True)

    SizeMetric = models.CharField(max_length=500, blank=True, null=True)

    SizeStandard = models.CharField(max_length=500, blank=True, null=True)

    Online = models.CharField(max_length=105, blank=True, null=True)

    picture1 = models.CharField(max_length=1050, blank=True, null=True)

    picture2 = models.CharField(max_length=1050, blank=True, null=True)

    def __str__(self):
        return self.ItemNo


class LastTimeUpdation(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    timeStamp = models.DateTimeField()

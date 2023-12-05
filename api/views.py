import requests
from rest_framework.decorators import api_view
from django.http import JsonResponse
import django_filters.rest_framework
from django.views import View
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from .serializers import *
from .models import Product
from django.db.models import Count
from django.db.models import Q
from django.db.models import FloatField
from django.db.models.functions import Cast
from rest_framework import filters
from django.core import serializers


class GetAccessTokenView(View):

    def get(self, request, *args, **kwargs):

        data = {

            'grant_type': 'client_credentials',

            'client_id': '68147cfe-d472-4788-a9ac-7aa804249a96',

            'client_secret': 'KZ28Q~a..oYpL0zdOuqaK-OgFyqsYj6Xuxg05cfa',

            'scope': 'https://api.businesscentral.dynamics.com/.default'

        }

        headers = {

            'Content-Type': 'application/x-www-form-urlencoded'

        }

        response = requests.post(

            'https://login.microsoftonline.com/4e94f06f-db01-47eb-aff3-7a284b01dd84/oauth2/v2.0/token',

            data=data,

            headers=headers

        )

        if response.status_code == 200:

            token = response.json()

            access_token = token['access_token']

            return JsonResponse({'access_token': access_token}, status=200)

        else:

            return JsonResponse({'error': 'Internal Server Error'}, status=500)


class DataFetchView(View):

    def get(self, request):

        # Find duplicates based on ItemNo

        # duplicate_itemnos = Product.objects.values('ItemNo').annotate(count=Count('ItemNo')).filter(count__gt=1)

        # for duplicate in duplicate_itemnos:

        #     item_no = duplicate['ItemNo']

        #     # Get all duplicate records for this ItemNo

        #     duplicate_products = Product.objects.filter(ItemNo=item_no)

        #     # Keep one record and delete the rest

        #     print(duplicate_products.exclude(pk=duplicate_products.first().pk))
        #     deleted_products = duplicate_products.exclude(pk=duplicate_products.first().pk)
        #     deleted_products.delete()

        access_token = self.get_access_token()

        if not access_token:
            return JsonResponse({'error': 'Failed to get access token'}, status=500)

        product_list = []

        base_material_type_list = []

        hard_list = []

        color_list = []

        brand_list = []

        submaterial_list = []

        url = "https://api.businesscentral.dynamics.com/v2.0/4e94f06f-db01-47eb-aff3-7a284b01dd84/SandboxNoExtentions/ODataV4/Company(%27My%20Company%27)/itemapi"

        while url:

            response = requests.get(
                url, headers=self.get_headers(access_token))

            if response.status_code == 200:

                data = response.json()

                items = data.get('value', [])

                previous_item_no = None

                product_list = []

                base_material_type_list = []

                hard_list = []

                color_list = []

                brand_list = []

                submaterial_list = []

                current_product = None

                for item in items:

                    is_same_product = item['ItemNo'] == previous_item_no

                    previous_item_no = item['ItemNo']

                    if not is_same_product:

                        if current_product and not current_product['Blocked']:

                            product_list.append(current_product)

                        current_product = {

                            'ItemNo': item['ItemNo'],

                            'qnty': item['Quantity'],

                            'price': item['UnitPrice'],

                            'Description': item['Description'],

                            'Description2': item['Description2'],

                            'SearchDescription': item['AXPNo3'],

                            'LotSize': item['LotSize'],

                            'Blocked': item['Blocked'],

                            'picture1': item['Picture@odata.mediaEditLink'],

                            'picture2': item['Picture@odata.mediaReadLink'],

                        }

                    if item['AttributeName']:
                        attribute_key = item['AttributeName'].replace(
                            ' ', '').replace(r'\W', '')

                        current_product[attribute_key] = item['AttributeValue']

                if current_product and not current_product['Blocked']:
                    product_list.append(current_product)

                for product in product_list:

                    for key, value in product.items():

                        if key == 'Material' and value not in base_material_type_list:

                            base_material_type_list.append(value)

                        elif key == 'DurometerRange' and value not in hard_list:

                            hard_list.append(value)

                        elif key == 'Color' and value not in color_list:

                            color_list.append(value)

                        elif key == 'Brand' and value not in brand_list:

                            brand_list.append(value)

                        elif key == 'MaterialNotes' and value not in submaterial_list:

                            submaterial_list.append(value)

                for product_data in product_list:
                    p = Product.objects.filter(
                        ItemNo=product_data.get('ItemNo')).first()

                    if not p:
                        pr = Product(

                            ItemNo=product_data.get('ItemNo'),

                            qnty=product_data.get('qnty'),

                            price=product_data.get('price'),

                            Description=product_data.get('Description'),

                            Description2=product_data.get('Description2'),

                            SearchDescription=product_data.get(
                                'SearchDescription'),

                            LotSize=product_data.get('LotSize'),

                            Blocked=product_data.get('Blocked'),

                            CompoundNumber=product_data.get('CompoundNumber'),

                            Material=product_data.get('Material'),

                            Durometer=product_data.get('Durometer'),

                            DurometerScale=product_data.get('DurometerScale'),

                            DurometerRange=product_data.get('DurometerRange'),

                            Color=product_data.get('Color'),

                            LowTemperature=product_data.get(
                                'LowTemperature(°C)'),

                            HighTemperature=product_data.get(
                                'HighTemperature(°C)'),

                            FDACompliant=product_data.get('FDACompliant'),

                            MaterialSubtype=product_data.get(
                                'MaterialSubtype'),

                            CureType=product_data.get('CureType'),

                            Encapsulated=product_data.get('Encapsulated'),

                            Brand=product_data.get('Brand'),

                            SalesNotes=product_data.get('SalesNotes'),

                            MaterialNotes=product_data.get('MaterialNotes'),

                            CleanRoomManufactured=product_data.get(
                                'CleanRoomManufactured'),

                            FDAType=product_data.get('FDAType'),

                            USPClassVI=product_data.get('USPClassVI'),

                            USPClassVI87=product_data.get('USPClassVI87'),

                            USPClassVI88=product_data.get('USPClassVI88'),

                            A3Sanitary=product_data.get('3ASanitary'),

                            KTW=product_data.get('KTW'),

                            WRAS=product_data.get('WRAS'),

                            ULListed=product_data.get('ULListed'),

                            ULRating=product_data.get('ULRating'),

                            MetalDetectable=product_data.get(
                                'MetalDetectable'),

                            NSF61=product_data.get('NSF61'),

                            NSF51=product_data.get('NSF51'),

                            AntiExplosiveDecompression=product_data.get(
                                'AntiExplosiveDecompressionAED'),

                            NACETM0297=product_data.get('NACETM0297'),

                            NORSOKM710=product_data.get('NORSOKM710'),

                            UltraLowTemperature=product_data.get(
                                'UltraLowTemperature'),

                            UltraHighTemperature=product_data.get(
                                'UltraHighTemperature'),

                            SteamResistant=product_data.get('SteamResistant'),

                            UltraSteamResistant=product_data.get(
                                'UltraSteamResistant'),

                            InternallyLubricated=product_data.get(
                                'InternallyLubricated'),

                            ExternallyLubricated=product_data.get(
                                'ExternallyLubricated'),

                            ConductiveFiller=product_data.get(
                                'ConductiveFiller'),

                            LowCompressionSet=product_data.get(
                                'LowCompressionSet'),

                            CrossSectionalGeometry=product_data.get(
                                'CrossSectionalGeometry'),

                            CrossSectionalDiameter=product_data.get(
                                'CrossSectionalDiameter(CS)'),

                            InsideDiameter=product_data.get(
                                'InsideDiameter(ID)'),

                            SizeAS568=product_data.get('Size(AS568)'),

                            SizeJIS=product_data.get('Size(JIS)'),

                            SizeMetric=product_data.get('SizeMetric'),

                            SizeStandard=product_data.get('SizeStandard'),

                            Online=product_data.get('Online'),

                            picture1=product_data.get('picture1'),

                            picture2=product_data.get('picture2'),

                        )

                        pr.save()

                if "@odata.nextLink" in data:

                    url = data["@odata.nextLink"]
                    print(url)

                else:

                    url = None

            else:

                return JsonResponse({'error': 'Error fetching data'}, status=500)

        return JsonResponse({

            "product_list": product_list,

            "base_material_type_list": base_material_type_list,

            "hard_list": hard_list,

            "color_list": color_list,

            "brand_list": brand_list,

            "submaterial_list": submaterial_list

        })

    def get_access_token(self):

        access_token = None

        data = {

            'grant_type': 'client_credentials',

            'client_id': '68147cfe-d472-4788-a9ac-7aa804249a96',

            'client_secret': 'KZ28Q~a..oYpL0zdOuqaK-OgFyqsYj6Xuxg05cfa',

            'scope': 'https://api.businesscentral.dynamics.com/.default'

        }

        headers = {

            'Content-Type': 'application/x-www-form-urlencoded'

        }

        response = requests.post(

            'https://login.microsoftonline.com/4e94f06f-db01-47eb-aff3-7a284b01dd84/oauth2/v2.0/token',

            data=data,

            headers=headers

        )

        if response.status_code == 200:

            token = response.json()

            access_token = token['access_token']

            print(access_token)

        else:

            return JsonResponse({'error': 'Internal Server Error'}, status=500)

        return access_token

    def get_headers(self, access_token):

        return {

            "Authorization": f"Bearer {access_token}"

        }

    
class CustomFilterBackend(DjangoFilterBackend):

    def filter_queryset(self, request, queryset, view):

        # Get the filter parameters from the request

        filterset = self.get_filterset(request, queryset, view)
        query = Q()
        key_query = Q()
        for field_name, values in request.query_params.items():
            if field_name=='search' :
                    search_query = request.GET.get('search', '')
                    if search_query:
                        for field_name in view.ordering_fields:
                            query |= Q(**{f"{field_name}__icontains": search_query})
            elif field_name == 'HighTemperature' or field_name == 'LowTemperature':

                low_temp = request.query_params.get('LowTemperature', None)

                high_temp = request.query_params.get('HighTemperature', None)

                query = query & (Q(LowTemperature__lte=low_temp) &
                                 Q(HighTemperature__gte=high_temp))
            elif field_name in ['Color', 'USPClassVI', 'NSF61', 'Material', 'MaterialSubtype', 'FDACompliant', 'DurometerRange', 'Brand', 'CrossSectionalDiameter', 'InsideDiameter',"FDAType", "USPClassVI87", "USPClassVI88", "ULListed", "ULRating", "AntiExplosiveDecompression", "NACETM0297", "NORSOKM710", "SteamResistant", "UltraSteamResistant", "LowCompressionSet", "KTW", "WRAS", "A3Sanitary", "MetalDetectable", "CleanRoomManufactured", "NSF51", "InternallyLubricated", "ExternallyLubricated", "ConductiveFiller", "LowCompressionSet"]:
                arr = values.split("$")
                if field_name == 'Color':
                    key_query = Q(Color__in=arr)
                elif field_name == 'Material':
                    key_query = Q(Material__in=arr)
                elif field_name == 'MaterialSubtype':
                    key_query = Q(MaterialSubtype__in=arr)
                elif field_name == 'FDACompliant':
                    key_query = Q(FDACompliant__in=arr)
                elif field_name == 'DurometerRange':
                    key_query = Q(DurometerRange__in=arr)
                elif field_name == 'Brand':
                    key_query = Q(Brand__in=arr)
                elif field_name == 'CrossSectionalDiameter':
                    key_query = Q(CrossSectionalDiameter__in=arr)
                elif field_name == 'InsideDiameter':
                    key_query = Q(InsideDiameter__in=arr)
                elif field_name == 'USPClassVI':
                    key_query = Q(USPClassVI__in=arr)
                elif field_name == 'NSF61':
                    key_query = Q(NSF61__in=arr)
                elif field_name == 'FDAType':
                    key_query = Q(FDAType__in=arr)
                elif field_name == 'USPClassVI87':
                    key_query = Q(USPClassVI87__in=arr)
                elif field_name == 'USPClassVI88':
                    key_query = Q(USPClassVI88__in=arr)
                elif field_name == 'ULListed':
                    key_query = Q(ULListed__in=arr)
                elif field_name == 'ULRating':
                    key_query = Q(ULRating__in=arr)
                elif field_name == 'AntiExplosiveDecompression':
                    key_query = Q(AntiExplosiveDecompression__in=arr)
                elif field_name == 'NACETM0297':
                    key_query = Q(NACETM0297__in=arr)
                elif field_name == 'NORSOKM710':
                    key_query = Q(NORSOKM710__in=arr)
                elif field_name == 'SteamResistant':
                    key_query = Q(SteamResistant__in=arr)
                elif field_name == 'UltraSteamResistant':
                    key_query = Q(UltraSteamResistant__in=arr)
                elif field_name == 'LowCompressionSet':
                    key_query = Q(LowCompressionSet__in=arr)
                elif field_name == 'KTW':
                    key_query = Q(KTW__in=arr)
                elif field_name == 'WRAS':
                    key_query = Q(WRAS__in=arr)
                elif field_name == 'A3Sanitary':
                    key_query = Q(A3Sanitary__in=arr)
                elif field_name == 'MetalDetectable':
                    key_query = Q(MetalDetectable__in=arr)
                elif field_name == 'CleanRoomManufactured':
                    key_query = Q(CleanRoomManufactured__in=arr)
                elif field_name == 'NSF51':
                    key_query = Q(NSF51__in=arr)
                elif field_name == 'InternallyLubricated':
                    key_query = Q(InternallyLubricated__in=arr)
                elif field_name == 'ExternallyLubricated':
                    key_query = Q(ExternallyLubricated__in=arr)
                elif field_name == 'ConductiveFiller':
                    key_query = Q(ConductiveFiller__in=arr)
                elif field_name == 'LowCompressionSet':
                    key_query = Q(LowCompressionSet__in=arr)

            elif field_name == 'ItemNo':
                key_query = Q(ItemNo=values)


            query = query & key_query


        queryset = Product.objects.filter(query)
        return queryset

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination
    default_limit = 10
    max_limit = 100
    # Use the custom filtering backend
    filter_backends = [CustomFilterBackend, filters.OrderingFilter]
    ordering_fields = [
        'id', 'ItemNo', 'qnty', 'price', 'Description', 'Description2', 'SearchDescription', 'Blocked',
        'CompoundNumber', 'Material', 'Durometer', 'DurometerScale', 'DurometerRange', 'Color','HighTemperature',
        'LowTemperature', 'FDACompliant', 'MaterialSubtype', 'Brand', 'MaterialNotes',
        'CrossSectionalGeometry', 'CrossSectionalDiameter', 'InsideDiameter', 'SizeAS568', 'SizeMetric',
        'SizeJIS', 'SizeStandard', 'Online'
    ]
    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)  # get the built-in response
        queryset = self.filter_queryset(self.get_queryset())

 

        # get the distinct values
        distinct_colors = queryset.order_by().values_list('Color', flat=True).distinct()
        distinct_Material = queryset.order_by().values_list('Material', flat=True).distinct()
        distinct_MaterialSubtype = queryset.order_by().values_list('MaterialSubtype', flat=True).distinct()
        distinct_DurometerRange = queryset.order_by().values_list('DurometerRange', flat=True).distinct()
        distinct_Brand = queryset.order_by().values_list('Brand', flat=True).distinct()

        print(distinct_colors)
 

        # create a new dictionary for the response data
        data = {
            'results': response.data,
            'distinct_colors': list(distinct_colors),
            'distinct_Material': list(distinct_Material),
            'distinct_MaterialSubtype': list(distinct_MaterialSubtype),
            'distinct_DurometerRange': list(distinct_DurometerRange),
            'distinct_Brand': list(distinct_Brand),
        }

        # create a new Response object with the new data
        return Response(data)

class GetUSASizeView(View):
    filter_backends = [ filters.OrderingFilter]
    ordering_fields ="__all__"
    def get(self,request):
      queryset=Product.objects.filter(Online='Online').order_by('SizeAS568').exclude(SizeAS568=None, CrossSectionalDiameter=None, InsideDiameter=None).values_list('SizeAS568', 'CrossSectionalDiameter','InsideDiameter').distinct()
      serialized_data = list(queryset)
      return JsonResponse({"data": serialized_data})

class GetJSSizeView(View):
    def get(self,request):
      queryset=Product.objects.order_by('SizeJIS').values_list('SizeJIS', 'CrossSectionalDiameter','InsideDiameter').exclude(SizeJIS=None, CrossSectionalDiameter=None, InsideDiameter=None).distinct()
      serialized_data = list(queryset)
      return JsonResponse({"data": serialized_data})

from django.conf import settings

from datetime import datetime

from api.models import Product

import requests

from django.core.exceptions import ObjectDoesNotExist


def get_access_token():
    access_token = None

    data = {

        'grant_type': 'client_credentials',

        'client_id': '68147cfe-d472-4788-a9ac-7aa804249a96',

        'client_secret': '9jF8Q~jTUMdP6CtxNwP6zis7nS1x_acCXdJf-bW4',

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

    return access_token


def sehedule_api(url=None):
    access_token = get_access_token()

    if access_token:

        product_list = []

        base_material_type_list = []

        hard_list = []

        color_list = []

        brand_list = []

        submaterial_list = []
        if not url:
            url = "https://api.businesscentral.dynamics.com/v2.0/4e94f06f-db01-47eb-aff3-7a284b01dd84/SandboxNoExtentions/ODataV4/Company(%27My%20Company%27)/itemapi"

        while url:

            response = requests.get(url, headers=get_headers(access_token))

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

                        if current_product and current_product['Blocked'] == 'false' and current_product[
                                'Online'] == 'Online':
                            product_list.append(current_product)

                        current_product = {

                            'ItemNo': item['ItemNo'],

                            'qnty': item['Quantity'],

                            'price': item['UnitPrice'],

                            'Description': item['Description'],

                            'Description2': item['Description2'],

                            'SearchDescription': item['SearchDescription'],

                            'LotSize': item['LotSize'],

                            'Blocked': item['Blocked'],

                            'picture1': item['Picture@odata.mediaEditLink'],

                            'picture2': item['Picture@odata.mediaReadLink'],

                        }

                    if item['AttributeName']:
                        attribute_key = item['AttributeName'].replace(

                            ' ', '').replace(r'\W', '')

                        current_product[attribute_key] = item['AttributeValue']

                if current_product and current_product['Blocked'] == 'false' and current_product['Online'] == 'Online':
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

                    if p:

                        item_no = product_data.get('ItemNo')

                        product = Product.objects.filter(

                            ItemNo=item_no).first()

                        if product:
                            product.qnty = product_data.get('qnty')

                            product.price = product_data.get('price')

                            product.Description = product_data.get(

                                'Description')

                            product.Description2 = product_data.get(

                                'Description2')

                            product.SearchDescription = product_data.get(

                                'SearchDescription')

                            product.LotSize = product_data.get('LotSize')

                            product.Blocked = product_data.get('Blocked')

                            product.CompoundNumber = product_data.get(

                                'CompoundNumber')

                            product.Material = product_data.get('Material')

                            product.Durometer = product_data.get('Durometer')

                            product.DurometerScale = product_data.get(

                                'DurometerScale')

                            product.DurometerRange = product_data.get(

                                'DurometerRange')

                            product.Color = product_data.get('Color')

                            product.LowTemperature = product_data.get(

                                'LowTemperature(°C)')

                            product.HighTemperature = product_data.get(

                                'HighTemperature(°C)')

                            product.FDACompliant = product_data.get(

                                'FDACompliant')

                            product.MaterialSubtype = product_data.get(

                                'MaterialSubtype')

                            product.CureType = product_data.get('CureType')

                            product.Encapsulated = product_data.get(

                                'Encapsulated')

                            product.Brand = product_data.get('Brand')

                            product.SalesNotes = product_data.get('SalesNotes')

                            product.MaterialNotes = product_data.get(

                                'MaterialNotes')

                            product.CleanRoomManufactured = product_data.get(

                                'CleanRoomManufactured')

                            product.FDAType = product_data.get('FDAType')

                            product.USPClassVI = product_data.get('USPClassVI')

                            product.USPClassVI87 = product_data.get(

                                'USPClassVI87')

                            product.USPClassVI88 = product_data.get(

                                'USPClassVI88')

                            product.A3Sanitary = product_data.get('3ASanitary')

                            product.KTW = product_data.get('KTW')

                            product.WRAS = product_data.get('WRAS')

                            product.ULListed = product_data.get('ULListed')

                            product.ULRating = product_data.get('ULRating')

                            product.MetalDetectable = product_data.get(

                                'MetalDetectable')

                            product.NSF61 = product_data.get('NSF61')

                            product.NSF51 = product_data.get('NSF51')

                            product.AntiExplosiveDecompression = product_data.get(

                                'AntiExplosiveDecompressionAED')

                            product.NACETM0297 = product_data.get('NACETM0297')

                            product.NORSOKM710 = product_data.get('NORSOKM710')

                            product.UltraLowTemperature = product_data.get(

                                'UltraLowTemperature')

                            product.UltraHighTemperature = product_data.get(

                                'UltraHighTemperature')

                            product.SteamResistant = product_data.get(

                                'SteamResistant')

                            product.UltraSteamResistant = product_data.get(

                                'UltraSteamResistant')

                            product.InternallyLubricated = product_data.get(

                                'InternallyLubricated')

                            product.ExternallyLubricated = product_data.get(

                                'ExternallyLubricated')

                            product.ConductiveFiller = product_data.get(

                                'ConductiveFiller')

                            product.LowCompressionSet = product_data.get(

                                'LowCompressionSet')

                            product.CrossSectionalGeometry = product_data.get(

                                'CrossSectionalGeometry')

                            product.CrossSectionalDiameter = product_data.get(

                                'CrossSectionalDiameter(CS)')

                            product.InsideDiameter = product_data.get(

                                'InsideDiameter(ID)')

                            product.SizeAS568 = product_data.get('Size(AS568)')

                            product.SizeJIS = product_data.get('Size(JIS)')

                            product.SizeMetric = product_data.get('SizeMetric')

                            product.SizeStandard = product_data.get(

                                'SizeStandard')

                            product.Online = product_data.get('Online')

                            product.picture1 = product_data.get(

                                'picture1')

                            product.picture2 = product_data.get(

                                'picture2'),

                            product.save()
                            print(f"{product.ItemNo} is updated ")

                    elif not p:

                        product = Product(

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

                        product.save()

                if "@odata.nextLink" in data:

                    url = data["@odata.nextLink"]

                else:

                    sehedule_api(url)


def get_headers(access_token):
    return {

        "Authorization": f"Bearer {access_token}"

    }

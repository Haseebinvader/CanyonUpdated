from django.shortcuts import render
from django.core.exceptions import ValidationError
import requests


def getAccessToken():
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
    else:
        raise ValidationError('Unable to get access token')
    return {"Authorization": f"Bearer {access_token}"}

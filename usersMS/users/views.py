from django.shortcuts import render
from .models import Clients, Credentials, Workers
from rest_framework import generics
from .serializers import ClientsSerializer, CredentialsSerializer, WorkersSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .apis import *
from django.db.models import Q
import requests


#VIEWS for Clients tab
class ClientsCreate(generics.CreateAPIView):
    # API endpoint that allows creation of a new Clients
    queryset = Clients.objects.all(),
    serializer_class = ClientsSerializer

class ClientsList(generics.ListAPIView):
    # API endpoint that allows Clients to be viewed.
    queryset = Clients.objects.all()
    serializer_class = ClientsSerializer
    filterset_fields = ['id_client', 'name', 'surname']

class ClientsUpdate(generics.RetrieveUpdateAPIView):
    # API endpoint that allows a Clients record to be updated.
    queryset = Clients.objects.all()
    serializer_class = ClientsSerializer

class ClientsDelete(generics.RetrieveDestroyAPIView):
    # API endpoint that allows a Clients record to be deleted.
    queryset = Clients.objects.all()
    serializer_class = ClientsSerializer


#VIEWS for Workers tab
class WorkersCreate(generics.CreateAPIView):
    # API endpoint that allows creation of a new Workers
    queryset = Workers.objects.all(),
    serializer_class = WorkersSerializer

class WorkersList(generics.ListAPIView):
    # API endpoint that allows Workers to be viewed.
    queryset = Workers.objects.all()
    serializer_class = WorkersSerializer
    filterset_fields = ['id_worker', 'name', 'surname','priviliges']

class WorkersUpdate(generics.RetrieveUpdateAPIView):
    # API endpoint that allows a Workers record to be updated.
    queryset = Workers.objects.all()
    serializer_class = WorkersSerializer

class WorkersDelete(generics.RetrieveDestroyAPIView):
    # API endpoint that allows a Workers record to be deleted.
    queryset = Workers.objects.all()
    serializer_class = WorkersSerializer

#VIEWS for Credentials tab
class CredentialsCreate(generics.CreateAPIView):
    # API endpoint that allows creation of a new Credentials
    queryset = Credentials.objects.all(),
    serializer_class = CredentialsSerializer

class CredentialsList(generics.ListAPIView):
    # API endpoint that allows Credentials to be viewed.
    queryset = Credentials.objects.all()
    serializer_class = CredentialsSerializer
    filterset_fields = ['login', 'password']

@api_view(['GET'])
def login(request, login, password):
    url = "http://users:{}/users/credentials/?login={}&password={}".format(usersPort, login, password)
    credential = requests.get(url, headers={}).json()
    if credential:
        id_worker = credential[0]['id_worker']
        url_worker = "http://users:{}/users/workers/?id_worker={}".format(usersPort, id_worker)
        result = requests.get(url_worker, headers={}).json()
    else:
        result = "Błędny login lub hasło!"
    return Response(result)

class CredentialsUpdate(generics.RetrieveUpdateAPIView):
    # API endpoint that allows a Credentials record to be updated.
    queryset = Credentials.objects.all()
    serializer_class = CredentialsSerializer

class CredentialsDelete(generics.RetrieveDestroyAPIView):
    # API endpoint that allows a Credentials record to be deleted.
    queryset = Credentials.objects.all()
    serializer_class = CredentialsSerializer



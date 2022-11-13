from django.shortcuts import render
from .models import Clients, Credentials, Workers
from rest_framework import generics
from .serializers import ClientsSerializer, CredentialsSerializer, WorkersSerializer


#VIEWS for Clients tab
class ClientsCreate(generics.CreateAPIView):
    # API endpoint that allows creation of a new Clients
    queryset = Clients.objects.all(),
    serializer_class = ClientsSerializer

class ClientsList(generics.ListAPIView):
    # API endpoint that allows Clients to be viewed.
    queryset = Clients.objects.all()
    serializer_class = ClientsSerializer

class ClientsDetail(generics.RetrieveAPIView):
    # API endpoint that returns a single Clients by pk.
    queryset = Clients.objects.all()
    serializer_class = ClientsSerializer

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

class WorkersDetail(generics.RetrieveAPIView):
    # API endpoint that returns a single Workers by pk.
    queryset = Workers.objects.all()
    serializer_class = WorkersSerializer

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

class CredentialsDetail(generics.RetrieveAPIView):
    # API endpoint that returns a single Credentials by pk.
    queryset = Credentials.objects.all()
    serializer_class = CredentialsSerializer

class CredentialsUpdate(generics.RetrieveUpdateAPIView):
    # API endpoint that allows a Credentials record to be updated.
    queryset = Credentials.objects.all()
    serializer_class = CredentialsSerializer

class CredentialsDelete(generics.RetrieveDestroyAPIView):
    # API endpoint that allows a Credentials record to be deleted.
    queryset = Credentials.objects.all()
    serializer_class = CredentialsSerializer



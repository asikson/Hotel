from rest_framework import serializers
from .models import Clients, Credentials, Workers


class ClientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clients 
        fields = ['id_client', 'name', 'surname']

class WorkersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workers 
        fields = ['id_worker', 'name', 'surname', 'priviliges']

class CredentialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credentials 
        fields = ['id_credential', 'login', 'password', 'id_worker']
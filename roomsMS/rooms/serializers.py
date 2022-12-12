from rest_framework import serializers
from .models import Rooms, ConferenceRooms


class RoomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rooms 
        fields = ['id_room', 'name', 'number_of_people', 'standard', "price", "clean_price"]

class ConferenceRoomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConferenceRooms 
        fields = ['id_conference_room', 'name', 'number_of_people']

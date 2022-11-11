from rest_framework import serializers
from .models import StayReservation, ConferenceReservation, StayRoomReservation, ConferenceRoomReservation


class StayReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StayReservation
        fields = ['id_stay', 'id_client', 'id_worker', 'reservation_date', 'from_date', 'to_date', 'number_of_people', 'check_in', "check_out"]

class StayRoomReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StayRoomReservation
        fields = ['id_stay', 'id_room']

class ConferenceReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConferenceRoomReservation 
        fields = ['id_stay', 'id_client', 'id_worker', 'reservation_date', 'from_date', 'to_date', 'number_of_people']

class ConferenceRoomReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConferenceReservation 
        fields = ['id_conference', 'id_conference_room']
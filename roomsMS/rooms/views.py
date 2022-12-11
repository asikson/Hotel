import requests
from django.shortcuts import render
from .models import Rooms, ConferenceRooms
from rest_framework import generics
from .serializers import RoomsSerializer, ConferenceRoomsSerializer
from django.db.models import Q
from .apis import *

def get_reservations_ids(from_d, to_d):
        results = []
        url = "http://127.0.0.1:{}/reservations/stayreservation/{}/{}".format(reservationsPort,from_d, to_d)
        api_call = requests.get(url, headers={}).json()
        for record in api_call:
            results.append(record["id_stay"])
        return results

def get_rooms_ids_from_reservations_ids(reservations):
        results = []
        for reservation in reservations:
            url = "http://127.0.0.1:{}/reservations/stayroomreservation/?id_stay={}".format(reservationsPort, reservation) 
            api_call = requests.get(url, headers={}).json()
            for record in api_call:
                results.append(record["id_room"])
        return results

class RoomsCreate(generics.CreateAPIView):
    # API endpoint that allows creation of a new Rooms
    queryset = Rooms.objects.all()
    serializer_class = RoomsSerializer

class RoomsList(generics.ListAPIView):
    # API endpoint that allows Rooms to be viewed.
    queryset = Rooms.objects.all()
    serializer_class = RoomsSerializer
    filterset_fields = ['id_room','number_of_people','name',"standard"]

class VacanciesList(generics.ListAPIView):
    # API endpoint that allows free Rooms to be viewed.
    serializer_class = RoomsSerializer
    filterset_fields = ['id_room','number_of_people','name',"standard"]
    
    def get_queryset(self):
        from_d = self.kwargs["from_d"]
        to_d = self.kwargs["to_d"]
        reservations = get_reservations_ids(from_d, to_d)
        rooms_ids = get_rooms_ids_from_reservations_ids(reservations)
        not_rooms_id = ~Q(id_room__in = rooms_ids)
        return Rooms.objects.filter(not_rooms_id)

class RoomsUpdate(generics.RetrieveUpdateAPIView):
    # API endpoint that allows a Rooms record to be updated.
    queryset = Rooms.objects.all()
    serializer_class = RoomsSerializer

class RoomsDelete(generics.RetrieveDestroyAPIView):
    # API endpoint that allows a Rooms record to be deleted.
    queryset = Rooms.objects.all()
    serializer_class = RoomsSerializer


#VIEWS for ConferenceRooms tab
class ConferenceRoomsCreate(generics.CreateAPIView):
    # API endpoint that allows creation of a new ConferenceRooms
    queryset = ConferenceRooms.objects.all()
    serializer_class = ConferenceRoomsSerializer

class ConferenceRoomsList(generics.ListAPIView):
    # API endpoint that allows ConferenceRooms to be viewed.
    queryset = ConferenceRooms.objects.all()
    serializer_class = ConferenceRoomsSerializer
    filterset_fields = ['id_conference_room','number_of_people','name']

class ConferenceRoomsUpdate(generics.RetrieveUpdateAPIView):
    # API endpoint that allows a ConferenceRooms record to be updated.
    queryset = ConferenceRooms.objects.all()
    serializer_class = ConferenceRoomsSerializer

class ConferenceRoomsDelete(generics.RetrieveDestroyAPIView):
    # API endpoint that allows a ConferenceRooms record to be deleted.
    queryset = ConferenceRooms.objects.all()
    serializer_class = ConferenceRoomsSerializer

import requests
from django.shortcuts import render
from .models import Rooms, ConferenceRooms
from rest_framework import generics
from .serializers import RoomsSerializer, ConferenceRoomsSerializer
from django.db.models import Q
from .apis import *

def get_reservations_ids(from_d, to_d, record_name, url):
        results = []
        temp_url = url + "{}/{}/".format(from_d, to_d)
        api_call = requests.get(temp_url, headers={}).json()
        for record in api_call:
            print(record)
            results.append(record[record_name])
        return results

def get_rooms_ids_from_reservations_ids(reservations, record_name, url):
        results = []
        for reservation in reservations:
            temp_url = url + str(reservation)
            api_call = requests.get(temp_url, headers={}).json()
            for record in api_call:
                results.append(record[record_name])
        return results

class RoomsCreate(generics.CreateAPIView):
    # API endpoint that allows creation of a new Rooms
    queryset = Rooms.objects.all()
    serializer_class = RoomsSerializer

class RoomsList(generics.ListAPIView):
    # API endpoint that allows Rooms to be viewed.
    queryset = Rooms.objects.all()
    serializer_class = RoomsSerializer
    filterset_fields = ['id_room','number_of_people','name', 'standard']

class VacanciesList(generics.ListAPIView):
    # API endpoint that allows free Rooms to be viewed.
    serializer_class = RoomsSerializer
    filterset_fields = ['id_room','number_of_people','name', 'standard']
    
    def get_queryset(self):
        from_d = self.kwargs["from_d"]
        to_d = self.kwargs["to_d"]
        record_name = "id_stay"
        url = "http://reservations:{}/reservations/stayreservation/".format(reservationsPort)
        reservations = get_reservations_ids(from_d, to_d, record_name, url)
        url = "http://reservations:{}/reservations/stayroomreservation/?{}=".format(reservationsPort, record_name)
        record_name = "id_room"
        rooms_ids = get_rooms_ids_from_reservations_ids(reservations, record_name, url)
        not_rooms_id = ~Q(id_room__in = rooms_ids)
        return Rooms.objects.filter(not_rooms_id)

class VacanciesListByStandard(generics.ListAPIView):
    # API endpoint that allows free Rooms to be viewed.
    serializer_class = RoomsSerializer
    filterset_fields = ['id_room','number_of_people','name', 'standard']
    
    def get_queryset(self):
        from_d = self.kwargs["from_d"]
        to_d = self.kwargs["to_d"]
        standard = self.kwargs["standard"]
        record_name = "id_stay"
        url = "http://reservations:{}/reservations/stayreservation/".format(reservationsPort)
        reservations = get_reservations_ids(from_d, to_d, record_name, url)
        url = "http://reservations:{}/reservations/stayroomreservation/?{}=".format(reservationsPort, record_name)
        record_name = "id_room"
        rooms_ids = get_rooms_ids_from_reservations_ids(reservations, record_name, url)
        not_rooms_id = ~Q(id_room__in = rooms_ids)
        return Rooms.objects.filter(not_rooms_id & Q(standard__gte = standard))

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

class ConferenceRoomsListByPeople(generics.ListAPIView):
    # API endpoint that allows ConferenceRooms to be viewed.
    serializer_class = ConferenceRoomsSerializer
    filterset_fields = ['id_conference_room','number_of_people','name']
    def get_queryset(self):
        number_of_people = self.kwargs['number_of_people'] 
        return ConferenceRooms.objects.filter(number_of_people__gte = number_of_people)

class FreeConferenceRoomsList(generics.ListAPIView):
    # API endpoint that allows ConferenceRooms to be viewed.
    serializer_class = ConferenceRoomsSerializer
    filterset_fields = ['id_conference_room','number_of_people','name']
    def get_queryset(self):
        from_d = self.kwargs["from_d"]
        to_d = self.kwargs["to_d"]
        record_name = "id_conference"
        url = "http://reservations:8001/reservations/conferencereservation/".format(reservationsPort)
        reservations = get_reservations_ids(from_d, to_d, record_name, url)
        url = "http://reservations:{}/reservations/conferenceroomreservation/?{}=".format(reservationsPort, record_name)
        record_name = "id_conference_room"
        rooms_ids = get_rooms_ids_from_reservations_ids(reservations, record_name, url)
        not_rooms_id = ~Q(id_conference_room__in = rooms_ids)
        return ConferenceRooms.objects.filter(not_rooms_id)
        
class FreeConferenceRoomsListByPeople(generics.ListAPIView):
    # API endpoint that allows ConferenceRooms to be viewed.
    serializer_class = ConferenceRoomsSerializer
    filterset_fields = ['id_conference_room','number_of_people','name']
    def get_queryset(self):
        from_d = self.kwargs["from_d"]
        to_d = self.kwargs["to_d"]
        number_of_people = self.kwargs["number_of_people"]
        record_name = "id_conference"
        url = "http://reservations:{}/reservations/conferencereservation/".format(reservationsPort)
        reservations = get_reservations_ids(from_d, to_d, record_name, url)
        url = "http://reservations:{}/reservations/conferenceroomreservation/?{}=".format(reservationsPort, record_name)
        rooms_ids = get_rooms_ids_from_reservations_ids(reservations, record_name, url)
        not_rooms_id = ~Q(id_conference_room__in = rooms_ids)
        return ConferenceRooms.objects.filter(not_rooms_id & Q(number_of_people__gte = number_of_people))

class ConferenceRoomsUpdate(generics.RetrieveUpdateAPIView):
    # API endpoint that allows a ConferenceRooms record to be updated.
    queryset = ConferenceRooms.objects.all()
    serializer_class = ConferenceRoomsSerializer

class ConferenceRoomsDelete(generics.RetrieveDestroyAPIView):
    # API endpoint that allows a ConferenceRooms record to be deleted.
    queryset = ConferenceRooms.objects.all()
    serializer_class = ConferenceRoomsSerializer

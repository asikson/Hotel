from django.shortcuts import render
from .models import Rooms, ConferenceRooms
from rest_framework import generics
from .serializers import RoomsSerializer, ConferenceRoomsSerializer


#VIEWS for Rooms tab
class RoomsCreate(generics.CreateAPIView):
    # API endpoint that allows creation of a new Rooms
    queryset = Rooms.objects.all(),
    serializer_class = RoomsSerializer

class RoomsList(generics.ListAPIView):
    # API endpoint that allows Rooms to be viewed.
    queryset = Rooms.objects.all()
    serializer_class = RoomsSerializer

class RoomsDetail(generics.RetrieveAPIView):
    # API endpoint that returns a single Rooms by pk.
    queryset = Rooms.objects.all()
    serializer_class = RoomsSerializer

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
    queryset = ConferenceRooms.objects.all(),
    serializer_class = ConferenceRoomsSerializer

class ConferenceRoomsList(generics.ListAPIView):
    # API endpoint that allows ConferenceRooms to be viewed.
    queryset = ConferenceRooms.objects.all()
    serializer_class = ConferenceRoomsSerializer

class ConferenceRoomsDetail(generics.RetrieveAPIView):
    # API endpoint that returns a single ConferenceRooms by pk.
    queryset = ConferenceRooms.objects.all()
    serializer_class = ConferenceRoomsSerializer

class ConferenceRoomsUpdate(generics.RetrieveUpdateAPIView):
    # API endpoint that allows a ConferenceRooms record to be updated.
    queryset = ConferenceRooms.objects.all()
    serializer_class = ConferenceRoomsSerializer

class ConferenceRoomsDelete(generics.RetrieveDestroyAPIView):
    # API endpoint that allows a ConferenceRooms record to be deleted.
    queryset = ConferenceRooms.objects.all()
    serializer_class = ConferenceRoomsSerializer

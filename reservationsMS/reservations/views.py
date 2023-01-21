from django.shortcuts import render
from .models import StayReservation, StayRoomReservation, ConferenceReservation, ConferenceRoomReservation
from rest_framework import generics
from .serializers import StayRoomReservationSerializer, StayReservationSerializer, ConferenceReservationSerializer, ConferenceRoomReservationSerializer
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .apis import *
import requests
from datetime import datetime, timedelta
from itertools import groupby

def get_reservations(url):
    results = requests.get(url, headers={}).json()
    return results

def get_rooms(url):
    results = requests.get(url, headers={}).json()
    return results

def get_room_info(url):
    results = requests.get(url, headers={}).json()
    return results

#VIEWS for StayReservation tab
class StayReservationCreate(generics.CreateAPIView):
    # API endpoint that allows creation of a new StayReservation
    queryset = StayReservation.objects.all(),
    serializer_class = StayReservationSerializer

class StayReservationList(generics.ListAPIView):
    # API endpoint that allows StayReservation to be viewed.
    queryset = StayReservation.objects.all()
    serializer_class = StayReservationSerializer
    filterset_fields = ['id_stay']


def get_list_of_data_from_range(from_d, to_d, id_stay):
    list_of_data = {}
    range_from = datetime.strptime(from_d, '%Y-%m-%d')
    range_to = datetime.strptime(to_d, '%Y-%m-%d')
    delta = range_to - range_from
    for i in range(delta.days + 1):
        day = range_from + timedelta(days=i)
        day = day.date()
        list_of_data[str(day)] = id_stay
    return list_of_data

def groub_by_room_id(rooms):
    grouped_rooms = []
    for room in rooms:
        grouped_rooms.append(room)
    return grouped_rooms

@api_view(['GET'])
def StayReservationListFull(request):
    reservations = get_reservations("http://reservations:{}/reservations/stayreservation/".format(reservationsPort))
    for reservation in reservations:
        rooms = get_rooms("http://reservations:{}/reservations/stayroomreservation/?id_stay={}".format(reservationsPort, reservation['id_stay']))
        rooms_info = []
        for room in rooms:
            room_info = get_room_info("http://rooms:{}/rooms/rooms/?id_room={}".format(roomsPort, room['id_room']))
            rooms_info.extend(room_info)
        reservation['rooms'] = rooms_info
    return Response(reservations)

@api_view(['GET'])
def StayReservationListFullDate(request, from_d, to_d):
    reservations = get_reservations("http://reservations:{}/reservations/stayreservation/{}/{}/".format(reservationsPort, from_d, to_d))
    rooms = []
    for reservation in reservations:
        data = []
        data.extend(get_rooms("http://reservations:{}/reservations/stayroomreservation/?id_stay={}".format(reservationsPort, reservation['id_stay'])))
        data = dict(*data)
        new_data = {"id_room": data.pop("id_room")}
        data = new_data
        list_of_dates = get_list_of_data_from_range(reservation["from_date"], reservation["to_date"], reservation['id_stay'])
        data["info"] = list_of_dates
        rooms.append(data)

    return Response(groub_by_room_id(rooms))

class StayReservationListFiltr(generics.ListAPIView):
    # API endpoint that allows StayReservation to be viewed.
    serializer_class = StayReservationSerializer
    def get_queryset(self):
        from_d = self.kwargs["from_d"]
        to_d = self.kwargs["to_d"]
        from_date_in_range = Q(from_date__range=[from_d, to_d])
        to_date_in_range = Q(to_date__range=[from_d, to_d])
        from_date_before = Q(from_date__lte = from_d)
        to_date_after = Q(to_date__gte = to_d)
        return StayReservation.objects.filter(
            from_date_in_range
            | to_date_in_range
            | (from_date_before & to_date_after)
        )

class StayReservationUpdate(generics.RetrieveUpdateAPIView):
    # API endpoint that allows a StayReservation record to be updated.
    queryset = StayReservation.objects.all()
    serializer_class = StayReservationSerializer

class StayReservationDelete(generics.RetrieveDestroyAPIView):
    # API endpoint that allows a StayReservation record to be deleted.
    queryset = StayReservation.objects.all()
    serializer_class = StayReservationSerializer

#VIEWS for ConferenceStayReservation tab
class StayRoomReservationCreate(generics.CreateAPIView):
    # API endpoint that allows creation of a new StayRoomReservation
    queryset = StayRoomReservation.objects.all(),
    serializer_class = StayRoomReservationSerializer

class StayRoomReservationList(generics.ListAPIView):
    # API endpoint that allows StayRoomReservation to be viewed.
    queryset = StayRoomReservation.objects.all()
    serializer_class = StayRoomReservationSerializer
    filterset_fields = ['id_stay']

class StayRoomReservationUpdate(generics.RetrieveUpdateAPIView):
    # API endpoint that allows a StayRoomReservation record to be updated.
    queryset = StayRoomReservation.objects.all()
    serializer_class = StayRoomReservationSerializer

class StayRoomReservationDelete(generics.RetrieveDestroyAPIView):
    # API endpoint that allows a StayRoomReservation record to be deleted.
    queryset = StayRoomReservation.objects.all()
    serializer_class = StayRoomReservationSerializer

#VIEWS for ConferenceReservation tab
class ConferenceReservationCreate(generics.CreateAPIView):
    # API endpoint that allows creation of a new ConferenceReservation
    queryset = ConferenceReservation.objects.all(),
    serializer_class = ConferenceReservationSerializer

class ConferenceReservationList(generics.ListAPIView):
    # API endpoint that allows ConferenceReservation to be viewed.
    queryset = ConferenceReservation.objects.all()
    serializer_class = ConferenceReservationSerializer
    filterset_fields = ['id_conference']


@api_view(['GET'])
def ConferenceReservationListFull(request):
    reservations = get_reservations("http://reservations:{}/reservations/conferencereservation/".format(reservationsPort))
    for reservation in reservations:
        rooms = get_rooms("http://reservations:{}/reservations/conferenceroomreservation/?id_conference={}".format(reservationsPort, reservation['id_conference']))
        rooms_info = []
        for room in rooms:
            room_info = get_room_info("http://rooms:{}/rooms/conferencerooms/?id_conference_room={}".format(roomsPort, room['id_conference_room']))
            rooms_info.extend(room_info)
        reservation['rooms'] = rooms_info
    return Response(reservations)

class ConferenceReservationListFiltr(generics.ListAPIView):
    # API endpoint that allows StayReservation to be viewed.
    serializer_class = ConferenceReservationSerializer
    def get_queryset(self):
        from_d = self.kwargs["from_d"]
        to_d = self.kwargs["to_d"]
        from_date_in_range = Q(from_date__range=[from_d, to_d])
        to_date_in_range = Q(to_date__range=[from_d, to_d])
        from_date_before = Q(from_date__lte = from_d)
        to_date_after = Q(to_date__gte = to_d)
        return ConferenceReservation.objects.filter(
            from_date_in_range
            | to_date_in_range
            | (from_date_before & to_date_after)
        )

class ConferenceReservationUpdate(generics.RetrieveUpdateAPIView):
    # API endpoint that allows a ConferenceReservation record to be updated.
    queryset = ConferenceReservation.objects.all()
    serializer_class = ConferenceReservationSerializer

class ConferenceReservationDelete(generics.RetrieveDestroyAPIView):
    # API endpoint that allows a ConferenceReservation record to be deleted.
    queryset = ConferenceReservation.objects.all()
    serializer_class = ConferenceReservationSerializer

#VIEWS for ConferenceRoomReservation tab
class ConferenceRoomReservationCreate(generics.CreateAPIView):
    # API endpoint that allows creation of a new ConferenceRoomReservation
    queryset = ConferenceRoomReservation.objects.all(),
    serializer_class = ConferenceRoomReservationSerializer

class ConferenceRoomReservationList(generics.ListAPIView):
    # API endpoint that allows ConferenceRoomReservation to be viewed.
    queryset = ConferenceRoomReservation.objects.all()
    serializer_class = ConferenceRoomReservationSerializer
    filterset_fields = ['id_conference']

class ConferenceRoomReservationUpdate(generics.RetrieveUpdateAPIView):
    # API endpoint that allows a ConferenceRoomReservation record to be updated.
    queryset = ConferenceRoomReservation.objects.all()
    serializer_class = ConferenceRoomReservationSerializer

class ConferenceRoomReservationDelete(generics.RetrieveDestroyAPIView):
    # API endpoint that allows a ConferenceRoomReservation record to be deleted.
    queryset = ConferenceRoomReservation.objects.all()
    serializer_class = ConferenceRoomReservationSerializer
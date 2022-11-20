from django.shortcuts import render
from .models import StayReservation, StayRoomReservation, ConferenceReservation, ConferenceRoomReservation
from rest_framework import generics
from .serializers import StayRoomReservationSerializer, StayReservationSerializer, ConferenceReservationSerializer, ConferenceRoomReservationSerializer


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
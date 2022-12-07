from django.urls import include, path, register_converter
from .views import ConferenceReservationCreate, ConferenceReservationList, ConferenceReservationUpdate, ConferenceReservationDelete
from .views import ConferenceRoomReservationCreate, ConferenceRoomReservationList, ConferenceRoomReservationUpdate, ConferenceRoomReservationDelete
from .views import StayReservationCreate, StayReservationList, StayReservationUpdate, StayReservationDelete, StayReservationListFiltr
from .views import StayRoomReservationCreate, StayRoomReservationList, StayRoomReservationUpdate, StayRoomReservationDelete
from .converters import DateConverter

register_converter(DateConverter, 'date')


urlpatterns = [
    #ConferenceReservation table urls
    path('conferencereservation/', ConferenceReservationList.as_view()),
    path('conferencereservation/create/', ConferenceReservationCreate.as_view(), name='create-conferencereservation'),
    path('conferencereservation/update/<int:pk>/', ConferenceReservationUpdate.as_view(), name='update-conferencereservation'),
    path('conferencereservation/delete/<int:pk>/', ConferenceReservationDelete.as_view(), name='delete-conferencereservation'),
    #StayReservation table urls
    path('stayreservation/', StayReservationList.as_view()),
    path('stayreservation/<date:from_d>/<date:to_d>', StayReservationListFiltr.as_view()),
    path('stayreservation/create/', StayReservationCreate.as_view(), name='create-stayreservation'),
    path('stayreservation/update/<int:pk>/', StayReservationUpdate.as_view(), name='update-stayreservation'),
    path('stayreservation/delete/<int:pk>/', StayReservationDelete.as_view(), name='delete-stayreservation'),
    #ConferenceRoomReservation table urls
    path('conferenceroomreservation/', ConferenceRoomReservationList.as_view()),
    path('conferenceroomreservation/create/', ConferenceRoomReservationCreate.as_view(), name='create-conferenceroomreservation'),
    path('conferenceroomreservation/update/<int:pk>/', ConferenceRoomReservationUpdate.as_view(), name='update-conferenceroomreservation'),
    path('conferenceroomreservation/delete/<int:pk>/', ConferenceRoomReservationDelete.as_view(), name='delete-conferenceroomreservation'),
    #StayReservation table urls
    path('stayroomreservation/', StayRoomReservationList.as_view()),
    path('stayroomreservation/create/', StayRoomReservationCreate.as_view(), name='create-stayroomreservation'),
    path('stayroomreservation/update/<int:pk>/', StayRoomReservationUpdate.as_view(), name='update-stayroomreservation'),
    path('stayroomreservation/delete/<int:pk>/', StayRoomReservationDelete.as_view(), name='delete-stayroomreservation'),
]
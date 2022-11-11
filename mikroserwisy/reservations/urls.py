from django.urls import include, path
from .views import ConferenceReservationCreate, ConferenceReservationList, ConferenceReservationDetail, ConferenceReservationUpdate, ConferenceReservationDelete
from .views import ConferenceRoomReservationCreate, ConferenceRoomReservationList, ConferenceRoomReservationDetail, ConferenceRoomReservationUpdate, ConferenceRoomReservationDelete
from .views import StayReservationCreate, StayReservationList, StayReservationDetail, StayReservationUpdate, StayReservationDelete
from .views import StayRoomReservationCreate, StayRoomReservationList, StayRoomReservationDetail, StayRoomReservationUpdate, StayRoomReservationDelete



urlpatterns = [
    #ConferenceReservation table urls
    path('conferencereservation/create/', ConferenceReservationCreate.as_view(), name='create-conferencereservation'),
    path('conferencereservation/', ConferenceReservationList.as_view()),
    path('conferencereservation/<int:pk>/', ConferenceReservationDetail.as_view(), name='retrieve-conferencereservation'),
    path('conferencereservation/update/<int:pk>/', ConferenceReservationUpdate.as_view(), name='update-conferencereservation'),
    path('conferencereservation/delete/<int:pk>/', ConferenceReservationDelete.as_view(), name='delete-conferencereservation'),
    #StayReservation table urls
    path('stayreservation/create/', StayReservationCreate.as_view(), name='create-stayreservation'),
    path('stayreservation/', StayReservationList.as_view()),
    path('stayreservation/<int:pk>/', StayReservationDetail.as_view(), name='retrieve-stayreservation'),
    path('stayreservation/update/<int:pk>/', StayReservationUpdate.as_view(), name='update-stayreservation'),
    path('stayreservation/delete/<int:pk>/', StayReservationDelete.as_view(), name='delete-stayreservation'),
    #ConferenceRoomReservation table urls
    path('conferenceroomreservation/create/', ConferenceRoomReservationCreate.as_view(), name='create-conferenceroomreservation'),
    path('conferenceroomreservation/', ConferenceRoomReservationList.as_view()),
    path('conferenceroomreservation/<int:pk>/', ConferenceRoomReservationDetail.as_view(), name='retrieve-conferenceroomreservation'),
    path('conferenceroomreservation/update/<int:pk>/', ConferenceRoomReservationUpdate.as_view(), name='update-conferenceroomreservation'),
    path('conferenceroomreservation/delete/<int:pk>/', ConferenceRoomReservationDelete.as_view(), name='delete-conferenceroomreservation'),
    #StayReservation table urls
    path('stayroomreservation/create/', StayRoomReservationCreate.as_view(), name='create-stayroomreservation'),
    path('stayroomreservation/', StayRoomReservationList.as_view()),
    path('stayroomreservation/<int:pk>/', StayRoomReservationDetail.as_view(), name='retrieve-stayroomreservation'),
    path('stayroomreservation/update/<int:pk>/', StayRoomReservationUpdate.as_view(), name='update-stayroomreservation'),
    path('stayroomreservation/delete/<int:pk>/', StayRoomReservationDelete.as_view(), name='delete-stayroomreservation'),
]
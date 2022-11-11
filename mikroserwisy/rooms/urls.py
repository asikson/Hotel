from django.urls import include, path
from .views import RoomsCreate, RoomsList, RoomsDetail, RoomsUpdate, RoomsDelete
from .views import ConferenceRoomsCreate, ConferenceRoomsList, ConferenceRoomsDetail, ConferenceRoomsUpdate, ConferenceRoomsDelete


urlpatterns = [
    #Rooms table urls
    path('rooms/create/', RoomsCreate.as_view(), name='create-rooms'),
    path('rooms/', RoomsList.as_view()),
    path('rooms/<int:pk>/', RoomsDetail.as_view(), name='retrieve-rooms'),
    path('rooms/update/<int:pk>/', RoomsUpdate.as_view(), name='update-rooms'),
    path('rooms/delete/<int:pk>/', RoomsDelete.as_view(), name='delete-rooms'),
    #ConferenceRooms table urls
    path('conferencerooms/create/', ConferenceRoomsCreate.as_view(), name='create-conferencerooms'),
    path('conferencerooms/', ConferenceRoomsList.as_view()),
    path('conferencerooms/<int:pk>/', ConferenceRoomsDetail.as_view(), name='retrieve-conferencerooms'),
    path('conferencerooms/update/<int:pk>/', ConferenceRoomsUpdate.as_view(), name='update-conferencerooms'),
    path('conferencerooms/delete/<int:pk>/', ConferenceRoomsDelete.as_view(), name='delete-conferencerooms'),
]
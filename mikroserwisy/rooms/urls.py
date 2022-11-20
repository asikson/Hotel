from django.urls import include, path
from .views import RoomsCreate, RoomsList, RoomsUpdate, RoomsDelete
from .views import ConferenceRoomsCreate, ConferenceRoomsList, ConferenceRoomsUpdate, ConferenceRoomsDelete


urlpatterns = [
    #Rooms table urls
    path('rooms/', RoomsList.as_view()),
    path('rooms/create/', RoomsCreate.as_view(), name='create-rooms'),
    path('rooms/update/<int:pk>/', RoomsUpdate.as_view(), name='update-rooms'),
    path('rooms/delete/<int:pk>/', RoomsDelete.as_view(), name='delete-rooms'),
    #ConferenceRooms table urls
    path('conferencerooms/', ConferenceRoomsList.as_view()),
    path('conferencerooms/create/', ConferenceRoomsCreate.as_view(), name='create-conferencerooms'),
    path('conferencerooms/update/<int:pk>/', ConferenceRoomsUpdate.as_view(), name='update-conferencerooms'),
    path('conferencerooms/delete/<int:pk>/', ConferenceRoomsDelete.as_view(), name='delete-conferencerooms'),
]
from django.urls import include, path, register_converter
from .views import RoomsCreate, RoomsList, RoomsUpdate, RoomsDelete, VacanciesList
from .views import ConferenceRoomsCreate, ConferenceRoomsList, ConferenceRoomsUpdate, ConferenceRoomsDelete
from .converters import DateConverter

register_converter(DateConverter, 'date')

urlpatterns = [
    #Rooms table urls
    path('rooms/', RoomsList.as_view()),
    path('rooms/vacancies/<date:from_d>/<date:to_d>', VacanciesList.as_view()),
    path('rooms/create/', RoomsCreate.as_view(), name='create-rooms'),
    path('rooms/update/<int:pk>/', RoomsUpdate.as_view(), name='update-rooms'),
    path('rooms/delete/<int:pk>/', RoomsDelete.as_view(), name='delete-rooms'),
    #ConferenceRooms table urls
    path('conferencerooms/', ConferenceRoomsList.as_view()),
    path('conferencerooms/create/', ConferenceRoomsCreate.as_view(), name='create-conferencerooms'),
    path('conferencerooms/update/<int:pk>/', ConferenceRoomsUpdate.as_view(), name='update-conferencerooms'),
    path('conferencerooms/delete/<int:pk>/', ConferenceRoomsDelete.as_view(), name='delete-conferencerooms'),
]
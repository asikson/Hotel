from django.urls import include, path, register_converter
from . import views as views
from .converters import DateConverter

register_converter(DateConverter, 'date')

urlpatterns = [
    path('<date:from_date>/<date:to_date>/<int:number_of_people>/', views.algorythm, name="algorythm"),
    path('<date:from_date>/<date:to_date>/<int:number_of_people>/<int:standard>/', views.algorythmByStandard, name="algorythm"),
]
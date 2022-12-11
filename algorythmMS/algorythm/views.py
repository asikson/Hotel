from django.shortcuts import render
from rest_framework import generics
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .apis import *

def get_vacancies(from_date, to_date):
    url = "http://127.0.0.1:{}/rooms/rooms/vacancies/{}/{}".format(roomsPort, from_date, to_date)
    results = requests.get(url, headers={}).json()
    return results

@api_view(['GET']) 
def algorythm(request, from_date, to_date, number_of_people):
    free_rooms = get_vacancies(from_date, to_date)
    #algorytm
    
    chosen_rooms = ["Pokój 1", "Pokój 2", "Pokój 8", "Pokój 9", "Pokój 10"]
    results = []
    for room in free_rooms:
        if room['name'] in chosen_rooms:
            results.append(room)
    return Response(results)
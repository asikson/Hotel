from django.shortcuts import render
from rest_framework import generics
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .apis import *
from .GeneticAlgorithm import genetic_algorithm

def get_vacancies(from_date, to_date):
    url = "http://rooms:{}/rooms/rooms/vacancies/{}/{}/".format(roomsPort, from_date, to_date)
    results = requests.get(url, headers={}).json()
    return results

def get_vacancies_by_standard(from_date, to_date, standard):
    url = "http://rooms:{}/rooms/rooms/vacancies/{}/{}/{}/".format(roomsPort, from_date, to_date, standard)
    results = requests.get(url, headers={}).json()
    return results

@api_view(['GET']) 
def algorythm(request, from_date, to_date, number_of_people):
    free_rooms = get_vacancies(from_date, to_date)
    rooms = []
    price = []
    l_rooms = []
    for room in free_rooms:
        rooms.append(room['name'])
        price.append(room['price']-room['clean_price'])
        l_rooms.append(room['number_of_people'])
    chosen_rooms = genetic_algorithm(number_of_people, price, rooms, l_rooms).get()
    results = []
    for room in free_rooms:
        if room['name'] in chosen_rooms:
            results.append(room)
    return Response(results)

@api_view(['GET'])
def algorythmByStandard(request, from_date, to_date, number_of_people, standard):
    free_rooms = get_vacancies_by_standard(from_date, to_date, standard)
    rooms = []
    price = []
    l_rooms = []
    for room in free_rooms:
        rooms.append(room['name'])
        price.append(room['price']-room['clean_price'])
        l_rooms.append(room['number_of_people'])
    chosen_rooms = genetic_algorithm(number_of_people, price, rooms, l_rooms).get()
    results = []
    for room in free_rooms:
        if room['name'] in chosen_rooms:
            results.append(room)
    return Response(results)
from django.shortcuts import render
from rest_framework import generics
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response

def get_vacancies(from_date, to_date):
    url = "http://127.0.0.1:8001/rooms/rooms/vacancies/{}/{}".format(from_date, to_date)
    results = requests.get(url, headers={}).json()
    return results

@api_view(['GET']) 
def algorythm(request, from_date, to_date, number_of_people):
    result = get_vacancies(from_date, to_date)
    return Response(result)
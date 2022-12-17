import random
from .Population import *
from .Methods import *


pop_size = 50  # wielkosc populacji
gen = 50  # ilosc pokolen
Px = 0.7  # prawdopodobienstwo krzyzowania
Pm = 0.1  # prawdopodobienstwo mutacji
Tour = 5  # rozmiar turnieju
#rooms = free_rooms['name']

def genetic_algorithm(people, price, rooms, l_rooms):
    population = generate_population(people, rooms, l_rooms, price, pop_size)
    for i in range(gen):
        if i == 0:
            population.sort()
        # tablica do zapisywania nowych pokolen
        new_generation = []
        while len(new_generation) < len(population):
            # wylosowanie prawdopodobienstwa krzyzowania i mutacji
            probablility = random.uniform(0, 1)
            # wylosowanie rodzicow
            parents_individual = tournament_selection(population, Tour)
            parent1 = parents_individual[0]
            parent2 = parents_individual[1]

            # krzyzowanie
            if probablility < Px and probablility > Pm:
                child1 = OX(parents_individual, rooms, price, l_rooms)
                child2 = OX(parents_individual, rooms, price, l_rooms)
                new_generation.append(child1)
                new_generation.append(child2)
            elif probablility < Pm:
                child1 = OX(parents_individual, rooms, price, l_rooms)
                new_generation.append(child1)
                child2 = OX(parents_individual, rooms, price, l_rooms)
                child2 = mutation(child2, rooms, price, l_rooms)
                new_generation.append(child2)
            else:
                new_generation.append(parent1)
                new_generation.append(parent2)
        population = new_generation

        population.sort()
        best_individual = population[0]
    return best_individual




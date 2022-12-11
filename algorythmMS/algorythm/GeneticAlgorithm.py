import random
import Population
import Methods

people = ["Hania", "Kasia", "Pies"]
rooms = ["Apartament1", "Apartament2", "Apartament3", "Apartament4", "Apartament5", "Apartament6", "Apartament7",
         "Apartament8", "Apartament9"]
price = [200, 400, 500, 600, 500, 700, 200, 400, 500]
l_rooms = [1, 13, 2, 4, 5, 5, 1, 13, 2]
pop_size = 100  # wielkosc populacji
gen = 100  # ilosc pokolen
Px = 0.7  # prawdopodobienstwo krzyzowania
Pm = 0.1  # prawdopodobienstwo mutacji
Tour = 5  # rozmiar turnieju


def genetic_algorithm(rooms, pop_size, gen, Px, Pm, Tour):
    population = Population.generate_population(people, rooms, l_rooms, price, pop_size)
    for i in range(gen):
        if i == 0:
            population.sort()
        # tablica do zapisywania nowych pokolen
        new_generation = []
        while len(new_generation) < len(population):
            # wylosowanie prawdopodobienstwa krzyzowania i mutacji
            probablility = random.uniform(0, 1)
            # wylosowanie rodzicow
            parents_individual = Methods.tournament_selection(population, Tour)
            parent1 = parents_individual[0]
            parent2 = parents_individual[1]

            # krzyzowanie
            if probablility < Px and probablility > Pm:
                child1 = Methods.OX(parents_individual, rooms, price)
                child2 = Methods.OX(parents_individual, rooms, price)
                new_generation.append(child1)
                new_generation.append(child2)
            elif probablility < Pm:
                child1 = Methods.OX(parents_individual, rooms, price)
                new_generation.append(child1)
                child2 = Methods.OX(parents_individual, rooms, price)
                child2 = Methods.mutation(child2, rooms, price)
                new_generation.append(child2)
            else:
                new_generation.append(parent1)
                new_generation.append(parent2)
        population = new_generation

        population.sort()
        best_individual = population[0]
    return best_individual


genetic_algorithm(rooms, pop_size, gen, Px, Pm, Tour).print()

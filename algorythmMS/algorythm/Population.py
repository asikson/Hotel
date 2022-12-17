import random
from copy import copy
from .Individual import *


def genotype_search(size, rooms, l_rooms):
    rooms = copy(rooms)
    l_rooms = copy(l_rooms)
    node_list = []
    index = random.randrange(0, len(rooms))
    start_node = rooms[index]

    node_list.append(start_node)
    l_rooms[index] = l_rooms[index] - 1
    while (size - 1):
        node = random.choice(rooms)
        index = rooms.index(node)
        if l_rooms[index] > 0:
            node_list.append(node)
            l_rooms[index] = l_rooms[index] - 1
            size = size - 1
    return node_list


def evaluation(rooms, node_list, price):
    total_cost = 0
    for i in node_list:
        index = rooms.index(i)
        total_cost = total_cost + price[index]
    total_cost = total_cost + 300 * len(node_list)
    return total_cost


def generate_population(people, rooms, l_rooms, price, size):
    population = []
    for i in range(0, size):
        individual = Individual([], 0.0)
        genotype = genotype_search(people, rooms, l_rooms)
        individual.genotype = genotype
        individual.fitness = evaluation(rooms, genotype, price)
        population.append(individual)
    return population

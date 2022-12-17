import random
from copy import copy
from .Individual import *


def genotype_search(size, rooms, l_rooms):
    rooms = copy(rooms)
    l_rooms = copy(l_rooms)
    node_list = []
    while (size):
        node = random.choice(rooms)
        index = rooms.index(node)
        if l_rooms[index] > 0:
            while(l_rooms[index]):
                if size == 0:
                    return node_list
                node_list.append(node)
                l_rooms[index] = l_rooms[index] - 1
                size = size - 1
    return node_list


def evaluation(rooms, node_list, price, l_rooms):
    total_cost = 0
    cost = 0
    for i in node_list:
        index = rooms.index(i)
        total_cost = total_cost + price[index]
    n = set(node_list)
    for i in list(n):
        index = rooms.index(i)
        cost = cost + l_rooms[index]
    total_cost = total_cost + 100 * cost
    return total_cost


def generate_population(people, rooms, l_rooms, price, size):
    population = []
    for i in range(0, size):
        individual = Individual([], 0.0)
        genotype = genotype_search(people, rooms, l_rooms)
        individual.genotype = genotype
        individual.fitness = evaluation(rooms, genotype, price, l_rooms)
        population.append(individual)
    return population

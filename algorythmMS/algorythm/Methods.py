import random
from copy import deepcopy
import Individual
import Population


# Selekcja turniejowa
def tournament_selection(population, tour):
    parents_individual = []

    for i in range(0, 2):
        tournament_list = []
        papulation_tmp = deepcopy(population)

        for j in range(0, tour):
            idx = random.choice(papulation_tmp)
            tournament_list.append(idx)
            papulation_tmp.remove(idx)
        best_individual = Individual.Individual([], 100000000.0)

        for k in tournament_list:
            if (k.fitness < best_individual.fitness):
                best_individual.genotype = k.genotype
                best_individual.fitness = k.fitness
        parents_individual.append(best_individual)

    return parents_individual


def OX(parents, rooms, price):
    parent0 = deepcopy(parents[0])
    parent1 = deepcopy(parents[1])

    child = Individual.Individual([], 0.0)

    # wylosowanie puntku poczatkowe i koncowego, w ktorych genom zostanie pociety
    x1 = random.randint(0, len(parents[0].genotype) - 2)
    x2 = random.randint(x1, len(parents[0].genotype) - 1)

    if x1 == x2:
        while x1 == x2:
            x2 = random.randint(x1, len(parents[0].genotype) - 1)

    genotype_child = []
    tab = []

    # przekopiowanie części genomu pierwszego rodzica do potomka
    for j in range(x1, x2 + 1):
        genotype_child.append(parent0.genotype[j])
        tab.append(parent0.genotype[j])

    # usunięcie z drugiego rodzica miast, które potem wziął z pierwszego rodzica
    for i in tab:
        if i in parent1.genotype:
            parent1.genotype.remove(i)

    second_parent = deepcopy(parent1.genotype)

    # uzupełnienie potomka miastami z drugiego rodzica
    idx = 0
    for k in range(0, x1):
        genotype_child.insert(k, parent1.genotype[k])
        idx += 1

    if (x2 < (len(parents[0].genotype))):
        param = idx
        while len(genotype_child) != len(parent0.genotype):
            genotype_child.append(second_parent[idx])
            idx += 1
    child.genotype = genotype_child
    child.fitness = Population.evaluation(rooms, genotype_child, price)
    return child


# Mutacja (inwersja)
def mutation(child, rooms, price):
    # wylosowanie elementów, które mają być zamienione
    x1 = random.randint(0, len(child.genotype) - 1)
    x2 = random.randint(0, len(child.genotype) - 1)

    if x1 == x2:
        while x1 == x2:
            x2 = random.randint(0, len(child.genotype) - 1)

    # podmiana elementow
    child.genotype[x1], child.genotype[x2] = child.genotype[x2], child.genotype[x1]
    child.fitness = Population.evaluation(rooms, child.genotype, price)
    return child


class Individual:
    def __init__(self, genotype, fitness):
        self.genotype = genotype
        self.fitness = fitness

    def __lt__(self, other):
        return self.fitness < other.fitness

    def print(self):
        print("genotype: ", self.genotype)
        print("fitness: ", self.fitness)

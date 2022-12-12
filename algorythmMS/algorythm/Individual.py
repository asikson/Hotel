class Individual:
    def __init__(self, genotype, fitness):
        self.genotype = genotype
        self.fitness = fitness

    def __lt__(self, other):
        return self.fitness < other.fitness

    def get(self):
        return self.genotype

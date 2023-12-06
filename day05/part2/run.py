import sys

file_path = '../input.txt'

class Mapping:
    def __init__(self, dest, source, range):
        self.sourceStart = source
        self.sourceEnd = source + range
        self.destStart = dest
        self.destEnd = dest + range
        self.range = range
        self.delta = dest - source

    def SourceToDest(self, value):
        return value - self.delta

class Seed:
    def __init__(self, start, range):
        self.start = start
        self.end = start + range
    
# Read input file
with open(file_path, 'r') as file:
    lines = file.readlines()

lineCount = len(lines)

# Extracts mappings from input lines
def ReadMappings(index, lines):
    index += 1
    mappings = []
    while index < lineCount:
        values = lines[index].split()
        if len(values) == 0:
            return index, mappings
        
        mappings.append(Mapping(int(values[0]), int(values[1]), int(values[2])))
        index += 1
    return index, mappings

# Parse input
index = 0
while index < lineCount:
    line = lines[index]
    if line.startswith('seeds:'):
        seeds_line = line.split(': ')[1].split()
        seeds = []
        i = 0
        while i < len(seeds_line):
            seeds.append(Seed(int(seeds_line[i]), int(seeds_line[i+1])))
            i += 2
    elif line.startswith('seed-to-soil'):
        index, seed_soil = ReadMappings(index, lines)
    elif line.startswith('soil-to-fertilizer'):
        index, soil_fertilizer = ReadMappings(index, lines)
    elif line.startswith('fertilizer-to-water'):
        index, fertilizer_water = ReadMappings(index, lines)
    elif line.startswith('water-to-light'):
        index, water_light = ReadMappings(index, lines)
    elif line.startswith('light-to-temperature'):
        index, light_temperature = ReadMappings(index, lines)
    elif line.startswith('temperature-to-humidity'):
        index, temperature_humidity = ReadMappings(index, lines)
    elif line.startswith('humidity-to-location'):
        index, humidity_location = ReadMappings(index, lines)
    index += 1

for seed in seeds:
    print(seed.start, seed.end)

# Maps source to dest
def MapSourceToDest(value, mappings):
    for mapping in mappings:
        if value >= mapping.destStart and value < mapping.destEnd:
            return mapping.SourceToDest(value)
    return value

# Map each seed to a location
max_int_value = sys.maxsize
for location in range(max_int_value + 1):
    humidity = MapSourceToDest(location, humidity_location)
    temperature = MapSourceToDest(humidity, temperature_humidity)
    light = MapSourceToDest(temperature, light_temperature)
    water = MapSourceToDest(light, water_light)
    fertilizer = MapSourceToDest(water, fertilizer_water)
    soil = MapSourceToDest(fertilizer, soil_fertilizer)
    seedValue = MapSourceToDest(soil, seed_soil)
    
    for seed in seeds:
        if(seedValue >= seed.start and seedValue < seed.end):
            print(location)
            sys.exit()
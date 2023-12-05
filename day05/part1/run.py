import sys

file_path = '../input.txt'

class Mapping:
    def __init__(self, dest, source, range):
        self.sourceStart = source
        self.sourceEnd = source + range
        self.dest = dest
        self.range = range
        self.delta = dest - source

    def SourceToDest(self, value):
        return value + self.delta

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
        seeds = [int(seed) for seed in line.split(': ')[1].split()]
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

# Maps source to dest
def MapSourceToDest(value, mappings):
    for mapping in mappings:
        if value >= mapping.sourceStart and value < mapping.sourceEnd:
            return mapping.SourceToDest(value)
    return value

# Map each seed to a location
minLocation = sys.maxsize
for seed in seeds:
    soil = MapSourceToDest(seed, seed_soil)
    fertilizer = MapSourceToDest(soil, soil_fertilizer)
    water = MapSourceToDest(fertilizer, fertilizer_water)
    light = MapSourceToDest(water, water_light)
    temperature = MapSourceToDest(light, light_temperature)
    humidity = MapSourceToDest(temperature, temperature_humidity)
    location = MapSourceToDest(humidity, humidity_location)
    if(location < minLocation):
        minLocation = location

print(minLocation)
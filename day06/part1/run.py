import math

file_path = '../input.txt'

# Read input file
with open(file_path, 'r') as file:
    lines = file.readlines()

# Parse Time data
race_durations = [int(value) for value in lines[0].split()[1:]]

# Parse Distance data
race_records = [int(value) for value in lines[1].split()[1:]]

sum = 1
for i in range(0, len(race_durations)):
    duration = race_durations[i]
    record = race_records[i]
    a = -1
    b = duration
    c = -record
    discriminant = math.sqrt(b ** 2 - 4 * a * c)
    x1 = math.floor((duration + discriminant) / (2 * a)) 
    x2 = math.ceil((duration - discriminant) / (2 * a)) - 1
    sum *= abs(x2 - x1)

print(sum)

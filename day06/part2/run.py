import math

file_path = '../input.txt'

# Read input file
with open(file_path, 'r') as file:
    lines = file.readlines()

# Parse Time data
duration = int(lines[0].replace(" ", "").split(":")[1])

# Parse Distance data
record = int(lines[1].replace(" ", "").split(":")[1])

a = -1
b = duration
c = -record
discriminant = math.sqrt(b ** 2 - 4 * a * c)
x1 = math.floor((duration + discriminant) / (2 * a)) 
x2 = math.ceil((duration - discriminant) / (2 * a)) - 1

print(abs(x2 - x1))

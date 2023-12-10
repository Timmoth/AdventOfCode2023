file_path = '../input.txt'

class Node:
    def __init__(self, id, left, right):
        self.id = id
        self.left = left
        self.right = right

# Read input file
with open(file_path, 'r') as file:
    lines = file.readlines()

def IsZeros(arr):
    for element in arr:
        if element != 0:
            return False
    return True

def PredictNextValue(values):
    if(IsZeros(values)):
        values.append(0)
        return values
    
    nextLine = []
    for i in range(len(values) - 1):
        newValue = values[i + 1] - values[i]
        nextLine.append(newValue)
    
    nextLine = PredictNextValue(nextLine)
    values.append(values[-1] + nextLine[-1])
    return values


sum = 0
for line in lines:
    values = PredictNextValue(list(map(int, line.split())))
    sum += values[-1]
    
print(sum)
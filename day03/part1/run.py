import re

file_path = '../input.txt'

class Number:
    def __init__(self, rowStart, rowEnd, value):
        self.rowStart = rowStart
        self.rowEnd = rowEnd
        self.value = value

numbers = []

symbols = []

# Read all input lines from file
with open(file_path, 'r') as file:
    lines = file.readlines()

# Parse all numbers and symbols for each input line
for line in lines:
    lineNumbers = []
    for match in re.finditer(r'\d+', line):
        lineNumbers.append(Number(match.start()-1, match.end(), int(match.group(0))))
    numbers.append(lineNumbers)

    lineSymbols = []
    for match in re.finditer(r'[@*/&#%+=$-]', line):
        lineSymbols.append(match.start())
    symbols.append(lineSymbols)

# Count the number of lines in the file
lineCount = len(lines)
sum = 0

# Sum all the valid part numbers (those adjacent to a symbol) for each input line
for i in range(lineCount):
    # Get all the symbols adjacent to the current line
    prevLineSymbols = [] if i == 0 else symbols[i-1]
    curLineSymbols = symbols[i]
    nextLineSymbols = [] if i+1 >= lineCount else symbols[i+1]

    # Check which numbers have adjacent symbols for the current line
    for lineNumber in numbers[i]:
        if(
            any(index >= lineNumber.rowStart and index <= lineNumber.rowEnd for index in prevLineSymbols) 
           or any(index >= lineNumber.rowStart and index <= lineNumber.rowEnd for index in curLineSymbols) 
           or any(index >= lineNumber.rowStart and index <= lineNumber.rowEnd for index in nextLineSymbols)
           ):
            sum += lineNumber.value

print(sum)
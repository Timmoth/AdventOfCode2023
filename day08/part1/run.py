import math

file_path = '../input.txt'

class Node:
    def __init__(self, id, left, right):
        self.id = id
        self.left = left
        self.right = right

# Read input file
with open(file_path, 'r') as file:
    lines = file.readlines()

instructions = lines[0].replace("\n", "")
nodes = {}
for line in lines[2:]:
    parts = line.split(' = ')
    linkedNodes = parts[1].split(", ")

    # Get the left node
    leftNodeId = linkedNodes[0].replace("(", "")
    leftNode = {}
    if(leftNodeId in nodes):
        leftNode = nodes[leftNodeId]
    else:
        leftNode = nodes[leftNodeId] = Node(leftNodeId, "", "")

    # Get the right node
    rightNodeId = linkedNodes[1].replace(")", "").replace("\n", "")
    rightNode = {}
    if(rightNodeId in nodes):
        rightNode = nodes[rightNodeId]
    else:
        rightNode = nodes[rightNodeId] = Node(rightNodeId, "", "")
    
    # Get the current node
    id = parts[0]
    currentNode = {}
    if(id in nodes):
        currentNode = nodes[id]
    else:
        currentNode = nodes[id] = Node(id, "", "")

    # Set the nodes left / right links
    currentNode.left = leftNode
    currentNode.right = rightNode


count = 0
instructionIndex = 0
currentNode = nodes["AAA"]
endNode = nodes["ZZZ"]
# Walk the network until we find the end node
while currentNode != endNode:
    instruction = instructions[instructionIndex]
    if(instruction == "L"):
        currentNode = currentNode.left
    else:
        currentNode = currentNode.right

    instructionIndex = (instructionIndex + 1) % len(instructions)
    count += 1

print(count)

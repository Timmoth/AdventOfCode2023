import math

file_path = '../input.txt'

from enum import Enum
class Rank(Enum):
    FiveOfAKind = 6
    FourOfAkind = 5
    FullHouse = 4
    ThreeOfAKind = 3
    TwoPair = 2
    OnePair = 1
    HighCard = 0

# Read input file
with open(file_path, 'r') as file:
    lines = file.readlines()

class Hand:
    def __init__(self, input, rank, bid):
        self.input = input
        self.rank = rank
        self.bid = bid

def get_hand(input):
    cards_input = input[0].replace('T', 'B').replace('J','1').replace('Q','D').replace('K','E').replace('A','F')
    bid = int(input[1])

    cards = {}
    maxCards = 0
    jokers = 0
    for c in cards_input:
        count = 0
        if(c == '1'):
            jokers += 1
            continue
        if c in cards:
            count = cards[c]
        count+=1
        cards[c] = count
        if count > maxCards:
            maxCards = count    

    maxCards += jokers
    return Hand(cards_input, get_rank(cards, maxCards), bid)

def get_rank(cards, maxCards):
    cardCount = len(cards)

    if(maxCards == 5):
        return Rank.FiveOfAKind
    if(maxCards == 4):
        return Rank.FourOfAkind
    if(maxCards == 3):
        if(cardCount == 2):
            return Rank.FullHouse
        return Rank.ThreeOfAKind
    if(cardCount == 3):
        return Rank.TwoPair
    if(cardCount == 4):
        return Rank.OnePair
    return Rank.HighCard

hands = []
for line in lines:
    hand = get_hand(line.split())
    hands.append(hand)

sorted_data = sorted(hands, key=lambda x: (x.rank.value, x.input), reverse=False)

rank = 0
sum = 0
for a in sorted_data:
    rank += 1
    sum += rank * a.bid
    print(rank, a.input)

print(sum)
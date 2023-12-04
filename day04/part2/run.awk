BEGIN {sum = 0}
{
# Split the line into sets
split($0,sets,"|")
split(sets[1],set1)
split(sets[2],set2)

# Count matching elements
matches = 0
for (e1 in set1) {
    element = set1[e1]
    for (e2 in set2) {
        if (set2[e2] == element){
            matches += 1
        }   
    }
}

# Get number of copies for current card
if (!(cardCopies[NR])) {
    # Initialise original copy
    copies = cardCopies[NR] = 1 
}else{
    copies = cardCopies[NR]
}

# Add number of copies to the sum
sum += copies

# Copy the next n cards as many times as the current card has been copied
for (i = 1; i <= matches; i++) {
    if (!(cardCopies[NR + i])) {
        # Initialise original copy
        cardCopies[NR + i] = 1
    }

    # Add the copies
    cardCopies[NR + i] += copies
}

}
END {print sum}

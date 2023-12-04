BEGIN {sum = 0}
{

# Split the line into sets
split($0,sets,"|")
split(sets[1],set1)
split(sets[2],set2)

# Check how many matches exist for this card
matches = 0
for (e1 in set1) {
    element = set1[e1]
    for (e2 in set2) {
        if (set2[e2] == element){
            if(matches == 0){
                matches = 1
            }else{
                matches *= 2
            }
        }   
    }
}

# Add the number of matches to the sum
sum += matches
}
END {print sum}

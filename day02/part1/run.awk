BEGIN {
    maxCubeCount["red"] = 12
    maxCubeCount["green"] = 13
    maxCubeCount["blue"] = 14
    sum = 0
}

{

# Split the line into sets
split($0,sets,";")

# Check each set is valid
for(i=1; i <= length(sets); i++){

    # Split the set into individual cube counts
	split(sets[i], cubeCount, ",")

    # Check each cube count is valid
    for(j=1; j <= length(cubeCount); j++){
        # Split cube count string into value and colour
        split(cubeCount[j], splitCubeCount, " ")
        if(splitCubeCount[1] > maxCubeCount[splitCubeCount[2]]){
            next; # Skip, This line is invalid!
        }
    }
}

sum += NR

}
END {print sum}

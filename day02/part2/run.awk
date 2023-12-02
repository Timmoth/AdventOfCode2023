BEGIN {
    sum = 0
}

{

# Split the line into sets
split($0,sets,";")

# Keep track of the minimum number of cubes used in the set
minCubeCount["red"] = 0
minCubeCount["green"] = 0
minCubeCount["blue"] = 0

for(i=1; i <= length(sets); i++){

    # Split the set into individual cube counts
	split(sets[i], cubeCount, ",")

    for(j=1; j <= length(cubeCount); j++){
        # Split cube count string into value and colour
        split(cubeCount[j], splitCubeCount, " ")

        # Update minCubeCount
        currentMinCubeCount = minCubeCount[splitCubeCount[2]]
        currentCubeCount = splitCubeCount[1]
        if(currentMinCubeCount == 0 || currentCubeCount > currentMinCubeCount){
            minCubeCount[splitCubeCount[2]] = currentCubeCount
        }
    }
}

sum += minCubeCount["red"] * minCubeCount["green"] * minCubeCount["blue"]

}
END {print sum}

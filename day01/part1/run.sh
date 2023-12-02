cat ../input.txt | tr -d [a-z] | sed 's/\([0-9]\)/\1 /g' | awk '{ sum += $1$NF } END { print sum }'

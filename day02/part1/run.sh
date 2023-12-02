cat ../input.txt | cut -d ':' -f2- | awk -f run.awk

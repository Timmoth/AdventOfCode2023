import * as fs from "fs";
const lines = fs
  .readFileSync("../input.txt", {
    encoding: "utf8",
  })
  .split("\n")
  .map((line) => line.split(""));

var sum = 0;
// Iterate over all columns
for (var j = 0; j < lines[0].length; j++) {
  // Iterate over each value in the selected column
  for (var i = 0; i < lines.length; i++) {
    if (lines[i][j] != "O") {
      // Only rounded rocks 'O' can fall
      continue;
    }

    var position = i - 1;
    // Check if next position is empty space
    while (position >= 0 && lines[position][j] == ".") {
      // Check the next position up
      position--;
    }

    if (position < i - 1) {
      // Move rock down
      lines[position + 1][j] = "O";
      lines[i][j] = ".";
    }

    sum += lines.length - (position + 1);
  }
}

for (var i = 0; i < lines.length; i++) {
  console.log(lines[i].join(" "));
}
console.log(sum);

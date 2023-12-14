import * as fs from "fs";
const lines = fs
  .readFileSync("../input.txt", {
    encoding: "utf8",
  })
  .split("\n")
  .map((line) => line.split(""));

function TiltNorth() {
  for (var j = 0; j < lines[0].length; j++) {
    for (var i = 0; i < lines.length; i++) {
      if (lines[i][j] != "O") {
        continue;
      }

      var position = i - 1;
      while (position >= 0 && lines[position][j] == ".") {
        position--;
      }

      if (position < i - 1) {
        lines[position + 1][j] = "O";
        lines[i][j] = ".";
      }
    }
  }
}

function TiltSouth() {
  for (var j = 0; j < lines[0].length; j++) {
    for (var i = lines.length - 1; i >= 0; i--) {
      if (lines[i][j] != "O") {
        continue;
      }

      var position = i + 1;
      while (position < lines.length && lines[position][j] == ".") {
        position++;
      }

      if (position > i + 1) {
        lines[position - 1][j] = "O";
        lines[i][j] = ".";
      }
    }
  }
}

function TiltWest() {
  for (var i = 0; i < lines.length; i++) {
    for (var j = 0; j < lines[0].length; j++) {
      if (lines[i][j] != "O") {
        continue;
      }

      var position = j - 1;
      while (position >= 0 && lines[i][position] == ".") {
        position--;
      }

      if (position < j - 1) {
        lines[i][position + 1] = "O";
        lines[i][j] = ".";
      }
    }
  }
}

function TiltEast() {
  for (var i = 0; i < lines.length; i++) {
    for (var j = lines[0].length - 1; j >= 0; j--) {
      if (lines[i][j] != "O") {
        continue;
      }

      var position = j + 1;
      while (position < lines[0].length && lines[i][position] == ".") {
        position++;
      }

      if (position > j + 1) {
        lines[i][position - 1] = "O";
        lines[i][j] = ".";
      }
    }
  }
}

const seenArrangements: { [key: string]: number } = {};
function valueExistsInObject(value: string): boolean {
  return Object.keys(seenArrangements).includes(value);
}

function Cycle() {
  TiltNorth();
  TiltWest();
  TiltSouth();
  TiltEast();
}

var state = lines
  .map((subArray) => subArray.join(" ")) // Join each sub-array into a string
  .join(" "); // Join the resulting strings into a single string

var index = 0;
var totalCycles = 1000000000;
while (!valueExistsInObject(state) && index < totalCycles) {
  seenArrangements[state] = index;
  index++;
  Cycle();
  state = lines
    .map((subArray) => subArray.join(" ")) // Join each sub-array into a string
    .join(" "); // Join the resulting strings into a single string
}

var cycleStart = seenArrangements[state];
var cycleEnd = index;
var remainingCycles = (totalCycles - cycleStart) % (cycleEnd - cycleStart);

console.log("cycle found: " + cycleStart + ":" + cycleEnd);
console.log("remaining cycles: " + remainingCycles);

for (var i = 0; i < remainingCycles; i++) {
  Cycle();
}

var sum = 0;

for (var j = 0; j < lines[0].length; j++) {
  for (var i = 0; i < lines.length; i++) {
    if (lines[i][j] != "O") {
      continue;
    }

    sum += lines.length - i;
  }
}

console.log("sum: " + sum);

import * as fs from "fs";
const lines = fs
  .readFileSync("../input.txt", {
    encoding: "utf8",
  })
  .split(",");

function generateHash(label: string): number {
  var currentValue = 0;
  for (var j = 0; j < label.length; j++) {
    currentValue += label.charCodeAt(j);
    currentValue *= 17;
    currentValue %= 256;
  }
  return currentValue;
}

var boxes: string[][] = [];
const labelBoxMap: { [key: string]: number } = {};

for (var i = 0; i < 256; i++) {
  boxes[i] = [];
}

for (var i = 0; i < lines.length; i++) {
  if (lines[i].indexOf("=") > 0) {
    var parts = lines[i].split("=");
    var label = parts[0];
    var boxIndex = generateHash(label);
    var focalLength = Number.parseInt(parts[1]);
    var tag = label + " " + focalLength;
    var box = boxes[boxIndex];
    var existingElementIndex = box.findIndex((l) => l.startsWith(label));
    if (existingElementIndex >= 0) {
      box[existingElementIndex] = tag;
    } else {
      box.push(tag);
    }
    labelBoxMap[label] = boxIndex;
  } else {
    var parts = lines[i].split("-");
    var label = parts[0];
    var boxIndex = generateHash(label);

    if (labelBoxMap.hasOwnProperty(label)) {
      boxes[boxIndex] = boxes[boxIndex].filter((str) => !str.startsWith(label));
    }
  }
}

var sum = 0;
for (var i = 0; i < 256; i++) {
  var box = boxes[i];
  for (var j = 0; j < box.length; j++) {
    var focalLength = Number.parseInt(box[j].split(" ")[1]);
    var focusingPower = (1 + i) * (j + 1) * focalLength;
    sum += focusingPower;
  }
}

console.log(sum);

import * as fs from "fs";
const lines = fs
  .readFileSync("../input.txt", {
    encoding: "utf8",
  })
  .split(",");

var sum = 0;
for (var i = 0; i < lines.length; i++) {
  var currentValue = 0;
  for (var j = 0; j < lines[i].length; j++) {
    currentValue += lines[i].charCodeAt(j);
    currentValue *= 17;
    currentValue %= 256;
  }
  sum += currentValue;
}

console.log(sum);

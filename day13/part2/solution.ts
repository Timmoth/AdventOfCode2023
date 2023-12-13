import * as fs from "fs";
const patternInputs = fs
  .readFileSync("../input.txt", {
    encoding: "utf8",
  })
  .replace(/\./g, "0")
  .replace(/#/g, "1")
  .split(/\ns*\n/);

function transposeArray(arr: string[]): string[] {
  return arr[0]
    .split("")
    .map((_, colIndex) => arr.map((row) => row[colIndex]))
    .map((row) => row.join(""));
}

var sum = 0;
for (const patternInput of patternInputs) {
  const lines = patternInput.split("\n");
  const rowNumbers = lines.map((line) => parseInt(line, 2));
  const colNumbers = transposeArray(lines).map((line) => parseInt(line, 2));

  var rowSymmetryIndex = findPartialSymmetry(rowNumbers);
  if (rowSymmetryIndex >= 0) {
    sum += 100 * rowSymmetryIndex;
  } else {
    var colSymmetryIndex = findPartialSymmetry(colNumbers);
    sum += colSymmetryIndex;
  }
}
console.log(sum);

function isPowerOfTwo(num: number): boolean {
  return num > 0 && (num & (num - 1)) === 0;
}

function findPartialSymmetry(arr: number[]): number {
  for (var i = 0; i < arr.length - 1; i++) {
    var left = i;
    var right = i + 1;
    var foundMirror = true;
    var hasSmudge = false;
    while (left >= 0 && right < arr.length) {
      if (arr[left] != arr[right]) {
        var mask = arr[left] ^ arr[right];
        var isOneOff = isPowerOfTwo(mask) && mask > 0;
        if (hasSmudge) {
          foundMirror = false;
          break;
        }

        if (!isOneOff) {
          foundMirror = false;
          break;
        }
        hasSmudge = true;
      }

      left--;
      right++;
    }

    if (foundMirror && hasSmudge) {
      return i + 1;
    }
  }
  return -1;
}

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

  var rowSymmetryIndex = findPointOfSymmetry(rowNumbers);
  if (rowSymmetryIndex >= 0) {
    sum += 100 * rowSymmetryIndex;
  } else {
    var colSymmetryIndex = findPointOfSymmetry(colNumbers);
    sum += colSymmetryIndex;
  }
}
console.log(sum);

function isPowerOfTwo(num: number): boolean {
  return num > 0 && (num & (num - 1)) === 0;
}

function findPointOfSymmetry(arr: number[]): number {
  for (var i = 0; i < arr.length - 1; i++) {
    var left = i;
    var right = i + 1;
    var foundMirror = true;
    var hasSmudge = false;
    while (left >= 0 && right < arr.length) {
      // Check if the comparison is not an exact match
      if (arr[left] != arr[right]) {
        // Check if the two elements differ by exactly one character
        var mask = arr[left] ^ arr[right];
        var isOneOff = isPowerOfTwo(mask);
        if (hasSmudge) {
          // Already registered one smudge, try the next point of symmetry
          foundMirror = false;
          break;
        }

        if (!isOneOff) {
          // Elements differ by more then one character, try the next point of symmetry
          foundMirror = false;
          break;
        }

        // Elements differ by exactly one character, log the smudge and move on to the next comparison
        hasSmudge = true;
      }

      // Move pointers to the next comparison
      left--;
      right++;
    }

    // Only find points of symmetry with exactly one comparison with a single character difference
    if (foundMirror && hasSmudge) {
      return i + 1;
    }
  }
  return -1;
}

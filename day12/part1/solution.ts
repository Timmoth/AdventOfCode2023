import * as fs from "fs";
const lines = fs
  .readFileSync("../input.txt", {
    encoding: "utf8",
  })
  .trim()
  .split("\n");

function getArrangements(
  conditions: string,
  conditionIndex: number,
  damagedSpringsBlocks: number[],
  damagedSpringBlockIndex: number,
  damagedSpringBlockLength: number
): number {
  var desiredBlockLength = damagedSpringsBlocks[damagedSpringBlockIndex];
  if (conditionIndex >= conditions.length) {
    // Reached the end of the configuration

    if (damagedSpringBlockIndex < damagedSpringsBlocks.length - 1) {
      // Invalid configuration, Not all blocks filled.
      return 0;
    }

    if (
      damagedSpringBlockIndex == damagedSpringsBlocks.length - 1 &&
      damagedSpringBlockLength < desiredBlockLength
    ) {
      // Invalid configuration, Incomplete block.
      return 0;
    }
    // Valid configuration, All blocks filled.
    return 1;
  }

  var currentCondition = conditions[conditionIndex];

  if (currentCondition == ".") {
    // Spring is OK

    if (
      damagedSpringBlockLength > 0 &&
      damagedSpringBlockLength < desiredBlockLength
    ) {
      // Invalid configuration, Incomplete block.
      return 0;
    }

    if (
      damagedSpringBlockLength > 0 &&
      damagedSpringBlockIndex < damagedSpringsBlocks.length
    ) {
      // Move on to next block.
      damagedSpringBlockIndex++;
    }

    return getArrangements(
      conditions,
      conditionIndex + 1,
      damagedSpringsBlocks,
      damagedSpringBlockIndex,
      0
    );
  } else if (currentCondition == "#") {
    // Spring is damaged add one to block

    if (
      damagedSpringBlockLength >= desiredBlockLength ||
      desiredBlockLength == undefined
    ) {
      // Invalid configuration, block is already full.
      return 0;
    }

    return getArrangements(
      conditions,
      conditionIndex + 1,
      damagedSpringsBlocks,
      damagedSpringBlockIndex,
      damagedSpringBlockLength + 1
    );
  }

  var arrangements = 0;

  if (damagedSpringBlockLength < desiredBlockLength) {
    // Try to add a damaged spring to block
    arrangements += getArrangements(
      conditions.substring(0, conditionIndex) +
        "#" +
        conditions.substring(conditionIndex + 1),
      conditionIndex + 1,
      damagedSpringsBlocks,
      damagedSpringBlockIndex,
      damagedSpringBlockLength + 1
    );
  }

  // Ok spring
  if (
    damagedSpringBlockLength > 0 &&
    damagedSpringBlockLength < desiredBlockLength
  ) {
    // Invalid configuration, Incomplete block.
    return arrangements;
  }

  if (
    damagedSpringBlockLength == desiredBlockLength &&
    damagedSpringBlockIndex < damagedSpringsBlocks.length
  ) {
    // Move on to next block.
    damagedSpringBlockIndex++;
  }

  // Try to add an Ok spring
  arrangements += getArrangements(
    conditions.substring(0, conditionIndex) +
      "." +
      conditions.substring(conditionIndex + 1),
    conditionIndex + 1,
    damagedSpringsBlocks,
    damagedSpringBlockIndex,
    0
  );

  return arrangements;
}

var sum = 0;
for (const line of lines) {
  var lineParts = line.split(" ");
  var conditions = lineParts[0];
  var damagedSprings = lineParts[1]
    .split(",")
    .map((str: string) => Number(str));

  sum += getArrangements(conditions, 0, damagedSprings, 0, 0);
}

console.log(sum);

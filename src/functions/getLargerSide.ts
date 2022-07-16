/**
 * Given an array of numbers representing the numbers in a binary tree, find the side of the
 * binary tree that is larger. If the left side is larger, print "Left". If the right side is
 * larger, print "Right". Otherwise, print "". Special case: seeing the number -1 means empty
 * child, ignore that node in the tree.
 * Example:
 *   Input: [3, 10, 5, 8, -1, 9, 7]
 *   Tree representation:
 *            3
 *         10   5
 *        8    9 7
 *   Output: "Left"
 *   Explanation:
 *     Left tree -> 3 + 10 + 8 = 21
 *     Right tree -> 3 + 5 + 9 + 7 = 24
 *     Right tree is larger.
 */

export const getLargerSide = (array: number[]) => {
  if (array.length <= 1) {
    return 'array must be larger than 1';
  }

  let leftSum = array[0];
  let rightSum = array[0];

  for (let i = 1; i < array.length; i++) {
    const currentNum = array[i];

    if (currentNum === -1 || currentNum === 0) {
      continue;
    }

    // Use `i + 1` because index starts at 0, but log starts at 1.
    const log = Math.log2(i + 1);
    const roundedLog = Math.round(log);

    if (roundedLog === Math.floor(log)) {
      leftSum += currentNum;
    } else {
      rightSum += currentNum;
    }
  }

  if (leftSum === rightSum) {
    return 'Left and right are equal';
  }

  return leftSum > rightSum ? 'left' : 'right';
};

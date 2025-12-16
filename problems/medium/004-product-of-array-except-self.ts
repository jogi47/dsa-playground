/**
 * Product of Array Except Self
 * Difficulty: Medium
 *
 * Given an integer array nums, return an array answer such that answer[i]
 * is equal to the product of all the elements of nums except nums[i].
 *
 * The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 * You must write an algorithm that runs in O(n) time and without using the division operation.
 */

function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const result: number[] = new Array(n).fill(1);

  // Left pass: result[i] = product of all elements to the left of i
  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    result[i] = leftProduct;
    leftProduct *= nums[i];
  }

  // Right pass: multiply by product of all elements to the right of i
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return result;
}

// Test cases
console.log("Product of Array Except Self");
console.log("============================\n");

console.log("productExceptSelf([1,2,3,4]):", productExceptSelf([1, 2, 3, 4])); // [24,12,8,6]
console.log("productExceptSelf([-1,1,0,-3,3]):", productExceptSelf([-1, 1, 0, -3, 3])); // [0,0,9,0,0]
console.log("productExceptSelf([2,3]):", productExceptSelf([2, 3])); // [3,2]

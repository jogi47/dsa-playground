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
  // Initialize result array with 1s (neutral element for multiplication)
  const result: number[] = new Array(n).fill(1);

  // ========== PASS 1: LEFT TO RIGHT (Prefix Products) ==========
  // Goal: For each index i, store the product of all elements BEFORE it
  //
  // Example with nums = [1, 2, 3, 4]:
  //   i=0: result[0] = 1 (nothing to the left)
  //   i=1: result[1] = 1 (product of nums[0])
  //   i=2: result[2] = 1*2 = 2 (product of nums[0]*nums[1])
  //   i=3: result[3] = 1*2*3 = 6 (product of nums[0]*nums[1]*nums[2])
  // After pass 1: result = [1, 1, 2, 6]
  let leftProduct = 1; // Running product of elements seen so far
  for (let i = 0; i < n; i++) {
    result[i] = leftProduct; // Store product of all elements to the LEFT of i
    leftProduct *= nums[i]; // Include current element for next iteration
  }

  // ========== PASS 2: RIGHT TO LEFT (Suffix Products) ==========
  // Goal: Multiply each result[i] by the product of all elements AFTER it
  //
  // Continuing example with nums = [1, 2, 3, 4], result = [1, 1, 2, 6]:
  //   i=3: result[3] = 6 * 1 = 6 (nothing to the right)
  //   i=2: result[2] = 2 * 4 = 8 (multiply by nums[3])
  //   i=1: result[1] = 1 * 12 = 12 (multiply by nums[2]*nums[3])
  //   i=0: result[0] = 1 * 24 = 24 (multiply by nums[1]*nums[2]*nums[3])
  // Final result = [24, 12, 8, 6]
  //
  // Verification: 24 = 2*3*4, 12 = 1*3*4, 8 = 1*2*4, 6 = 1*2*3 ✓
  let rightProduct = 1; // Running product of elements seen from right
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct; // Multiply by product of all elements to the RIGHT of i
    rightProduct *= nums[i]; // Include current element for next iteration
  }

  // Why this works:
  // result[i] = (product of all left elements) × (product of all right elements)
  //           = product of all elements except nums[i]
  //
  // Time: O(n) - two passes through array
  // Space: O(1) - only using output array (not counting it as extra space per problem)
  return result;
}

// Test cases
console.log("Product of Array Except Self");
console.log("============================\n");

console.log("productExceptSelf([1,2,3,4]):", productExceptSelf([1, 2, 3, 4])); // [24,12,8,6]
console.log("productExceptSelf([-1,1,0,-3,3]):", productExceptSelf([-1, 1, 0, -3, 3])); // [0,0,9,0,0]
console.log("productExceptSelf([2,3]):", productExceptSelf([2, 3])); // [3,2]

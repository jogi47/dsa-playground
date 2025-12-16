/**
 * Top K Frequent Elements
 * Difficulty: Medium
 *
 * Given an integer array nums and an integer k, return the k most frequent elements.
 * You may return the answer in any order.
 */

function topKFrequent(nums: number[], k: number): number[] {
  // Step 1: Count frequency of each number
  // Example: [1,1,1,2,2,3] → Map { 1 → 3, 2 → 2, 3 → 1 }
  const freqMap = new Map<number, number>();

  for (const num of nums) {
    // If num exists, increment its count; otherwise start at 1
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // Step 2: Create buckets where index = frequency
  // Size is nums.length + 1 because max possible frequency is n
  // Example for [1,1,1,2,2,3]:
  //   buckets[1] = [3]  → 3 appears 1 time
  //   buckets[2] = [2]  → 2 appears 2 times
  //   buckets[3] = [1]  → 1 appears 3 times
  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);

  // Place each number into bucket matching its frequency
  for (const [num, freq] of freqMap) {
    buckets[freq].push(num);
  }

  // Step 3: Collect k most frequent elements
  // Start from highest frequency bucket and work down
  const result: number[] = [];

  // i starts at end (highest frequency) and decreases
  // Stop early once we have k elements
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    // Each bucket may contain multiple numbers with same frequency
    for (const num of buckets[i]) {
      result.push(num);
      if (result.length === k) break; // Got enough, stop early
    }
  }

  return result;
}

// Test cases
console.log("Top K Frequent Elements");
console.log("=======================\n");

console.log("topKFrequent([1,1,1,2,2,3], 2):", topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
console.log("topKFrequent([1], 1):", topKFrequent([1], 1)); // [1]
console.log("topKFrequent([1,2,2,3,3,3], 2):", topKFrequent([1, 2, 2, 3, 3, 3], 2)); // [3, 2]

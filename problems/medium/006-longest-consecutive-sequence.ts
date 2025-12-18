/**
 * Longest Consecutive Sequence
 * Difficulty: Medium
 *
 * Given an unsorted array of integers nums, return the length of the
 * longest consecutive elements sequence.
 *
 * You must write an algorithm that runs in O(n) time.
 */

function longestConsecutive(nums: number[]): number {
  // Set enables O(1) lookups and removes duplicates
  const numSet = new Set(nums);
  let longest = 0;

  for (const num of numSet) {
    // Key insight: only start from sequence beginnings (no left neighbor)
    // This ensures each sequence is counted exactly once -> O(n) total
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;

      // Extend right as long as consecutive numbers exist
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentStreak++;
      }

      longest = Math.max(longest, currentStreak);
    }
  }

  return longest;
}

// Test cases
console.log("Longest Consecutive Sequence");
console.log("============================\n");

console.log("longestConsecutive([100,4,200,1,3,2]):", longestConsecutive([100, 4, 200, 1, 3, 2])); // 4 (sequence: 1,2,3,4)
console.log("longestConsecutive([0,3,7,2,5,8,4,6,0,1]):", longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])); // 9 (sequence: 0-8)
console.log("longestConsecutive([]):", longestConsecutive([])); // 0
console.log("longestConsecutive([1]):", longestConsecutive([1])); // 1

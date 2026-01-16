/**
 * Combination Sum II (LeetCode #40)
 * Difficulty: Medium
 *
 * Given a collection of candidate numbers (candidates) and a target number
 * (target), find all unique combinations in candidates where the candidate
 * numbers sum to target.
 *
 * Each number in candidates may only be used once in the combination.
 *
 * Note: The solution set must not contain duplicate combinations.
 *
 * Example 1:
 * Input: candidates = [10,1,2,7,6,1,5], target = 8
 * Output: [[1,1,6],[1,2,5],[1,7],[2,6]]
 *
 * Example 2:
 * Input: candidates = [2,5,2,1,2], target = 5
 * Output: [[1,2,2],[5]]
 *
 * Constraints:
 * - 1 <= candidates.length <= 100
 * - 1 <= candidates[i] <= 50
 * - 1 <= target <= 30
 */

/**
 * Algorithm: Backtracking with Duplicate Handling
 *
 * Time Complexity: O(2^n) - In worst case, we explore all subsets
 * Space Complexity: O(n) - Recursion depth
 *
 * Key Differences from Combination Sum I:
 * 1. Each element can only be used ONCE -> move to i+1, not i
 * 2. Input may contain duplicates -> skip duplicates at same level
 *
 * Key Insight:
 * This combines the patterns from:
 * - Combination Sum (finding combinations that sum to target)
 * - Subsets II (handling duplicates by sorting and skipping)
 *
 * Example trace for candidates = [1,1,2,5,6,7,10], target = 8:
 * (after sorting)
 *
 * backtrack(0, [], 8):
 *   i=0, pick 1: backtrack(1, [1], 7)
 *     i=1, pick 1: backtrack(2, [1,1], 6)
 *       i=2, pick 2: remain=4, no valid continuation
 *       i=3, pick 5: remain=1, no valid continuation
 *       i=4, pick 6: backtrack(5, [1,1,6], 0) -> FOUND!
 *       ...
 *     i=2, pick 2: backtrack(3, [1,2], 5)
 *       i=3, pick 5: backtrack(4, [1,2,5], 0) -> FOUND!
 *       ...
 *     i=5, pick 7: backtrack(6, [1,7], 0) -> FOUND!
 *   i=1: SKIP (same as i=0, duplicate at same level)
 *   i=2, pick 2: backtrack(3, [2], 6)
 *     i=4, pick 6: backtrack(5, [2,6], 0) -> FOUND!
 *   ...
 */

function combinationSum2(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  const current: number[] = [];

  // Sort to enable duplicate skipping and early termination
  candidates.sort((a, b) => a - b);

  function backtrack(index: number, remaining: number): void {
    // Found a valid combination
    if (remaining === 0) {
      result.push([...current]);
      return;
    }

    for (let i = index; i < candidates.length; i++) {
      const candidate = candidates[i];

      // Early termination: remaining candidates are too large
      if (candidate > remaining) {
        break;
      }

      // Skip duplicates at the same recursion level
      // i > index ensures we don't skip the first occurrence
      if (i > index && candidates[i] === candidates[i - 1]) {
        continue;
      }

      // Include this candidate
      current.push(candidate);
      // Move to next index (each element used only once)
      backtrack(i + 1, remaining - candidate);
      // Backtrack
      current.pop();
    }
  }

  backtrack(0, target);
  return result;
}

// Test cases
console.log(JSON.stringify(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)));
// Expected: [[1,1,6],[1,2,5],[1,7],[2,6]]

console.log(JSON.stringify(combinationSum2([2, 5, 2, 1, 2], 5)));
// Expected: [[1,2,2],[5]]

console.log(JSON.stringify(combinationSum2([1, 1, 1, 1, 1], 3)));
// Expected: [[1,1,1]]

console.log(JSON.stringify(combinationSum2([1], 1)));
// Expected: [[1]]

console.log(JSON.stringify(combinationSum2([1], 2)));
// Expected: []

export {};

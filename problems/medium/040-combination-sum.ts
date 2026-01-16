/**
 * Combination Sum (LeetCode #39)
 * Difficulty: Medium
 *
 * Given an array of distinct integers candidates and a target integer target,
 * return a list of all unique combinations of candidates where the chosen
 * numbers sum to target. You may return the combinations in any order.
 *
 * The same number may be chosen from candidates an unlimited number of times.
 * Two combinations are unique if the frequency of at least one of the chosen
 * numbers is different.
 *
 * Example 1:
 * Input: candidates = [2,3,6,7], target = 7
 * Output: [[2,2,3],[7]]
 * Explanation:
 * 2 and 3 are candidates, and 2 + 2 + 3 = 7.
 * 7 is a candidate, and 7 = 7.
 * These are the only two combinations.
 *
 * Example 2:
 * Input: candidates = [2,3,5], target = 8
 * Output: [[2,2,2,2],[2,3,3],[3,5]]
 *
 * Example 3:
 * Input: candidates = [2], target = 1
 * Output: []
 *
 * Constraints:
 * - 1 <= candidates.length <= 30
 * - 2 <= candidates[i] <= 40
 * - All elements of candidates are distinct
 * - 1 <= target <= 40
 */

/**
 * Algorithm: Backtracking with Unlimited Reuse
 *
 * Time Complexity: O(n^(t/m)) where t = target, m = minimum candidate
 *                  In worst case, we branch n ways at each level, depth = t/m
 * Space Complexity: O(t/m) - Maximum recursion depth
 *
 * Key Insight:
 * Unlike regular subsets where we move to next index after choosing,
 * here we can stay at the same index to reuse the same element.
 * We only move forward when we decide NOT to include more of current element.
 *
 * To avoid duplicates:
 * - We maintain an index and only consider candidates from index onwards
 * - This ensures [2,3] and [3,2] aren't both generated (only [2,3])
 *
 * Example trace for candidates = [2,3,6,7], target = 7:
 *
 * backtrack(0, [], 7):
 *   i=0, pick 2: backtrack(0, [2], 5)
 *     i=0, pick 2: backtrack(0, [2,2], 3)
 *       i=0, pick 2: backtrack(0, [2,2,2], 1)
 *         i=0, 2 > 1, skip
 *         i=1, 3 > 1, skip
 *         ...return
 *       i=1, pick 3: backtrack(1, [2,2,3], 0) -> FOUND! add [2,2,3]
 *       ...
 *   i=1, pick 3: ...
 *   i=2, pick 6: remain=1, no solution
 *   i=3, pick 7: backtrack(3, [7], 0) -> FOUND! add [7]
 */

function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  const current: number[] = [];

  function backtrack(index: number, remaining: number): void {
    // Found a valid combination
    if (remaining === 0) {
      result.push([...current]);
      return;
    }

    // Try each candidate from current index onwards
    for (let i = index; i < candidates.length; i++) {
      const candidate = candidates[i];

      // Skip if candidate is too large
      if (candidate > remaining) {
        continue;
      }

      // Include this candidate
      current.push(candidate);
      // Stay at same index (can reuse same element)
      backtrack(i, remaining - candidate);
      // Backtrack
      current.pop();
    }
  }

  backtrack(0, target);
  return result;
}

/**
 * Optimized version: Sort candidates first to enable early termination
 */
function combinationSumOptimized(
  candidates: number[],
  target: number
): number[][] {
  const result: number[][] = [];
  const current: number[] = [];

  // Sort for early termination
  candidates.sort((a, b) => a - b);

  function backtrack(index: number, remaining: number): void {
    if (remaining === 0) {
      result.push([...current]);
      return;
    }

    for (let i = index; i < candidates.length; i++) {
      const candidate = candidates[i];

      // Early termination: if current candidate > remaining,
      // all subsequent candidates will also be > remaining (sorted)
      if (candidate > remaining) {
        break;
      }

      current.push(candidate);
      backtrack(i, remaining - candidate);
      current.pop();
    }
  }

  backtrack(0, target);
  return result;
}

// Test cases
console.log(JSON.stringify(combinationSum([2, 3, 6, 7], 7)));
// Expected: [[2,2,3],[7]]

console.log(JSON.stringify(combinationSum([2, 3, 5], 8)));
// Expected: [[2,2,2,2],[2,3,3],[3,5]]

console.log(JSON.stringify(combinationSum([2], 1)));
// Expected: []

console.log(JSON.stringify(combinationSum([1], 1)));
// Expected: [[1]]

console.log(JSON.stringify(combinationSum([1], 2)));
// Expected: [[1,1]]

console.log("\nOptimized version:");
console.log(JSON.stringify(combinationSumOptimized([2, 3, 6, 7], 7)));
// Expected: [[2,2,3],[7]]

export {};

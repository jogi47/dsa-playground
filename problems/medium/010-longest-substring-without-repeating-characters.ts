/**
 * Longest Substring Without Repeating Characters
 *
 * Given a string s, find the length of the longest substring
 * without repeating characters.
 *
 * Example 1:
 * Input: s = "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with the length of 3.
 *
 * Example 2:
 * Input: s = "bbbbb"
 * Output: 1
 * Explanation: The answer is "b", with the length of 1.
 *
 * Example 3:
 * Input: s = "pwwkew"
 * Output: 3
 * Explanation: The answer is "wke", with the length of 3.
 * Note that "pwke" is a subsequence and not a substring.
 *
 * Constraints:
 * - 0 <= s.length <= 5 * 10^4
 * - s consists of English letters, digits, symbols and spaces.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(min(n, m)) where m is the size of the character set
 */

function lengthOfLongestSubstring(s: string): number {
  const charIndex = new Map<string, number>();
  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // If char exists in window, move left pointer past the duplicate
    if (charIndex.has(char) && charIndex.get(char)! >= left) {
      left = charIndex.get(char)! + 1;
    }

    charIndex.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

// Test cases
console.log("Longest Substring Without Repeating Characters");
console.log("===============================================");
console.log(lengthOfLongestSubstring("abcabcbb")); // Expected: 3
console.log(lengthOfLongestSubstring("bbbbb"));    // Expected: 1
console.log(lengthOfLongestSubstring("pwwkew"));   // Expected: 3
console.log(lengthOfLongestSubstring(""));         // Expected: 0
console.log(lengthOfLongestSubstring(" "));        // Expected: 1
console.log(lengthOfLongestSubstring("dvdf"));     // Expected: 3
console.log(lengthOfLongestSubstring("abba"));     // Expected: 2

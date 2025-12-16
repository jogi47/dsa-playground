/**
 * Group Anagrams
 * Difficulty: Medium
 *
 * Given an array of strings strs, group the anagrams together.
 * You can return the answer in any order.
 * An anagram is a word formed by rearranging the letters of another word,
 * using all the original letters exactly once.
 */

function groupAnagrams(strs: string[]): string[][] {
  // Map where key = sorted string, value = array of anagrams
  // Example: Map { "aet" → ["eat", "tea", "ate"], "ant" → ["tan", "nat"] }
  const map = new Map<string, string[]>();

  for (const str of strs) {
    // Key insight: All anagrams produce the same sorted string
    // "eat" → "aet", "tea" → "aet", "ate" → "aet"
    const sorted = str.split("").sort().join("");

    // Create empty array for this key if it doesn't exist
    if (!map.has(sorted)) {
      map.set(sorted, []);
    }

    // Add original string to its anagram group
    // The "!" tells TypeScript we know the key exists (we just created it above)
    map.get(sorted)!.push(str);
  }

  // Return just the grouped arrays, not the keys
  // Map { "aet" → ["eat","tea","ate"], "ant" → ["tan","nat"] }
  // becomes [["eat","tea","ate"], ["tan","nat"]]
  return Array.from(map.values());
}

// Test cases
console.log("Group Anagrams");
console.log("==============\n");

console.log("groupAnagrams(['eat','tea','tan','ate','nat','bat']):");
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [["eat","tea","ate"],["tan","nat"],["bat"]]

console.log("\ngroupAnagrams(['']):");
console.log(groupAnagrams([""]));
// [[""]]

console.log("\ngroupAnagrams(['a']):");
console.log(groupAnagrams(["a"]));
// [["a"]]

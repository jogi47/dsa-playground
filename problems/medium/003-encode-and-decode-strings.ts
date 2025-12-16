/**
 * Encode and Decode Strings
 * Difficulty: Medium
 *
 * Design an algorithm to encode a list of strings to a single string.
 * The encoded string is then decoded back to the original list of strings.
 *
 * Implement encode and decode methods.
 *
 * Strategy: Length-Prefix Encoding
 * --------------------------------
 * Format: "length#string"
 *
 * Why this works:
 * - By prefixing each string with its length, we always know exactly
 *   how many characters to read after the '#' delimiter
 * - This handles strings containing '#' or any special character
 *
 * Example: ["hello", "world"] → "5#hello5#world"
 *
 * Time Complexity: O(n) where n = total characters across all strings
 * Space Complexity: O(n) for the encoded/decoded result
 */

function encode(strs: string[]): string {
  let encoded = "";

  for (const str of strs) {
    // Append: length + "#" + actual string
    // Example: "hello" → "5#hello"
    encoded += str.length + "#" + str;
  }

  return encoded;

  // Trace for ["hello", "world"]:
  // ─────────────────────────────
  // Iteration 1: str = "hello" (length 5)
  //              encoded = "5#hello"
  //
  // Iteration 2: str = "world" (length 5)
  //              encoded = "5#hello5#world"
  //
  // Return: "5#hello5#world"
}

function decode(s: string): string[] {
  const result: string[] = [];
  let i = 0; // Current position in the encoded string

  while (i < s.length) {
    let j = i;

    // Step 1: Find the '#' delimiter
    // The characters from i to j are the length digits
    while (s[j] !== "#") {
      j++;
    }
    // Now j points to '#'

    // Step 2: Parse the length (characters between i and j)
    const length = parseInt(s.slice(i, j));

    // Step 3: Extract exactly 'length' characters after '#'
    // j+1 skips the '#', then we read 'length' characters
    const str = s.slice(j + 1, j + 1 + length);
    result.push(str);

    // Step 4: Move pointer to start of next encoded string
    i = j + 1 + length;
  }

  return result;

  // Trace for "5#hello5#world":
  // ───────────────────────────
  // Initial: i = 0, s = "5#hello5#world"
  //                      0123456789...
  //
  // --- Iteration 1 ---
  // j scans from 0: s[0]='5' ≠ '#', s[1]='#' = '#' → stop at j=1
  // length = parseInt(s.slice(0,1)) = parseInt("5") = 5
  // str = s.slice(2, 7) = "hello"
  // result = ["hello"]
  // i = 1 + 1 + 5 = 7
  //
  // --- Iteration 2 ---
  // j scans from 7: s[7]='5' ≠ '#', s[8]='#' = '#' → stop at j=8
  // length = parseInt(s.slice(7,8)) = parseInt("5") = 5
  // str = s.slice(9, 14) = "world"
  // result = ["hello", "world"]
  // i = 8 + 1 + 5 = 14
  //
  // i >= s.length (14 >= 14), exit loop
  // Return: ["hello", "world"]
}

// Test cases
console.log("Encode and Decode Strings");
console.log("=========================\n");

const test1 = ["hello", "world"];
console.log("Original:", test1);
console.log("Encoded:", encode(test1));
console.log("Decoded:", decode(encode(test1)));
// Output:
// Original: [ 'hello', 'world' ]
// Encoded: 5#hello5#world
// Decoded: [ 'hello', 'world' ]

const test2 = ["we", "say", ":", "yes"];
console.log("\nOriginal:", test2);
console.log("Encoded:", encode(test2));
console.log("Decoded:", decode(encode(test2)));
// Output:
// Original: [ 'we', 'say', ':', 'yes' ]
// Encoded: 2#we3#say1#:3#yes
// Decoded: [ 'we', 'say', ':', 'yes' ]

const test3 = [""];
console.log("\nOriginal:", test3);
console.log("Encoded:", encode(test3));
console.log("Decoded:", decode(encode(test3)));
// Output:
// Original: [ '' ]
// Encoded: 0#
// Decoded: [ '' ]

const test4: string[] = [];
console.log("\nOriginal:", test4);
console.log("Encoded:", encode(test4));
console.log("Decoded:", decode(encode(test4)));
// Output:
// Original: []
// Encoded:
// Decoded: []

// Edge case: string containing '#' character
const test5 = ["a#b", "c##d"];
console.log("\nOriginal:", test5);
console.log("Encoded:", encode(test5));
console.log("Decoded:", decode(encode(test5)));
// Output:
// Original: [ 'a#b', 'c##d' ]
// Encoded: 3#a#b4#c##d
// Decoded: [ 'a#b', 'c##d' ]
// Note: Works because we read exactly 3 chars after first '#' → "a#b"
//       and exactly 4 chars after second '#' → "c##d"

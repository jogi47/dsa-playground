/**
 * Valid Sudoku
 * Difficulty: Medium
 *
 * Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated
 * according to the following rules:
 * 1. Each row must contain the digits 1-9 without repetition.
 * 2. Each column must contain the digits 1-9 without repetition.
 * 3. Each of the nine 3 x 3 sub-boxes must contain the digits 1-9 without repetition.
 *
 * Note:
 * - A Sudoku board (partially filled) could be valid but is not necessarily solvable.
 * - Only the filled cells need to be validated according to the mentioned rules.
 */

function isValidSudoku(board: string[][]): boolean {
  // Create 9 Sets to track digits seen in each row (rows[0] = digits in row 0, etc.)
  const rows: Set<string>[] = Array.from({ length: 9 }, () => new Set());
  // Create 9 Sets to track digits seen in each column
  const cols: Set<string>[] = Array.from({ length: 9 }, () => new Set());
  // Create 9 Sets to track digits seen in each 3x3 box
  // Boxes are indexed 0-8 like this:
  //   0 | 1 | 2
  //   ---------
  //   3 | 4 | 5
  //   ---------
  //   6 | 7 | 8
  const boxes: Set<string>[] = Array.from({ length: 9 }, () => new Set());

  // Single pass through all cells in the 9x9 board
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];

      // Skip empty cells (represented by ".")
      if (val === ".") continue;

      // Calculate which 3x3 box this cell belongs to
      // Math.floor(r / 3) gives the box row (0, 1, or 2)
      // Math.floor(c / 3) gives the box column (0, 1, or 2)
      // Multiplying box row by 3 and adding box column gives index 0-8
      // Example: cell (4, 7) -> box row=1, box col=2 -> boxIndex = 1*3 + 2 = 5
      const boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);

      // If this digit already exists in the same row, column, or box -> invalid
      if (rows[r].has(val) || cols[c].has(val) || boxes[boxIndex].has(val)) {
        return false;
      }

      // Record this digit as seen in its row, column, and box
      rows[r].add(val);
      cols[c].add(val);
      boxes[boxIndex].add(val);
    }
  }

  // All cells checked without duplicates -> valid sudoku
  return true;
}

// Test cases
console.log("Valid Sudoku");
console.log("============\n");

const validBoard = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

console.log("Valid board:", isValidSudoku(validBoard)); // true

const invalidBoard = [
  ["8", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

console.log("Invalid board (duplicate 8 in column):", isValidSudoku(invalidBoard)); // false

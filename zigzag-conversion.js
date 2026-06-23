/**
 * DSA Q1: ZIGZAG CONVERSION
 * ==========================
 *
 * PROBLEM:
 * Given a string `s` and a number of rows `numRows`, write the characters
 * of `s` in a zigzag pattern across `numRows` rows, then read the result
 * row by row (left to right, top to bottom) to produce the output string.
 *
 * Example with s = "PAYPALISHIRING", numRows = 3:
 *
 *   P   A   H   N
 *   A P L S I I G
 *   Y   I   R
 *
 * Reading row by row: "PAHN" + "APLSIIG" + "YIR" = "PAHNAPLSIIGYIR"
 *
 *
 * APPROACH:
 * Instead of building a full 2D grid (which wastes space), we simulate
 * the zigzag movement directly:
 *
 *   1. Create one string "bucket" per row (numRows buckets total).
 *   2. Walk through the input string character by character.
 *   3. Track which row we're currently writing to, and whether we're
 *      moving DOWN (row increasing) or UP (row decreasing).
 *   4. Append each character to its row's bucket.
 *   5. Flip direction whenever we hit the top row (0) or the bottom
 *      row (numRows - 1).
 *   6. Concatenate all the row buckets together at the end.
 *
 * This is O(n) time and O(n) space, where n = s.length.
 *
 *
 * EDGE CASE:
 * If numRows is 1, there's no zigzag possible — the output is just
 * the original string. We handle this explicitly to avoid a divide-by-zero
 * style issue when bouncing between row 0 and row 0.
 */

function convert(s, numRows) {
  // Edge case: 1 row (or a string too short to zigzag) means no change.
  if (numRows === 1 || s.length <= numRows) {
    return s;
  }

  // One string bucket per row.
  var rows = [];
  for (var r = 0; r < numRows; r++) {
    rows.push("");
  }

  var currentRow = 0;
  var goingDown = false; // We flip this to true on the very first step down.

  for (var i = 0; i < s.length; i++) {
    rows[currentRow] += s[i];

    // Flip direction at the top or bottom row.
    if (currentRow === 0 || currentRow === numRows - 1) {
      goingDown = !goingDown;
    }

    currentRow += goingDown ? 1 : -1;
  }

  // Join all rows together to form the final zigzag-read string.
  return rows.join("");
}


// ------------------------------------------------------------
// TEST CASES
// ------------------------------------------------------------

function runTest(s, numRows, expected) {
  var result = convert(s, numRows);
  var pass = result === expected;
  console.log(
    (pass ? "PASS" : "FAIL") +
    " | input: \"" + s + "\", numRows: " + numRows +
    " | expected: \"" + expected + "\", got: \"" + result + "\""
  );
}

// Example 1 from the problem statement
runTest("PAYPALISHIRING", 3, "PAHNAPLSIIGYIR");

// Example commonly paired with this problem (4 rows)
runTest("PAYPALISHIRING", 4, "PINALSIGYAHRPI");

// Edge case: numRows = 1 (string unchanged)
runTest("HELLO", 1, "HELLO");

// Edge case: numRows >= string length (string unchanged)
runTest("AB", 5, "AB");

// Single character
runTest("A", 1, "A");

module.exports = { convert: convert };

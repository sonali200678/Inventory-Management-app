# ZigZag Conversion — Approach

## Problem

Given a string `s` and a number of rows `numRows`, write the characters of `s` in a zigzag pattern across `numRows` rows, then read the result row by row (left to right, top to bottom) to produce the output string.

**Example:**
Input: `s = "PAYPALISHIRING"`, `numRows = 3`

```
P   A   H   N
A P L S I I G
Y   I   R
```

Reading row by row gives: `"PAHNAPLSIIGYIR"`

## My Approach

Instead of building a full 2D grid to visually represent the zigzag (which wastes memory, since most grid cells would be empty), I simulated the zigzag movement directly using one string per row.

**Steps:**

1. Create an array of empty strings, one for each row (`numRows` of them). Each one acts as a "bucket" that collects the characters belonging to that row.
2. Walk through the input string one character at a time.
3. Keep track of:
   - `currentRow` — which row I'm currently placing a character into.
   - `goingDown` — a flag for which direction I'm moving (down through the rows, or back up).
4. Append each character to the bucket for `currentRow`.
5. Whenever I hit the **top row** (row 0) or the **bottom row** (`numRows - 1`), flip the direction. This recreates the zigzag bounce without needing to track diagonal positions explicitly.
6. After processing the whole string, join all the row buckets together in order — that's the final zigzag-read output.

## Edge Case Handled

If `numRows` is 1, or the string is shorter than/equal to `numRows`, there's no actual zigzag possible — the string just gets returned unchanged. I check for this upfront and return early, instead of letting the loop run and produce the same result the long way.

## Complexity

- **Time:** O(n), where n is the length of the string — each character is visited exactly once.
- **Space:** O(n) — the row buckets together hold every character of the original string exactly once.

## Why Not a 2D Grid?

A 2D grid approach (placing characters into a `numRows x numCols` matrix and reading column by column) also works, but it requires calculating column positions and allocating a grid that's mostly empty space. Tracking direction with a simple up/down flag avoids that overhead and is more direct to reason about — at every step, I know exactly where the next character goes.

## Test Cases Used

| Input | numRows | Expected Output |
|---|---|---|
| `PAYPALISHIRING` | 3 | `PAHNAPLSIIGYIR` |
| `PAYPALISHIRING` | 4 | `PINALSIGYAHRPI` |
| `HELLO` | 1 | `HELLO` |
| `AB` | 5 | `AB` |
| `A` | 1 | `A` |

All cases passed when run with Node.js (`node zigzag-conversion.js`).

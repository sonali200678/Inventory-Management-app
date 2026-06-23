# Dell Inventory Management System — My Approach

## What This Project Does

This is a small website that manages a list of Dell products. It lets a user:
- See all the products currently in stock
- Add a new product to the list
- Check if a specific product is in stock or not
- Remove a product from the list

## Files I Used

- `index.html` — the structure of the page (the boxes, buttons, and text you see)
- `style.css` — the styling (colors, spacing, fonts) to make it look clean
- `script.js` — the actual logic (this is where all the JavaScript happens)

All three files sit in the same folder, and `index.html` is the one I open in the browser to run everything.

## How I Approached It

### Step 1: Store the products in an array

I started with the core requirement — the product list had to be a JavaScript array, where each item is just a string (the product name).

```javascript
var inventory = [
  "Dell XPS 13",
  "Dell Inspiron 15",
  "Dell Latitude 7420",
  "Dell Alienware m18",
  "Dell OptiPlex 7090"
];
```

This array is the single "source of truth" — everything the page shows comes from this array.

### Step 2: Display the inventory on the screen

I wrote a function called `renderInventory()` that:
1. Clears whatever is currently shown on the page.
2. Loops through the `inventory` array from start to end.
3. For every product name in the array, creates a list item (`<li>`) and adds it to the page.
4. Also updates a small counter that shows how many items are in stock.

This function runs every time the array changes, so the page always matches the array.

### Step 3: Add a new product

I built a form with one text box and an "Add Product" button. When the button is clicked:
1. The page grabs whatever text the user typed in.
2. It checks the text isn't empty.
3. It checks the product isn't already in the list (so we don't get duplicates).
4. If everything's fine, it uses `inventory.push(name)` to add the new product to the end of the array.
5. It calls `renderInventory()` again so the new product shows up immediately.

### Step 4: Check if a product is in stock

I built a second form with its own text box and a "Check Stock" button. When clicked:
1. The page takes the text the user typed.
2. It loops through the `inventory` array, comparing each product name to what the user typed (ignoring uppercase/lowercase differences).
3. If a match is found, it shows a message like `"Dell XPS 13" is in stock.`
4. If no match is found after checking the whole array, it shows `"Product Name" is out of stock.`

### Step 5: Remove a product (extra feature)

Each product in the list has a "Remove" button next to it. Clicking it:
1. Finds the position (index) of that product in the array.
2. Uses `inventory.splice(index, 1)` to delete just that one item.
3. Calls `renderInventory()` again to update the screen.

This wasn't strictly required by the problem statement, but it made testing the "Display Inventory" requirement much easier, since I could add and remove items to see the list update live.

### Step 6: Connect everything with event listeners

Instead of using `onclick` directly in the HTML, I used `addEventListener` in the JavaScript file to "listen" for:
- The Add form being submitted
- The Check Stock form being submitted
- Any Remove button being clicked

This keeps all the logic inside `script.js`, separate from the HTML structure.

## How I Tested It

- Loaded the page and confirmed the 5 starting products show up correctly.
- Added a new product and confirmed it appeared in the list right away.
- Tried adding the same product twice and confirmed it blocked the duplicate.
- Searched for a product that exists and got the "in stock" message.
- Searched for a product that doesn't exist and got the "out of stock" message.
- Removed a product and confirmed it disappeared from the list and the counter updated.

## What I Learned

- How to use a JavaScript array as the main data storage for an app.
- How to add (`push`) and remove (`splice`) items from an array.
- How to loop through an array to search for something or display it.
- How to use `addEventListener` to react to button clicks and form submissions.
- How to connect HTML, CSS, and JavaScript together into one working page.

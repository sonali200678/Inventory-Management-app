// ============================================================
// Dell Inventory Management System
// Core Data Structure: JavaScript Array of product name strings
// ============================================================

// The inventory array - each element is a string representing a Dell product.
// This is the single source of truth for what's "in stock".
var inventory = [
  "Dell XPS 13",
  "Dell Inspiron 15",
  "Dell Latitude 7420",
  "Dell Alienware m18",
  "Dell OptiPlex 7090"
];

// Grab DOM elements once, reuse everywhere.
var addForm = document.getElementById("add-form");
var productNameInput = document.getElementById("product-name-input");
var addMessage = document.getElementById("add-message");

var checkForm = document.getElementById("check-form");
var checkNameInput = document.getElementById("check-name-input");
var checkMessage = document.getElementById("check-message");

var inventoryList = document.getElementById("inventory-list");
var emptyMessage = document.getElementById("empty-message");
var itemCount = document.getElementById("item-count");


// ------------------------------------------------------------
// Display Inventory
// Renders the current state of the `inventory` array to the DOM.
// Called every time the array changes (add/remove) so the UI
// always reflects the latest data.
// ------------------------------------------------------------
function renderInventory() {
  // Clear out whatever is currently displayed.
  inventoryList.innerHTML = "";

  // Update the item count badge.
  itemCount.textContent = inventory.length + (inventory.length === 1 ? " item" : " items");

  // Show/hide the "empty" message depending on array length.
  if (inventory.length === 0) {
    emptyMessage.style.display = "block";
    return;
  } else {
    emptyMessage.style.display = "none";
  }

  // Iterate over the array and build one <li> per product.
  for (var i = 0; i < inventory.length; i++) {
    var listItem = document.createElement("li");

    var nameSpan = document.createElement("span");
    nameSpan.className = "product-name";
    nameSpan.textContent = inventory[i];

    var removeBtn = document.createElement("button");
    removeBtn.className = "btn-remove";
    removeBtn.textContent = "Remove";
    removeBtn.setAttribute("data-index", i);
    removeBtn.addEventListener("click", handleRemoveClick);

    listItem.appendChild(nameSpan);
    listItem.appendChild(removeBtn);
    inventoryList.appendChild(listItem);
  }
}


// ------------------------------------------------------------
// Add Product (Create)
// Adds a new product name string to the end of the inventory array.
// ------------------------------------------------------------
function addProduct(productName) {
  // Trim whitespace so " Dell XPS 13 " and "Dell XPS 13" aren't treated differently.
  var trimmedName = productName.trim();

  if (trimmedName === "") {
    showMessage(addMessage, "Please enter a valid product name.", "error");
    return;
  }

  // Prevent duplicate entries (case-insensitive check).
  if (isProductInInventory(trimmedName)) {
    showMessage(addMessage, "\"" + trimmedName + "\" is already in the inventory.", "error");
    return;
  }

  inventory.push(trimmedName); // Array mutation: add to end
  showMessage(addMessage, "\"" + trimmedName + "\" was added to inventory.", "success");
  renderInventory();
}


// ------------------------------------------------------------
// Remove Product (Delete)
// Removes a product from the inventory array by its index.
// ------------------------------------------------------------
function removeProduct(index) {
  if (index < 0 || index >= inventory.length) {
    return; // Invalid index, do nothing.
  }

  var removedName = inventory[index];
  inventory.splice(index, 1); // Array mutation: remove 1 item at index
  showMessage(addMessage, "\"" + removedName + "\" was removed from inventory.", "success");
  renderInventory();
}


// ------------------------------------------------------------
// Check Availability (Read)
// Searches the inventory array for a matching product name
// and reports whether it is in stock.
// ------------------------------------------------------------
function checkAvailability(productName) {
  var trimmedName = productName.trim();

  if (trimmedName === "") {
    showMessage(checkMessage, "Please enter a product name to check.", "error");
    return;
  }

  if (isProductInInventory(trimmedName)) {
    showMessage(checkMessage, "\"" + trimmedName + "\" is in stock.", "success");
  } else {
    showMessage(checkMessage, "\"" + trimmedName + "\" is out of stock.", "error");
  }
}


// ------------------------------------------------------------
// Helper: case-insensitive search through the inventory array.
// Demonstrates iterating/searching an array without relying on
// higher-order array methods, to keep things simple and explicit.
// ------------------------------------------------------------
function isProductInInventory(productName) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].toLowerCase() === productName.toLowerCase()) {
      return true;
    }
  }
  return false;
}


// ------------------------------------------------------------
// Helper: show a status message with success/error styling.
// ------------------------------------------------------------
function showMessage(element, text, type) {
  element.textContent = text;
  element.className = "message " + type;
}


// ------------------------------------------------------------
// Event Handlers
// ------------------------------------------------------------

// Handle "Add Product" form submission.
function handleAddSubmit(event) {
  event.preventDefault(); // Stop the page from reloading
  addProduct(productNameInput.value);
  productNameInput.value = "";
  productNameInput.focus();
}

// Handle "Check Stock" form submission.
function handleCheckSubmit(event) {
  event.preventDefault();
  checkAvailability(checkNameInput.value);
}

// Handle clicking a "Remove" button on a specific list item.
function handleRemoveClick(event) {
  var index = parseInt(event.target.getAttribute("data-index"), 10);
  removeProduct(index);
}

// Wire up the event listeners.
addForm.addEventListener("submit", handleAddSubmit);
checkForm.addEventListener("submit", handleCheckSubmit);

// Initial render on page load, showing the starting inventory.
renderInventory();

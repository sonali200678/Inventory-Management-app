
var inventory = [
  "Dell XPS 13",
  "Dell Inspiron 15",
  "Dell Latitude 7420",
  "Dell Alienware m18",
  "Dell OptiPlex 7090"
];


var addForm = document.getElementById("add-form");
var productNameInput = document.getElementById("product-name-input");
var addMessage = document.getElementById("add-message");

var checkForm = document.getElementById("check-form");
var checkNameInput = document.getElementById("check-name-input");
var checkMessage = document.getElementById("check-message");

var inventoryList = document.getElementById("inventory-list");
var emptyMessage = document.getElementById("empty-message");
var itemCount = document.getElementById("item-count");



function renderInventory() {
  
  inventoryList.innerHTML = "";

  
  itemCount.textContent = inventory.length + (inventory.length === 1 ? " item" : " items");

  
  if (inventory.length === 0) {
    emptyMessage.style.display = "block";
    return;
  } else {
    emptyMessage.style.display = "none";
  }

  
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



function addProduct(productName) {
  
  var trimmedName = productName.trim();

  if (trimmedName === "") {
    showMessage(addMessage, "Please enter a valid product name.", "error");
    return;
  }

  
  if (isProductInInventory(trimmedName)) {
    showMessage(addMessage, "\"" + trimmedName + "\" is already in the inventory.", "error");
    return;
  }

  inventory.push(trimmedName); 
  showMessage(addMessage, "\"" + trimmedName + "\" was added to inventory.", "success");
  renderInventory();
}



function removeProduct(index) {
  if (index < 0 || index >= inventory.length) {
    return; 
  }

  var removedName = inventory[index];
  inventory.splice(index, 1); 
  showMessage(addMessage, "\"" + removedName + "\" was removed from inventory.", "success");
  renderInventory();
}



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



function isProductInInventory(productName) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].toLowerCase() === productName.toLowerCase()) {
      return true;
    }
  }
  return false;
}


function showMessage(element, text, type) {
  element.textContent = text;
  element.className = "message " + type;
}



function handleAddSubmit(event) {
  event.preventDefault(); // Stop the page from reloading
  addProduct(productNameInput.value);
  productNameInput.value = "";
  productNameInput.focus();
}


function handleCheckSubmit(event) {
  event.preventDefault();
  checkAvailability(checkNameInput.value);
}


function handleRemoveClick(event) {
  var index = parseInt(event.target.getAttribute("data-index"), 10);
  removeProduct(index);
}

addForm.addEventListener("submit", handleAddSubmit);
checkForm.addEventListener("submit", handleCheckSubmit);

// Initial render on page load, showing the starting inventory.
renderInventory();

const itemInput = document.getElementById('item-input');
const addItemButton = document.getElementById('add-item-button');
const shoppingList = document.getElementById('shopping-list');

// Array to store list items
const listItems = [];

// function to add an item
function addItem() {
    const itemText = itemInput.value.trim(); // Trim spaces from the input
    if(!itemText) {
        alert('Please enter an item');
        return;
    }
    const normalizedText = itemText.toLowerCase().replace(/\s+/g, ' '); // Normalize input

    // check for duplicates using .includes()
    if(listItems.some(item => item.toLowerCase().replace(/\s+/g, ' ') === normalizedText)) {
        alert('This item is already on the list!');
        return;
    }
    // Add the item to the list
    listItems.push(itemText);
    // Render the updated list and clear the input
    renderList();
    itemInput.value = '';
}

// Function to render the list
function renderList() {
    shoppingList.innerHTML = ''; //Clear the list
    listItems.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.style.marginTop = '10px'
        listItem.textContent = item;

        // Create edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.style.marginLeft = '10px';
        editButton.addEventListener('click', ()=> editItem(item));

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.addEventListener('click', () => deleteItem(item));

        // Append buttons to the list item
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        // Append the list item to the list
        shoppingList.appendChild(listItem);
    })
}

// Function to edit an item
function editItem(oldItem) {
    const newItem = prompt('Edit your item:', oldItem);
    if(newItem) {
        const normalizedOld = oldItem.toLowerCase().replace().replace(/\s+/g, ' ');
        const normalizedNew = newItem.trim().toLowerCase().replace(/\s+/g, ' ') ;
        if(listItems.some(item => item.toLowerCase().replace(/\s+/g, ' ') === normalizedNew) && normalizedNew !== normalizedOld) {
            alert('This item is already on the list!');
            return;
        }
        // Update the list
        const index = listItems.indexOf(oldItem);
        listItems[index] = newItem.trim();
        renderList();
    }
}

// Function to delete an item
function deleteItem(item) {
    const index = listItems.indexOf(item);
    if(index > -1) {
        listItems.splice(index, 1); // Remove the item
    }
    renderList();
}

// Add event listener for the 'Add Item' button
addItemButton.addEventListener('click', addItem);

// Allow adding items by pressing the Enter key
itemInput.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') {
        addItem();
    }
})
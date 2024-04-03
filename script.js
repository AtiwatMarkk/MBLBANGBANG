const itemTableContainer = document.getElementById('item-table-container');
const itemFilterInput = document.getElementById('item-filter');

function createTable(data) {
  // Create the table element
  const table = document.createElement('table');
  table.classList.add('item-table');

  // Create table header row
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `<th>Item Name</th><th>MLBB ITEM</th><th>ROV ITEM</th><th>Property</th><th>Category</th><th>Cost</th><th>Summary</th>`;
  table.appendChild(headerRow);

  // Loop through each item in the data (assuming data is an array)
  for (const item of data) {
    const itemData = item.data[0];  // Assuming the first element in "data" holds the actual item details

    // Create a table row for each item
    const itemRow = document.createElement('tr');
    
    // Create table cells for each item property
    itemRow.innerHTML = `
      <td>${item.item_name}</td>
      <td class="img"><img src="img/${item.icon}" alt="${item.item_name} Icon"></td>  
      <td class="img"><img src="img/${itemData.rov_item}" alt="${item.item_name} Icon"></td>  
      <td class="property">${itemData.property}</td>
      <td>${item.item_category}</td>
      <td>${itemData.cost}</td>
      <td>${itemData.summary}</td>
    `;
    
    table.appendChild(itemRow);
  }

  itemTableContainer.appendChild(table);
}

// Choose one of the following methods to load the JSON data (comment out the other):

// Method (a): Using Fetch API (more secure)
fetch('item.json')
  .then(response => response.json())
  .then(data => {
    createTable(data);  // Call the function to create the table after data is loaded
    filterItems(data);  // Call the filter function after table creation
  })
  .catch(error => console.error('Error loading JSON data:', error));

// Method (b): Using Script Tag (less secure)
// const itemsData = window.itemsData;  // Access the data loaded from item.json
// createTable(itemsData);  // Call the function to create the table
// filterItems(itemsData);  // Call the filter function after table creation

function filterItems(data) {
  itemFilterInput.addEventListener('keyup', () => {
    const filterValue = itemFilterInput.value.toLowerCase();
    const filteredData = data.filter(item => item.item_category.toLowerCase().includes(filterValue));
    clearTable();  // Clear existing table content before refilling
    createTable(filteredData);  // Recreate the table with filtered data
  });
}

function clearTable() {
  itemTableContainer.innerHTML = '';  // Remove existing table rows
}

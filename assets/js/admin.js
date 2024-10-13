// assets/js/admin.js
function showTab(tabName) {
   const tabs = document.querySelectorAll('.tab-content');
   const tabButtons = document.querySelectorAll('.tab-button');

   // Show the selected tab and hide others
   tabs.forEach(tab => {
       if (tab.id === tabName) {
           tab.style.display = 'block';
           if (tabName === 'sales-history') {
            displaySalesHistory(); // Display sales history when this tab is shown
        } // Show the selected tab
       } else {
           tab.style.display = 'none'; // Hide the other tabs
       }
   });

   // Set active class on the selected tab button
   tabButtons.forEach(button => {
       if (button.id === 'add_car_button' && tabName === 'add-car') {
           button.classList.add('active'); // Add active class if this is the active tab
       } else if (button.id === 'show_user_button' && tabName === 'view-users') {
           button.classList.add('active'); // Add active class if this is the active tab
       }else if (button.id === 'sales_history_button' && tabName === 'sales-history') {
         button.classList.add('active'); // Add active class if this is the active tab
     } else {
           button.classList.remove('active'); // Remove active class from the other buttons
       } 
   });
}

function displaySalesHistory() {
   const salesHistory = JSON.parse(localStorage.getItem('salesHistory')) || []; // Retrieve sales history from Local Storage
   const salesList = document.getElementById('sales-list');
   salesList.innerHTML = ''; // Clear existing sales

   salesHistory.forEach(sale => {
       const row = `
           <tr>
               <td>${sale.buyerName}</td>
               <td>${sale.buyerEmail}</td>
               <td>${sale.carId}</td>
               <td>${new Date(sale.date).toLocaleString()}</td> <!-- Format date nicely -->
           </tr>
       `;
       salesList.innerHTML += row; // Append each sale to the table
   });
}

// Function to add a new car
function addCar(event) {
   event.preventDefault(); // Prevent form submission

   const make = document.getElementById('car-make').value;
   const model = document.getElementById('car-model').value;
   const price = parseFloat(document.getElementById('car-price').value);
   const year = parseInt(document.getElementById('car-year').value);
   const imageFile = document.getElementById('car-image').files[0];

   // Create a FileReader to convert the image to Base64
   const reader = new FileReader();
   reader.onloadend = function() {
       const newCar = { make, model, price, year, image: reader.result }; // Use Base64 string

       // Check current storage size
       const currentData = JSON.parse(localStorage.getItem('cars')) || [];
       const currentSize = new Blob([JSON.stringify(currentData)]).size; // Size in bytes
       const newCarSize = new Blob([JSON.stringify(newCar)]).size; // Size of new car in bytes
       const totalSize = currentSize + newCarSize;

       // Debugging log
       console.log(`Current Size: ${currentSize} bytes, New Car Size: ${newCarSize} bytes, Total Size: ${totalSize} bytes`);

       // Retrieve existing cars from Local Storage or initialize an empty array
       const cars = JSON.parse(localStorage.getItem('cars')) || [];

       // Add new car to the array and save it back to Local Storage
       cars.push(newCar);
       try {
           localStorage.setItem('cars', JSON.stringify(cars)); // Try to save to Local Storage
           alert('Car added successfully!');
           window.location.href = 'listings.html'; // Redirect to listings page
       } catch (e) {
           if (e.name === 'QuotaExceededError') {
               alert('Local Storage limit reached. Please clear some data.');
           } else {
               console.error('Error saving to Local Storage:', e);
           }
       }
   };
   
   // Read the image file as a Data URL (Base64)
   reader.readAsDataURL(imageFile);
}

// Attach event listener for the add car form
document.getElementById('add-car-form').addEventListener('submit', addCar);

// Function to display registered users
function displayUsers() {
   const users = JSON.parse(localStorage.getItem('users')) || []; // Retrieve users from Local Storage
   const usersList = document.getElementById('users-list');
   usersList.innerHTML = ''; // Clear existing users

   users.forEach(user => {
       const row = `
           <tr>
               <td>${user.username}</td>
               <td>${user.email}</td>
               <td>${user.role}</td>
           </tr>
       `;
       usersList.innerHTML += row; // Append each user to the table
   });
}

// Call this function to display users when the second tab is shown
showTab('add-car'); // Show add car tab by default
document.querySelector('.tab-button:nth-child(2)').addEventListener('click', displayUsers);
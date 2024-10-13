// assets/js/details.js

// Function to get car details from URL parameters
function getCarDetails() {
   const params = new URLSearchParams(window.location.search);
   const carId = params.get('id'); // Get the 'id' parameter from the URL

   // Retrieve existing cars from Local Storage
   const cars = JSON.parse(localStorage.getItem('cars')) || [];
   
   // Find the specific car based on the ID (make-model combination)
   const car = cars.find(c => `${c.make}-${c.model}` === carId);

   if (car) {
       // Display car details
       document.querySelector('#car-image').src = car.image; // Set image to Base64 string
       document.querySelector('#car-title').innerText = `${car.make} ${car.model}`;
       document.querySelector('#car-price').innerText = `Price: $${car.price}`;
       document.querySelector('#car-year').innerText = `Year: ${car.year}`;
   } else {
       document.querySelector('.vehicle-details').innerHTML = `<p>Car not found.</p>`;
   }
}

function handlePurchase(event) {
   event.preventDefault(); // Prevent form submission

   const buyerName = document.getElementById('buyer-name').value;
   const buyerEmail = document.getElementById('buyer-email').value;
   const carId = new URLSearchParams(window.location.search).get('id'); // Get the car ID

   // Create purchase object
   const purchase = { buyerName, buyerEmail, carId, date: new Date().toISOString() };

   // Retrieve existing sales history from Local Storage or initialize an empty array
   const salesHistory = JSON.parse(localStorage.getItem('salesHistory')) || [];

   // Add the new purchase to the sales history
   salesHistory.push(purchase);
   localStorage.setItem('salesHistory', JSON.stringify(salesHistory)); // Save to Local Storage

   alert('Purchase successful!');
   // Optionally, you can redirect or display a success message
}

// Attach event listener for the purchase form
document.getElementById('purchase-form').addEventListener('submit', handlePurchase);

// Call the function on page load
getCarDetails();
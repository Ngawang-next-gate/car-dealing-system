// assets/js/app.js

const cars = JSON.parse(localStorage.getItem('cars')) || [];

// Function to display cars based on filter
function displayCars(cars) {
   const carList = document.querySelector('.car-list');
   carList.innerHTML = ''; // Clear existing cars

   if (cars.length === 0) {
       carList.innerHTML = `<p class="no-cars">No cars found matching your criteria.</p>`;
       return;
   }

   cars.forEach(car => {
       const carCard = `
           <div class="car-card">
               <img src="${car.image}" alt="${car.make}" />
               <h3>${car.make} ${car.model}</h3>
               <p>Price: $${car.price}</p>
               <p>Year: ${car.year}</p>
               <a href="vehicle-details.html?id=${encodeURIComponent(car.make + '-' + car.model)}" class="btn">View Details</a>
           </div>
       `;
       carList.innerHTML += carCard; // Append each car card
   });
}

// Function to filter cars based on search input and price
function filterCars() {
   const searchInput = document.getElementById('search').value.toLowerCase();
   const priceFilter = document.getElementById('price-filter').value;

   let filteredCars = cars.filter(car => {
       const matchesSearch = car.make.toLowerCase().includes(searchInput) || car.model.toLowerCase().includes(searchInput);
       return matchesSearch; // Only filter based on search for now
   });

   // Price filtering logic
   if (priceFilter === 'low-to-high') {
       filteredCars = filteredCars.sort((a, b) => a.price - b.price); // Sort low to high
   } else if (priceFilter === 'high-to-low') {
       filteredCars = filteredCars.sort((a, b) => b.price - a.price); // Sort high to low
   }

   displayCars(filteredCars);
}

// Initial display of cars
displayCars(cars);

// Event listeners for real-time filtering
document.getElementById('search')?.addEventListener('input', filterCars);
document.getElementById('price-filter')?.addEventListener('change', filterCars);

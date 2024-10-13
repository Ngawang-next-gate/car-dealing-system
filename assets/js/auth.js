// assets/js/auth.js

// Function to register a new user
function registerUser(event) {
   event.preventDefault(); // Prevent form submission

   const username = document.getElementById('username').value;
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   const role = document.querySelector('input[name="role"]:checked').value;

   // Create user object
   const newUser = { username, email, password, role };

   // Retrieve existing users from Local Storage or initialize an empty array
   const users = JSON.parse(localStorage.getItem('users')) || [];

   // Check for existing user with the same email (to avoid duplicates)
   const existingUser = users.find(user => user.email === email);
   if (existingUser) {
       alert('User with this email already exists. Please use a different email.');
       return;
   }

   // Add new user to the array and save it back to Local Storage
   users.push(newUser);
   localStorage.setItem('users', JSON.stringify(users));

   alert('Registration successful!');
   window.location.href = 'login.html'; // Redirect to login page
}

// Function to log in a user
function loginUser(event) {
   event.preventDefault(); // Prevent form submission

   const email = document.getElementById('login-email').value;
   const password = document.getElementById('login-password').value;

   // Get all users from Local Storage
   const users = JSON.parse(localStorage.getItem('users')) || [];

   // Check if any user matches the login credentials
   const user = users.find(user => user.email === email && user.password === password);

   if (user) {
       // Save login state
       localStorage.setItem('isLoggedIn', true);
       localStorage.setItem('role', user.role); // Store user role
       alert('Login successful!');
       window.location.href = 'index.html'; // Redirect to homepage
   } else {
       alert('Invalid email or password.');
   }
}

// Function to log out a user
function logoutUser() {
   localStorage.removeItem('isLoggedIn'); // Remove login state
   localStorage.removeItem('role'); // Remove user role
   alert('Logout successful!');
   updateHeaderLinks(); // Update header links
   window.location.href = 'index.html';
}

// Function to update header links based on login state
// Function to update header links based on login state
function updateHeaderLinks() {
   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check login state
   const role = localStorage.getItem('role');

   const loginLink = document.getElementById('login-link');
   const registerLink = document.getElementById('register-link');
   const adminLink = document.getElementById('admin-link');
   const logoutLink = document.getElementById('logout-link');

   if (isLoggedIn) {
       loginLink.style.display = 'none';
       registerLink.style.display = 'none';
       logoutLink.style.display = 'block'; // Show logout link

       if (role === 'dealer') {
           adminLink.style.display = 'block'; // Show admin link for dealers
       } else {
           adminLink.style.display = 'none'; // Hide for normal users
       }

       // Attach event listener to the logout button here
       document.getElementById('logout-button').addEventListener('click', (event) => {
           event.preventDefault(); // Prevent default anchor behavior
           logoutUser(); // Call logout function
       });
   } else {
       loginLink.style.display = 'block';
       registerLink.style.display = 'block';
       adminLink.style.display = 'none'; // Hide for non-logged-in users
       logoutLink.style.display = 'none'; // Hide logout link
   }
}

// Attach event listener to logout button
document.getElementById('logout-button')?.addEventListener('click', (event) => {
   event.preventDefault(); // Prevent default anchor behavior
   logoutUser(); // Call logout function
});

// Call updateHeaderLinks on page load
window.onload = updateHeaderLinks;

// Attach event listeners for registration and login forms
document.getElementById('register-form')?.addEventListener('submit', registerUser);
document.getElementById('login-form')?.addEventListener('submit', loginUser);
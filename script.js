// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrzoWLhGy_gF8_wB2dEyXmUN0AooRcuIE",
  authDomain: "userdetailsapp-b8f56.firebaseapp.com",
  databaseURL: "https://userdetailsapp-b8f56-default-rtdb.firebaseio.com",
  projectId: "userdetailsapp-b8f56",
  storageBucket: "userdetailsapp-b8f56.firebasestorage.app",
  messagingSenderId: "469032332718",
  appId: "1:469032332718:web:fc2aaf8c1ccba67ede6c3f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
window.database = firebase.database();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  const submitButton = document.getElementById("submit-btn");

  // Listen for form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Retrieve form data
    const fname = document.getElementById("first-name").value.trim();
    const lname = document.getElementById("last-name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();

    // Check if all fields are filled
    if (!fname || !lname || !phone || !email || !address) {
      alert("Please fill all fields correctly.");
      return;
    }

    // ✅ Data submission without login
    const newUserRef = window.database.ref("users").push();
    newUserRef.set({
      firstName: fname,
      lastName: lname,
      phoneNumber: phone,
      emailId: email,
      address: address
    });

    // Display success message and reset form
    document.getElementById("success-message").innerText = "Registration Successful!";
    form.reset();
  });

  // Add a click event listener to the submit button for animation and confetti effect
  submitButton.addEventListener("click", function (e) {
    submitButton.classList.add("pulse-animation");
    launchConfetti();
    submitButton.classList.add("clicked");

    setTimeout(() => {
      submitButton.classList.remove("pulse-animation");
      submitButton.classList.remove("clicked");
    }, 1500);
  });

  function launchConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000']
    });
  }
});

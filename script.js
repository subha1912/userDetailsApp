// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDrzoWLhGy_gF8_wB2dEyXmUN0AooRcuIE",
  authDomain: "userdetailsapp-b8f56.firebaseapp.com",
  databaseURL: "https://userdetailsapp-b8f56-default-rtdb.firebaseio.com",
  projectId: "userdetailsapp-b8f56",
  storageBucket: "userdetailsapp-b8f56.firebasestorage.app",
  messagingSenderId: "469032332718",
  appId: "1:469032332718:web:fc2aaf8c1ccba67ede6c3f"
};

// Initialize Firebase App
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Event listener for form submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  const submitButton = document.getElementById("submit-btn");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Retrieve form data
    const fname = document.getElementById("first-name").value.trim();
    const lname = document.getElementById("last-name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();

    // Validate if all fields are filled
    if (!fname || !lname || !phone || !email || !address) {
      alert("Please fill all fields correctly.");
      return;
    }

    // Push data to Firebase Realtime Database
    const newUserRef = database.ref("users").push();
    newUserRef.set({
      firstName: fname,
      lastName: lname,
      phoneNumber: phone,
      emailId: email,
      address: address
    }).then(() => {
      // Success message
      document.getElementById("success-message").innerText = "Registration Successful!";
      form.reset();
      launchConfetti(); // Trigger confetti animation after submission
    }).catch((error) => {
      console.error("Error submitting data to Firebase:", error);
      alert("There was an error while submitting your data. Please try again.");
    });
  });

  // Confetti Effect on Button Click
  submitButton.addEventListener("click", function () {
    submitButton.classList.add("pulse-animation");
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

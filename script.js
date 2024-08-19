function loginform() {
    document.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault(); // prevent form from submitting
      let username = document.querySelector('#username').value;
      let password = document.querySelector('#password').value;
  
      if (username === 'myusername' && password === 'mypassword') {
        document.getElementById("message").innerText = "Login successful!";
        window.location.href = "dashboard.html";
      } else {
        document.getElementById("message").innerText = "Incorrect username or password";
        return false;
      }
    });
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    loginform();
  });
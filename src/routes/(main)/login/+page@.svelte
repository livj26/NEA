<script>

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

// cannot use document in svelte, use on mount

<script/>

<form class="login">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
    <p id="message"></p>
    <input type="submit" value="Login">
</form>
<nav>
    <ul>
      <li><a href="/">ROTASMART</a></li>
      <li><a href="/login">Login</a></li>
      <li><a href="/register">Register</a></li>
    </ul>
</nav>

<script>
  let errorMessage = '';

  async function handleSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const response = await fetch('/register', {
          method: 'POST',
          body: formData,
      });
      
      const result = await response.json();
      if (result.error) {
          errorMessage = result.error; // Handle error
      } else {
          // Handle successful registration
          window.location.href = '/login'; // Redirect to login
      }
  }
</script>

<form on:submit={handleSubmit}>
  <input type="text" name="forename" placeholder="Forename" required />
  <input type="text" name="surname" placeholder="Surname" required />
  <input type="email" name="email" placeholder="Email" required />
  <input type="password" name="password" placeholder="Password" required />
  <button type="submit">Register</button>
  {#if errorMessage}
      <p>{errorMessage}</p>
  {/if}
</form>

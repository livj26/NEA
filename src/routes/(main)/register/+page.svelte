<script>
  import { onMount } from 'svelte';
  let errorMessage = '';

  onMount(() => {
      const urlParams = new URLSearchParams(window.location.search);
      errorMessage = urlParams.get('error') || '';
      console.log('Error Message on Mount:', errorMessage); 
  });
</script>

<nav>
  <ul>
    <li><a href="/">ROTASMART</a></li>
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>
  </ul>
</nav>

{#if errorMessage}
  <p class="error">{errorMessage}</p> <!-- Display the error message -->
{/if}

<div class="registration">
  <form method="POST" action="?/register">
      <input type="text" name="forename" placeholder="Forename" required />
      <input type="text" name="surname" placeholder="Surname" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Register</button>
  </form>
</div>

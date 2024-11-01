<script>
  import { onMount } from 'svelte';

  let errorMessage = '';

  onMount(() => {
      const urlParams = new URLSearchParams(window.location.search);
      errorMessage = urlParams.get('error') || '';
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

<div class="login">
  <form method="POST" action="?/login">
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
  </form>
</div>

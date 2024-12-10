<script>
    import { onMount } from 'svelte';
    let errorMessage = '';
    let successMessage = '';
  
    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        errorMessage = urlParams.get('error') || '';
        successMessage = urlParams.get('success') || '';
    });
</script>
  
<nav>
    <ul>
      <li><a href="/">ROTASMART</a></li>
      <li><a href="/shifts">Shifts</a></li>
    </ul>
  </nav>
<h1>Book Time Off</h1>

<div class="timeOff">
    <form method="POST" action="?/timeOff">
        <input type="datetime-local" name="startDate" placeholder="Start Date" required />
        <input type="datetime-local" name="endDate" placeholder="End Date" required />
        <button type="submit">Submit</button>
    </form>
</div>

{#if errorMessage}
  <p class="error">{errorMessage}</p>
{/if}

{#if successMessage}
  <p class="success">{successMessage}</p>
{/if}

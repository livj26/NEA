<nav>
  <ul>
      <li><h1>ROTASMART</h1></li>
      <li><a href="/shifts/past">Past Shifts</a></li>
      <li><a href="/shifts/upcoming">Upcoming Shifts</a></li>
      <li><a href="/availability">Availability</a></li>
      <li><button id="logout-button">Logout</button></li> <!-- Logout Button -->
  </ul>
</nav>

<script>
  export let userData;
</script>

<h1>Welcome, {userData.forename} {userData.surname}!</h1>
<p>Your email: {userData.email}</p>
{#if userData.isAdmin}
  <p>You have admin privileges.</p>
{:else}
  <p>Welcome, regular user!</p>
{/if}



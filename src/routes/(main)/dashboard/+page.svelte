<script>
  import {page} from '$app/stores';
  $: console.log('Component:', $page.data); 
</script>

<nav>
  <ul>
      <li><h1>ROTASMART</h1></li>
      <li><a href="/shifts">Shifts</a></li>
      <li><a href="/availability">Availability</a></li>
  </ul>
</nav>

<h1>Welcome to  Dashboard</h1>
<p>Your employee ID is: {$page.data.employeeid}</p> 

<form method="post" action="/logout">
  <button type="submit">Logout</button>
</form>


<script>
  import {page} from '$app/stores';
  $: console.log('Component:', $page.data); 

</script>

<nav>
  <ul>
      <li><h1>ROTASMART</h1></li>
      <li><a href="/rota">Rota</a></li>
      <li><a href="/editdb">Edit Database</a></li>
      <li><a href="/adminshifts">Shifts</a></li>
      <li><a href="/employees">View Employees</a></li>
  </ul>
</nav>

<h1>Welcome to Admin Dashboard</h1>
<p>Your employee ID is: {$page.data.employeeid}</p>

<form method="post" action="/logout">
  <button type="submit">Logout</button>
</form>
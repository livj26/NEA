<script>
  import {page} from '$app/stores';
  $: console.log('Component:', $page.data); 
</script>

<nav>
  <ul>
      <li><h1>ROTASMART</h1></li>
      <li><a href="/rota">Rota</a></li>
      <li><a href="/editdb">Edit Database</a></li>
      <li><a href="/shifts">Shifts</a></li>
  </ul>
</nav>

<h1>Welcome to Admin Dashboard</h1>
<p>Your employee ID is: {$page.data.employeeid}</p> 

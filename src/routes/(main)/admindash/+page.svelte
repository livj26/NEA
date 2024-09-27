<script context="module">
    import { parse } from 'cookie';
    import { redirect } from '@sveltejs/kit';
  
    export async function load({ request }) {
      const cookies = request.headers.get('cookie') || '';
      const parsedCookies = parse(cookies);
      
      const isLoggedIn = Boolean(parsedCookies.session);
      
      if (!isLoggedIn) {
        throw redirect(302, '/login');
      }
  
      return {};
    }
</script>
  
<nav>
    <ul>
      <li><h1>ROTASMART</h1></li>
      <li><a href="/rota">Rota</a></li>
      <li><a href="/editdb">Edit Database</a></li>
      <li><a href="/shifts">Shifts</a></li>
    </ul>
  </nav>
  
<h2>Welcome to the Admin Dashboard</h2>
  


<form method="POST" action="?/logout"> <!-- Use POST method -->
    <button type="submit">Logout</button>
</form>
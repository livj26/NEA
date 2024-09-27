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
      <li><a href="/admindash">Admin Dashboard</a></li>
      <li><a href="/shifts/past">Past Shifts</a></li>
      <li><a href="/shifts/upcoming">Upcoming Shifts</a></li>
    </ul>
  </nav>
  

  


<form method="POST" action="?/logout"> <!-- Use POST method -->
    <button type="submit">Logout</button>
</form>
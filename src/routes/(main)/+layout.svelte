<script context="module"> /*script is module-level. code inside script block will run once when the module is loaded, and not on every laod up*/
    export async function load({ page }) { /*runs before the page is rendered to fetch data*/
      return {
        props: { // `props` allow you to pass data to a component or page*/
          currentPage: page.path /*returns what page the user is on as a URL*/
        }
      };
    }

  

    export let currentPage; /*`export` makes `currentPage` available to other modules, allowing them to access this value.*/
    let isLandingPage = currentPage === '/'; /*checks if page is landingpage - first page on the site*/
    let isLogin = currentPage === '/login';

  </script>
  
{#if !isLandingPage}
    <nav>
      <ul>
        <li><a href="/">ROTASMART</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
{:else if !isLogin}
  <nav>
    <ul>
      <li><a href="/">ROTASMART</a></li>
      <li><a href="/login">Login</a></li>
    </ul>
  </nav>
{:else}
    <nav>
        <ul>
            <li><h1>ROTASMART</h1></li> 
            <li><a href="/dashboard">Admin</a></li>
            <li><a href="availability.html">Availability</a></li>
            <li><a href="shifts.html">Shifts</a></li>
        </ul>
    </nav>
{/if}


  <slot/>
  




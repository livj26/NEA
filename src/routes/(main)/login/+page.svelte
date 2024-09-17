<script>
let showForm = null;
function showLogin(){
  showForm = 'login';
}
function showRegister(){
  showForm = 'register';
}
function original(){
  showForm = null;
}
</script>


<div>
  {#if showForm === null}
      <div>
          <button on:click={showLogin}>Login</button>
          <button on:click={showRegister}>Register</button>
      </div>
  {:else if showForm === 'login'}
      <form method="POST">
          <h2>Login</h2>
          <label>
              Email
              <input name="email" type="email" required>
          </label>
          <label>
              Password
              <input name="password" type="password" required>
          </label>
          <button type="submit">Log in</button>
      </form>
  {:else if showForm === 'register'}
      <form method="POST">
        <h2>Register</h2>
          <label>
              Email
              <input name="email" type="email" required>
          </label>
          <label>
              Password
              <input name="password" type="password" required>
          </label>
          <label>
              Confirm Password
              <input name="confirm_password" type="password" required>
          </label>
          <button type="submit">Register</button>
      </form>
  {/if}
</div>
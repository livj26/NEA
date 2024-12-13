<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    
    let errorMessage = '';
    let successMessage = '';

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        errorMessage = urlParams.get('error') || '';
        successMessage = urlParams.get('success') || '';
    })

    // Access employees data from the server-side load function
    $: employees = $page.data.employees;
</script>

<nav>
    <ul>
        <li><a href="/">ROTASMART</a></li>
        <li><a href="/admindash">Admin Dashboard</a></li>
        <li><a href="/adminshifts">Shifts</a></li>
        <li><a href="/editdb">Edit Database</a></li>
        <li><a href="/employees">View Employees</a></li>
    </ul>
</nav>

<h1>Rota</h1>

<h1>Create a Shift</h1>

<div class="rota">
    <form method="POST" action="?/rota">
        <select name="employeeid" required>
            <option value="" disabled selected>Select an employee</option>
            {#each employees as employee}
                <option value={employee.employeeid}>
                    {employee.forename} {employee.surname}
                </option>
            {/each}
        </select>
        <input type="date" name="date" placeholder="Date" required />
        <input type="time" name="startTime" placeholder="Start Time" required />
        <input type="time" name="endTime" placeholder="End Time" required />
        <button type="submit">Submit</button>
    </form>
</div>

{#if errorMessage}
    <p class="error">{errorMessage}</p>
{/if}

{#if successMessage}
    <p class="success">{successMessage}</p>
{/if}
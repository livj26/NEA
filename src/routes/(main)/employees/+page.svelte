<script>
    import { page } from '$app/stores';

    // Reactive values from server data
    $: employeeFilter = $page.data.employeeFilter;
    $: employees = $page.data.employees;
</script>

<nav>
    <ul>
        <li><a href="/">ROTASMART</a></li>
        <li><a href="/admindash">Admin Dashboard</a></li>
        <li><a href="/rota">Rota</a></li>
        <li><a href="/shifts">Shifts</a></li>
        <li><a href="/editdb">Edit Database</a></li>
    </ul>
</nav>

<h1>Employees</h1>

<!-- Dropdown menu for filtering employees -->
<label for="employee">Filter by Employee:</label>
<select id="employee" on:change={(e) => (window.location.search = `?employee=${e.target.value}`)} bind:value={employeeFilter}>
    <option value="all">All Employees</option>
    {#each employees as employee}
        <option value={employee.employeeid}>
            {employee.forename} {employee.surname}
        </option>
    {/each}
</select>

<!-- Form for deleting an employee -->
<form method="POST" action="?/deleteEmployee">
    <label for="delete">Select an Employee to Delete:</label>
    <select id="delete" name="employeeid" required>
        <option value="" disabled selected>Choose an employee</option>
        {#each employees as employee}
            <option value={employee.employeeid}>
                {employee.forename} {employee.surname}
            </option>
        {/each}
    </select>
    <button type="submit">Delete Employee</button>
</form>

<!-- Display employee details -->
{#if employees && employees.length > 0}
    <ul>
        {#each employees as employee}
            <li>
                <strong>Employee ID:</strong> {employee.employeeid}
                <br>
                <strong>Forename:</strong> {employee.forename}
                <br>
                <strong>Surname:</strong> {employee.surname}
                <br>
                <strong>Email:</strong> {employee.email}
            </li>
        {/each}
    </ul>
{:else}
    <p>No employees found.</p>
{/if}

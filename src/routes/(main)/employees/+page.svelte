<script>
    import { page } from '$app/stores';

    // Reactive data from server
    $: employees = $page.data.employees;
    let selectedEmployeeId = "";

    // Compute selected employee's details
    $: selectedEmployee = employees.find(e => e.employeeid === parseInt(selectedEmployeeId));

    function updateEmployeeSelection(event) {
        selectedEmployeeId = event.target.value;
    }
</script>

<nav>
    <ul>
        <li><a href="/">ROTASMART</a></li>
        <li><a href="/admindash">Admin Dashboard</a></li>
        <li><a href="/rota">Rota</a></li>
        <li><a href="/editdb">Edit Database</a></li>
    </ul>
</nav>

<h1>Employee Information</h1>

<!-- Dropdown menu for selecting an employee -->
<label for="employee">Select an employee:</label>
<select id="employee" on:change={updateEmployeeSelection} bind:value={selectedEmployeeId}>
    <option value="">All Employees</option>
    {#each employees as employee}
        <option value={employee.employeeid}>
            {employee.forename} {employee.surname}
        </option>
    {/each}
</select>

<!-- Display selected employee details -->
{#if selectedEmployee}
    <h2>Employee Details</h2>
    <p><strong>Full Name:</strong> {selectedEmployee.forename} {selectedEmployee.surname}</p>
    <p><strong>Email:</strong> {selectedEmployee.email}</p>
    <p><strong>Admin:</strong> {selectedEmployee.isAdmin ? 'Yes' : 'No'}</p>
{:else if selectedEmployeeId === ""}
    <p>Select an employee to view their details.</p>
{:else}
    <p>No employee found with the selected ID.</p>
{/if}

<form method="post" action="/logout">
    <button type="submit">Logout</button>
</form>

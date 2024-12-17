<script>
    import { page } from '$app/stores';

    // Reactive values from server data
    $: employeeFilter = $page.data.employeeFilter;
    $: employees = $page.data.employees;

    // Function to update the filter
    function updateEmployeeFilter(event) {
        const selectedEmployee = event.target.value;
        window.location.search = `?employee=${selectedEmployee}`;
    }

    // Function to handle employee deletion
    async function deleteEmployee(employeeId) {
        if (confirm('Are you sure you want to delete this employee?')) {
            const formData = new FormData();
            formData.append('employeeid', employeeId);

            const response = await fetch('/delete', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Employee deleted successfully');
                window.location.reload(); // Refresh the page to update the employee list
            } else {
                alert('Failed to delete employee');
            }
        }
    }
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
<select id="employee" on:change={updateEmployeeFilter} bind:value={employeeFilter}>
    <option value="all">All Employees</option>
    {#each employees as employee}
        <option value={employee.employeeid}>
            {employee.forename} {employee.surname}
        </option>
    {/each}
</select>

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
                <br>
                <button on:click={() => deleteEmployee(employee.employeeid)}>Delete</button>
            </li>
        {/each}
    </ul>
{:else}
    <p>No employees found.</p>
{/if}

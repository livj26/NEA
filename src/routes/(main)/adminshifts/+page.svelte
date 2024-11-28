<script>
    import { page } from '$app/stores';
    // Reactive values from server data
    $: shifts = $page.data.shifts;
    $: filterOption = $page.data.filterOption;
    $: employees = $page.data.employees;
    $: employeeFilter = $page.data.employeeFilter;

    function updateFilter(event) {
        const selectedFilter = event.target.value;
        window.location.search = `?filter=${selectedFilter}&employee=${employeeFilter}`; 
    }

    // Function to update employee filter
    function updateEmployeeFilter(event) {
        const selectedEmployee = event.target.value;
        window.location.search = `?filter=${filterOption}&employee=${selectedEmployee}`; 
    }
</script>

<nav>
    <ul>
      <li><a href="/">ROTASMART</a></li>
      <li><a href="/availability">Availability</a></li>
    </ul>
</nav>
<h1>Admin Shifts</h1>

<!-- Dropdown menu for filtering shifts -->
<label for="filter">Filter shifts:</label>
<select id="filter" on:change={updateFilter} bind:value={filterOption}>
    <option value="all">All Shifts</option>
    <option value="upcoming">Upcoming Shifts</option>
    <option value="past">Past Shifts</option>
</select>

<!-- Dropdown menu for filtering by employee -->
<label for="employee">Filter by employee:</label>
<select id="employee" on:change={updateEmployeeFilter} bind:value={employeeFilter}>
    <option value="">All Employees</option>
    {#each employees as employee}
        <option value={employee.employeeid}>
            {employee.forename} {employee.surname}
        </option>
    {/each}
</select>

<!-- Display filtered shifts -->
{#if shifts && shifts.length > 0}
    <ul>
        {#each shifts as shift}
            <li>
                <strong>Date:</strong> {shift.date}
                <br>
                <strong>Start Time:</strong> {shift.startTime}
                <br>
                <strong>End Time:</strong> {shift.endTime}
                <br>
                <strong>Employee:</strong> {shift.employee.forename} {shift.employee.surname}
            </li>
        {/each}
    </ul>
{:else}
    <p>No shifts found for the selected filter.</p>
{/if}

<form method="post" action="/logout">
    <button type="submit">Logout</button>
</form>

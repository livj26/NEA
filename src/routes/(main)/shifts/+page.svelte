<script>
    import { page } from '$app/stores';

    // Reactive values from server data
    $: shifts = $page.data.shifts;
    $: filterOption = $page.data.filterOption;

    // Function to update the filter by changing the query parameter
    function updateFilter(event) {
        const selectedFilter = event.target.value;
        window.location.search = `?filter=${selectedFilter}`; 
    }
</script>

<nav>
    <ul>
      <li><a href="/">ROTASMART</a></li>
      <li><a href="/availability">Availability</a></li>
    </ul>
  </nav>
<h1>Your Shifts</h1>

<!-- Dropdown menu for filtering -->
<label for="filter">Filter shifts:</label>
<select id="filter" on:change={updateFilter} bind:value={filterOption}>
    <option value="upcoming">Upcoming Shifts</option>
    <option value="past">Past Shifts</option>
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
            </li>
        {/each}
    </ul>
{:else}
    <p>No shifts found for the selected filter.</p>
{/if}

<form method="post" action="/logout">
    <button type="submit">Logout</button>
</form>
  
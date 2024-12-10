import { PrismaClient } from '@prisma/client';
import { redirect } from "@sveltejs/kit";

const prisma = new PrismaClient();

export async function load({ locals, url }) {
    const { employeeid, isAdmin } = locals; 
    const filterOption = url.searchParams.get("filter") || "all";  // Default to "all"
    const employeeFilter = url.searchParams.get("employee") || "";  // Default to no employee filter

    // Check if the user is an admin
    if (!isAdmin) {
        // Redirect to dashboard if not an admin
        throw redirect(307, '/dashboard');
    }

    // Get today's date for filtering
    const today = new Date();
    today.setHours(0, 0, 0, 0);  // Set time to the start of the day

    // Convert employeeFilter to integer if it's provided and valid
    const employeeIdFilter = employeeFilter ? parseInt(employeeFilter, 10) : undefined;

    // Build where clause based on filter options
    const where = {
        date: filterOption === "past" 
            ? { lt: today }   // Past shifts
            : filterOption === "upcoming"
                ? { gte: today }  // Upcoming shifts
                : {},  // All shifts if "all" filter is selected
    };

    // Add employee filter if provided
    if (employeeIdFilter) {
        where.employeeid = employeeIdFilter;  // Filter shifts by specific employee
    }

    // Fetch all shifts based on filter options, including employee details
    const shifts = await prisma.shifts.findMany({
        where,
        select: {
            id: true,
            date: true,
            startTime: true,
            endTime: true,
            employee: {  // Use `include` to fetch employee details
                select: {
                    forename: true,
                    surname: true
                }
            }
        },
        orderBy: { date: 'asc' }
    });

    // Fetch all employees for the filter dropdown
    const employees = await prisma.employees.findMany({
        select: {
            employeeid: true,
            forename: true,
            surname: true,
        }
    });

    return { shifts, filterOption, employees, employeeFilter };
}

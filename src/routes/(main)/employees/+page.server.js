import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function load({ locals, url }) {
    const { employeeid, isAdmin } = locals;
    const employeeFilter = url.searchParams.get('employee') || 'all';

    // Check if the user is an admin, otherwise redirect
    if (!isAdmin) {
        throw redirect(307, '/dashboard');
    }

    // Create a filter object
    let where = {};

    if (employeeFilter !== 'all') {
        const employeeIdFilter = parseInt(employeeFilter, 10);
        if (isNaN(employeeIdFilter)) {
            throw new Error('Invalid employee filter');
        }
        where.employeeid = employeeIdFilter;
    }

    // Query the employees with the filter
    const employees = await prisma.employees.findMany({
        where,  // Pass the `where` filter here
        select: {
            employeeid: true,
            forename: true,
            surname: true,
            email: true,
        }
    });

    return { employees };
}

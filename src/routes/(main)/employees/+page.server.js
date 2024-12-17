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
        where, 
        select: {
            employeeid: true,
            forename: true,
            surname: true,
            email: true,
        }
    });

    return { employees };
}

export const actions = {
    delete: async ({ request }) => {
        const formData = await request.formData();
        const employeeId = formData.get('employeeid');

        if (!employeeId) {
            throw new Error('Employee ID is required');
        }

        // Delete the employee from the database
        await prisma.employees.delete({
            where: { employeeid: parseInt(employeeId, 10) },
        });

        return { success: true };
    }
};

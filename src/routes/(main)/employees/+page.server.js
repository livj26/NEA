import { PrismaClient } from '@prisma/client';
import { redirect, fail } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function load({ locals, url }) {
    const { isAdmin } = locals;
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
            isAdmin: true, 
        }
    });

    // Return the data including the isAdmin field
    return { employees, employeeFilter };
}

export const actions = {
    deleteEmployee: async ({ request }) => {
        const formData = await request.formData();
        const employeeid = parseInt(formData.get('employeeid'), 10);

        if (!employeeid) {
            console.error('Error: Employee ID is required for deletion.');
            return fail(400, { error: 'Employee ID is required for deletion.' });
        }

        // Check if the employee exists before attempting to delete
        const employee = await prisma.employees.findUnique({
            where: { employeeid },
        });

        if (!employee) {
            console.error('Error: Employee not found.');
            return fail(404, { error: 'Employee not found.' });
        }

        // Perform the delete operation
        const result = await prisma.employees.delete({
              where: { employeeid }
            });

        if (!result) {
            console.error('Error: Failed to delete employee.');
            return fail(500, { error: 'Failed to delete employee.' });
        }

        return { success: true, message: 'Employee deleted successfully' };
    },
};

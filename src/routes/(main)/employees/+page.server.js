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
        }
    });

    return { employees, employeeFilter };
}

export const actions = {
    deleteEmployee: async ({ request }) => {
        const formData = await request.formData();
        const employeeid = parseInt(formData.get('employeeid'), 10);

        if (!employeeid) {
            return fail(400, { error: 'Employee ID is required for deletion.' });
        }

        try {
            await prisma.employees.delete({
                where: { employeeid }
            });
            return { success: true, message: 'Employee deleted successfully' };
        } catch (err) {
            console.error('Error deleting employee:', err);
            return fail(500, { error: 'Failed to delete employee.' });
        }
    }
};

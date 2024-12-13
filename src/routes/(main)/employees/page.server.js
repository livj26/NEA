import { PrismaClient } from '@prisma/client';
import { redirect } from "@sveltejs/kit";

const prisma = new PrismaClient();

export async function load({ locals }) {
    const { isAdmin } = locals;

    // Redirect non-admin users to the dashboard
    if (!isAdmin) {
        throw redirect(307, '/dashboard');
    }

    // Fetch all employees
    const employees = await prisma.employees.findMany({
        select: {
            employeeid: true,
            forename: true,
            surname: true,
            email: true,
            isAdmin: true
        }
    });

    return { employees };
}
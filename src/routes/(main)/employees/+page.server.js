import { PrismaClient } from '@prisma/client';
import { redirect } from "@sveltejs/kit";

const prisma = new PrismaClient();

export async function load({ locals, url}){
    const { employeeid, isAdmin } = locals;
    const employeeFilter = url.searchParams.get("employee") || "all";

    if (!isAdmin) {
        throw redirect(307, '/dashboard');
    }
    const employeeIdFilter = employeeFilter ? parseInt(employeeFilter, 10) : undefined;

    if (employeeIdFilter) {
        where.employeeid = employeeIdFilter
    }

    const employees = await prisma.employees.findMany({
        select: {
            employeeid: true,
            forename: true, 
            surname: true,
            email: true,
        }
    })
    return {employees}
}
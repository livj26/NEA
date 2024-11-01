// +page.server.js
import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import { parse } from 'cookie';

const prisma = new PrismaClient();

async function fetchUserData(employeeId) {
    try {
        const user = await prisma.employees.findUnique({
            where: { employeeid: employeeId },
            select: {
                employeeid: true,
                forename: true,
                surname: true,
                email: true,
                isAdmin: true
            }
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

export async function load({ request }) {
    const cookieHeader = request.headers.get('cookie');
    const cookies = parse(cookieHeader || '');

    if (!cookies.employeeId) {
        console.log('User not authenticated, redirecting to login');
        throw redirect(302, '/login');
    }

    const employeeId = cookies.employeeId;
    const userData = await fetchUserData(employeeId);

    if (!userData) {
        console.log('User data not found, redirecting to login');
        throw redirect(302, '/login');
    }

    return { userData };
}

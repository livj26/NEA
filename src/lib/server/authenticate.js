import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function authenticate(cookies) {
    const token = cookies.get("auth-token");
    if (!token) return null;

    try {
        // Query the session and related employee information
        const session = await prisma.sessions.findUnique({
            where: { token },
            select: {
                employeeid: true,
                employee: {
                    select: {
                        isAdmin: true
                    }
                }
            }
        });
        console.log('Employee info: ', session);
        // Check if session and related employee record exist
        if (!session) return null;

        return {
            employeeid: session.employeeid,
            isAdmin: session.employee.isAdmin
        };
    } catch (error) {
        console.error("Error retrieving session:", error);
        return null;
    }
}
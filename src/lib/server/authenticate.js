import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function authenticate(cookies) {
    const token = cookies.get("auth-token");
    if (!token) return null; // Return null if no token is found

    try {
        // Query the database for the session using the token
        const session = await prisma.sessions.findUnique({
            where: { token },
            select: { employeeid: true } // Only select the employeeid
        });
        console.log("Authenticate:", session.employeeid)
        // Return the employee ID or null if session is not found
        return session ? session.employeeid : null; // Return employeeid or null if not found
    } catch (error) {
        console.error('Error retrieving session:', error); // Log the error for debugging
        return null; // Return null in case of an error
    }
}

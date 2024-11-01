import { redirect } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async ({ cookies }) => {
    const employeeId = cookies.get("employeeId");

    if (employeeId) {
        // Delete the session from the database
        await prisma.sessions.deleteMany({
            where: { employeeid: employeeId },
        });
    }

    // Clear the authentication cookies with a path
    cookies.delete("auth-token", { path: '/' });
    cookies.delete("employeeId", { path: '/' });

    // Redirect to the login page
    throw redirect(302, "/login");
};

import { redirect } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async ({ cookies }) => {
    const employeeId = cookies.get("employeeId");

    if (employeeId) {
        // Convert employeeId to an integer
        const empIdInt = parseInt(employeeId, 10);

        // Check if the conversion was successful
        if (isNaN(empIdInt)) {
            console.log(`Invalid employee ID: ${employeeId}. Unable to delete session.`);
            throw redirect(302, "/login"); // Redirect if the ID is invalid
        }

        // Delete the session from the database
        await prisma.sessions.deleteMany({
            where: { employeeid: empIdInt }, // Use the integer value here
        });
        console.log(`Session for employee ID ${empIdInt} deleted.`);
    } else {
        console.log("No employee ID found in cookies.");
    }

    // Clear the authentication cookies with a path
    cookies.delete("auth-token", { path: '/' });
    console.log("Authentication cookie 'auth-token' deleted.");
    
    cookies.delete("employeeId", { path: '/' });
    console.log("Employee ID cookie 'employeeId' deleted.");

    // Redirect to the login page
    throw redirect(301, "/login");
};


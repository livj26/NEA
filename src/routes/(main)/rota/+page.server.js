import { PrismaClient } from "@prisma/client";
import { redirect, fail } from "@sveltejs/kit";

const prisma = new PrismaClient();

export async function load() {
    // Fetch employees for the dropdown
    const employees = await prisma.employees.findMany({
        select: {
            employeeid: true,
            forename: true,
            surname: true
        }
    });
    console.log("Fetched employees:", employees);
    return {
        employees
    };
}

export const actions = {
    rota: async ({ request }) => {
        const formData = await request.formData();
        const employeeid = parseInt(formData.get("employeeid"), 10);
        const date = formData.get("date");
        const startTime = formData.get("startTime");
        const endTime = formData.get("endTime");

        // Input validation
        if (!employeeid || !date || !startTime || !endTime) {
            return fail(400, { error: "All fields are required." });
        }

        const startDateTime = new Date(`${date}T${startTime}`);
        const endDateTime = new Date(`${date}T${endTime}`);

        if (startDateTime >= endDateTime) {
            return fail(400, { error: "Start time must be before end time." });
        }

        try {
            // Insert shift into the database
            await prisma.shifts.create({
                data: {
                    employeeid,
                    date: new Date(date),
                    startTime: startDateTime,
                    endTime: endDateTime
                }
            });
            console.log("Shift added successfully");
            return {
                success: "Shift successfully added!"
            };
        } catch (error) {
            console.error("Error creating shift:", error);
            return fail(500, { error: "An error occurred while adding the shift. Please try again." });
        }
    }
};

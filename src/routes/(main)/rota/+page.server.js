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
            throw redirect(302, `/rota?error=${encodeURIComponent("Start time must be before end time")}`);
        }

        // Check for conflicting availability
        const conflictingAvailability = await prisma.availability.findFirst({
            where: {
                employeeid,
                OR: [
                    { startDate: { lte: endDateTime }, endDate: { gte: startDateTime } }, // Full overlap
                    { startDate: { lte: startDateTime }, endDate: { gte: startDateTime } }, // Start overlaps
                    { startDate: { lte: endDateTime }, endDate: { gte: endDateTime } }, // End overlaps
                ]
            }
        });

        if (conflictingAvailability) {
            throw redirect(302, `/rota?error=${encodeURIComponent("Employee is unavailable during the selected time.")}`);
        }

        // Create the shift
        const result = await prisma.shifts.create({
            data: {
                employeeid,
                date: new Date(date),
                startTime: startDateTime,
                endTime: endDateTime
            }
        });

        if (result) {
            console.log("Shift added successfully,", result);
            throw redirect(302, `/rota?success=${encodeURIComponent('Shift successfully added')}`);
        } else {
            console.error("Error creating shift");
            throw redirect(302, `/rota?error=${encodeURIComponent("Error adding shift")}`);
        }
    }
};

import { PrismaClient } from "@prisma/client";
import { redirect } from "@sveltejs/kit";
const prisma = new PrismaClient();

export const actions = {
    timeOff: async ({ request, locals }) => {
        const { employeeid } = locals;

        const formData = await request.formData();
        const startDate = formData.get("startDate");
        const endDate = formData.get("endDate");

        const startDateISO = new Date(startDate).toISOString();
        const endDateISO = new Date(endDate).toISOString();

        if (isNaN(new Date(startDate)) || isNaN(new Date(endDate))) {
            throw redirect(302, `/availability?error=${encodeURIComponent("Invalid date format. Please ensure the dates are correct.")}`);
        }

        // Check if there are any shifts for the user in the selected range
        const conflictingShifts = await prisma.shifts.findMany({
            where: {
                employeeid: employeeid,
                OR: [
                    {
                        date: {
                            gte: startDateISO,
                            lte: endDateISO
                        }
                    },
                    {
                        startTime: {
                            gte: startDateISO,
                            lte: endDateISO
                        }
                    },
                    {
                        endTime: {
                            gte: startDateISO,
                            lte: endDateISO
                        }
                    }
                ]
            }
        });

        if (conflictingShifts.length > 0) {
            throw redirect(302, `/availability?error=${encodeURIComponent("You have a shift scheduled during this time period. Please choose a different time.")}`);
        }

        // Generate dates for each day in the range
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        // Array to hold the availability data for each day
        const availabilityData = [];

        // Loop through the date range and create availability entries
        while (startDateObj <= endDateObj) {
            availabilityData.push({
                startDate: new Date(startDateObj).toISOString(),
                endDate: new Date(startDateObj).toISOString(),
                employeeid: employeeid
            });

            // Move to the next day
            startDateObj.setDate(startDateObj.getDate() + 1);
        }
        
        console.log(availabilityData);

        // Create availability records in the database
        await prisma.availability.createMany({
            data: availabilityData
        });

        console.log("Time off booked successfully:", availabilityData);

        // Redirect with success message
        throw redirect(302, `/availability?success=${encodeURIComponent("Time off booked successfully!")}`);
    }
};

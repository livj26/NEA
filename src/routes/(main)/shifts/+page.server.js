
import { PrismaClient } from '@prisma/client';
import { redirect } from "@sveltejs/kit";

const prisma = new PrismaClient();

export async function load({ locals, url }) {
    const { employeeid } = locals;
    const filterOption = url.searchParams.get("filter") || "upcoming"; // Default to "upcoming"

    if (!employeeid) {
        // Redirect to login if no employee is authenticated
        throw redirect(307, '/login');
    }

    // Get today's date for filtering
    const today = new Date();

    // Fetch shifts based on filter option
    const shifts = await prisma.shifts.findMany({
        where: {
            employeeid,
            date: filterOption === "past" 
                ? { lt: today }   // Past shifts
                : { gte: today }  // Upcoming shifts
        },
        select: {
            id: true,
            date: true,
            startTime: true,
            endTime: true,
        },
        orderBy: { date: 'asc' }
    });

    return { shifts, filterOption };
}

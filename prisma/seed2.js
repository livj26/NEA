import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const employeeId = 2;

    // Define specific shift times: two in the past and two in the future
    const shiftsData = [
        {
            startTime: new Date("2024-10-20T09:00:00"), // October 20, 2024, 9:00 AM
            endTime: new Date("2024-10-20T17:00:00"),   // October 20, 2024, 5:00 PM
            date: new Date("2024-10-20"),
            employeeid: employeeId,
        },
        {
            startTime: new Date("2024-10-25T10:00:00"), // October 25, 2024, 10:00 AM
            endTime: new Date("2024-10-25T18:00:00"),   // October 25, 2024, 6:00 PM
            date: new Date("2024-10-25"),
            employeeid: employeeId,
        },
        {
            startTime: new Date("2024-11-05T08:00:00"), // November 5, 2024, 8:00 AM
            endTime: new Date("2024-11-05T16:00:00"),   // November 5, 2024, 4:00 PM
            date: new Date("2024-11-05"),
            employeeid: employeeId,
        },
        {
            startTime: new Date("2024-11-10T12:00:00"), // November 10, 2024, 12:00 PM
            endTime: new Date("2024-11-10T20:00:00"),   // November 10, 2024, 8:00 PM
            date: new Date("2024-11-10"),
            employeeid: employeeId,
        }
    ];

    // Create shifts in the database
    for (const shift of shiftsData) {
        await prisma.shifts.create({
            data: shift
        });
    }

    console.log("Shifts seeded successfully!");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

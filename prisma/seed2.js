import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const employeeId = 2;

    // Define specific shift times: two in the past and two in the future
    const shiftsData = [
        {
            startTime: new Date("2024-11-20T09:00:00"), // October 20, 2024, 9:00 AM
            endTime: new Date("2024-11-20T17:00:00"),   // October 20, 2024, 5:00 PM
            date: new Date("2024-11-20"),
            employeeid: employeeId,
        },
        {
            startTime: new Date("2024-11-25T10:00:00"), // October 25, 2024, 10:00 AM
            endTime: new Date("2024-11-25T18:00:00"),   // October 25, 2024, 6:00 PM
            date: new Date("2024-11-25"),
            employeeid: employeeId,
        },
        {
            startTime: new Date("2024-12-22T08:00:00"), // November 5, 2024, 8:00 AM
            endTime: new Date("2024-12-22T16:00:00"),   // November 5, 2024, 4:00 PM
            date: new Date("2024-12-22"),
            employeeid: employeeId,
        },
        {
            startTime: new Date("2024-12-19T12:00:00"), 
            endTime: new Date("2024-12-19T20:00:00"),   
            date: new Date("2024-12-19"),
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

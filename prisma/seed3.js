import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteShifts() {
    const employeeId = 2; // Replace with the desired employee ID

    try {
        // Delete shifts for the specified employee ID
        const deletedShifts = await prisma.shifts.deleteMany({
            where: {
                employeeid: employeeId,
            },
        });

        console.log(`${deletedShifts.count} shift(s) deleted successfully!`);
    } catch (error) {
        console.error("Error deleting shifts:", error);
    } finally {
        await prisma.$disconnect();
    }
}

deleteShifts()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });

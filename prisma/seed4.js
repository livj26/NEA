import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        // Delete all availability records
        await prisma.availability.deleteMany();

        console.log("All availability entries deleted successfully.");
    } catch (error) {
        console.error("Error deleting availability entries:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });

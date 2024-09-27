import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    // Hashing password for John Doe
    const johnHashedPassword = await bcrypt.hash('password123', 10); // Hash John's password

    // Update the isAdmin field and hashed password for John Doe
    const updatedUser = await prisma.employees.update({
        where: { email: 'john.doe@example.com' },
        data: {
            isAdmin: true,
            password: johnHashedPassword, // Ensure the password is hashed
        },
    });
    console.log('Updated User:', updatedUser);

    // Hashing password for Jane Smith
    const janeHashedPassword = await bcrypt.hash('password456', 10); // Hash Jane's password

    const user2 = await prisma.employees.update({
        where: { email: 'jane.smith@example.com' },
        data: {
            forename: 'Jane',
            surname: 'Smith',
            password: janeHashedPassword, // Update to hashed password
        },
    });
    console.log({ updatedUser, user2 });
}

main()
    .catch(e => {
        console.error('Error:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

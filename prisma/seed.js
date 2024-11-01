import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    // Hashing password for John Doe
    const johnHashedPassword = await bcrypt.hash('password123', 10); // Hash John's password

    // Creating John Doe with admin rights
    const johnUser = await prisma.employees.create({
        data: {
            forename: 'John',
            surname: 'Doe',
            email: 'john.doe@example.com',
            password: johnHashedPassword, // Ensure the password is hashed
            isAdmin: true, // Set admin status
            // createdAt and updatedAt will be set automatically
        },
    });
    console.log('Created User:', johnUser);

    // Hashing password for Jane Smith
    const janeHashedPassword = await bcrypt.hash('password456', 10); // Hash Jane's password

    // Creating Jane Smith
    const janeUser = await prisma.employees.create({
        data: {
            forename: 'Jane',
            surname: 'Smith',
            email: 'jane.smith@example.com',
            password: janeHashedPassword, // Ensure the password is hashed
            isAdmin: false, // Set admin status to false
            // createdAt and updatedAt will be set automatically
        },
    });
    console.log('Created User:', janeUser);
}

main()
    .catch(e => {
        console.error('Error:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

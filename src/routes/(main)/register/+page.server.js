// src/routes/register/+server.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const actions = {
    register: async ({ request }) => {
        const formData = await request.formData();
        const forename = formData.get('forename');
        const surname = formData.get('surname');
        const email = formData.get('email');
        const password = formData.get('password');

        // Check if the user already exists
        const existingUser = await prisma.employees.findUnique({ where: { email } });
        if (existingUser) {
            return { error: 'Email is already in use. Please choose another one.' };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        await prisma.employees.create({
            data: {
                forename,
                surname,
                email,
                password: hashedPassword,
            },
        });

        // Optionally, you could create a JWT here if desired
        // const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });

        // Return success message
        return { success: true }; // or redirect logic as needed
    }
};


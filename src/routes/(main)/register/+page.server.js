import { redirect } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const actions = {
    register: async ({ request }) => {
        const formData = await request.formData();
        const forename = formData.get("forename");
        const surname = formData.get("surname");
        const email = formData.get("email");
        const password = formData.get("password");

        console.log('Registration attempt:', { forename, surname, email }); // Debugging: Log registration attempt

        // Check if email already exists
        const existingUser = await prisma.employees.findUnique({
            where: { email }
        });

        if (existingUser) {
            console.log('Email already in use:', email); // Debugging: Log if email exists
            throw redirect(302, `/register?error=${encodeURIComponent("Email already in use")}`);
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword); // Debugging: Log the hashed password

        // Create the new user
        await prisma.employees.create({
            data: {
                forename,
                surname,
                email,
                password: hashedPassword,
                isAdmin: false, // Default to non-admin user
            }
        });

        console.log('User created successfully:', { forename, surname, email }); // Debugging: Log successful user creation

        // Redirect to login after successful registration
        throw redirect(302, "/login");
    }
};

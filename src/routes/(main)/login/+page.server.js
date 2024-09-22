import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const actions = {
    login: async ({ request }) => {
        // 1. Extract form data (email and password)
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');

        // 2. Query the database to find the user by email
        const user = await prisma.employees.findUnique({ where: { email } });

        // 3. Check if user exists and the password matches
        if (user && user.password === password) {
            throw redirect(302, '/dashboard');
        }else{
            const errorMessage = 'Incorrect password. Please try again.';
                // Redirect to the login page with an error message in query parameters
                throw redirect(302, `/login?error=${encodeURIComponent(errorMessage)}`);
        }
    }
};

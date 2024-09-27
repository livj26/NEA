import { PrismaClient } from '@prisma/client'; 
import { redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt'; 
import { serialize } from 'cookie'; // Import cookie serialization function
import { nanoid } from 'nanoid'; // Import nanoid for generating unique session tokens

const prisma = new PrismaClient();

export const actions = {
    login: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');

        console.log('Logging in user:', email); // Debug log

        // Query the database to find the user by email
        const user = await prisma.employees.findUnique({ where: { email } });

        console.log('User found:', user); // Debug log

        // Check if user exists and verify password
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log('Password valid:', isPasswordValid); // Debug log

            if (isPasswordValid) {
                // Create a unique session token
                const sessionToken = nanoid();

                // Create a new session in the database
                await prisma.sessions.create({
                    data: {
                        token: sessionToken,
                        employeeid: user.employeeid // Foreign key to employees
                    }
                });

                // Set the session token cookie
                const cookieOptions = {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: process.env.NODE_ENV === 'production',
                };

                // Set the cookie header
                const headers = new Headers();
                headers.append('Set-Cookie', serialize('session', sessionToken, cookieOptions));

                // Redirect to the appropriate dashboard
                if (user.isAdmin) {
                    console.log('Redirecting to admin dashboard'); // Debug log
                    throw redirect(302, '/admindash', { headers });
                } else {
                    console.log('Redirecting to user dashboard'); // Debug log
                    throw redirect(302, '/dashboard', { headers });
                }
            }
        }

        const errorMessage = 'Incorrect email or password. Please try again.';
        console.log('Login failed:', errorMessage); // Debug log
        throw redirect(302, `/login?error=${encodeURIComponent(errorMessage)}`);
    }
};

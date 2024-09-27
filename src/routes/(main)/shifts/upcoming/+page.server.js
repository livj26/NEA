import { PrismaClient } from '@prisma/client'; 
import { redirect } from '@sveltejs/kit'; 
import { parse } from 'cookie';

const prisma = new PrismaClient();

export const actions = {
    logout: async ({ request }) => {
        const cookies = request.headers.get('cookie') || '';
        const parsedCookies = parse(cookies);
        const sessionToken = parsedCookies.session;

        if (sessionToken) {
            await prisma.sessions.deleteMany({
                where: { token: sessionToken }
            });
        }

        // Clear the session cookie
        const cookieOptions = {
            path: '/',
            maxAge: -1 // Set maxAge to -1 to delete the cookie
        };

        const headers = new Headers();
        headers.append('Set-Cookie', `session=; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`);

        // Redirect to the login page
        throw redirect(302, '/login', { headers });
    }
};

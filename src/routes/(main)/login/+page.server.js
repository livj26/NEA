import { cookieOptions } from "$lib/server/utils";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import { redirect } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const actions = {
    login: async ({ request, cookies }) => {
        const formData = await request.formData();
        const email = formData.get("email");
        const password = formData.get("password");

        // Find user by email
        const user = await prisma.employees.findUnique({
            where: { email },
            select: { employeeid: true, password: true, isAdmin: true }
        });
        console.log(user)

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                const sessionToken = nanoid();
                console.log(sessionToken)

                // Store session token in database
                await prisma.sessions.create({
                    data: {
                        token: sessionToken,
                        employeeid: user.employeeid,
                    },
                });

                cookies.set("auth-token", sessionToken, cookieOptions);
                cookies.set("employeeId", user.employeeid, cookieOptions);

                // Redirect based on user role
                throw redirect(302, user.isAdmin ? "/admindash" : "/dashboard");
            }
        }

        // Redirect on failure
        throw redirect(302, `/login?error=${encodeURIComponent("Incorrect email or password")}`);
    },
};



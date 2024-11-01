
import { authenticate } from "$lib/server/authenticate";
import { redirect } from "@sveltejs/kit";

export const handle = async ({ event, resolve }) => {
    // Define protected routes
    const isProtectedRoute =
        event.url.pathname.startsWith("/dashboard") ||
        event.url.pathname.startsWith("/admindash");

    // Check if the user is authenticated
    const auth = await authenticate(event.cookies); // Ensure to await the authenticate function
    event.locals.employeeid = auth
    console.log("Hooks:", event.locals.employeeid);
    if (isProtectedRoute && !auth) {
        // Redirect to login if user is not authenticated
        throw redirect(307, "/login");
    }

    // Continue to resolve the request if authenticated
    return resolve(event);
};

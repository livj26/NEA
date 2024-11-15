import { authenticate } from "$lib/server/authenticate";
import { redirect } from "@sveltejs/kit";

export const handle = async ({ event, resolve }) => {
    const auth = await authenticate(event.cookies);

    event.locals.employeeid = auth ? auth.employeeid : null;
    event.locals.isAdmin = auth ? auth.isAdmin : false;
    console.log("Hooks:", event.locals);

    // Define protected routes
    const isAdminRoute = ['/rota', '/editdb', '/admindash', 'adminshifts', 'employees'].some(path =>
        event.url.pathname.startsWith(path)
    );
    const isUserRoute = ['/dashboard', '/shifts', '/availability'].some(path =>
        event.url.pathname.startsWith(path)
    );

    // Redirect non-authenticated users for protected routes
    if ((isAdminRoute || isUserRoute) && !auth) {
        throw redirect(307, "/login");
    }

    // Redirect non-admin users for admin-only routes
    if (isAdminRoute && !event.locals.isAdmin) {
        throw redirect(307, "/dashboard"); // Redirect to a non-admin page
    }

    // Continue to resolve the request if authenticated and authorized
    return resolve(event);
};

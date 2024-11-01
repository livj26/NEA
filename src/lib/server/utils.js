
const oneDay = 60 * 60 * 24;

export const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: oneDay,
};

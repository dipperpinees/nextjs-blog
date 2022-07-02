import client from "./apollo/apollo-client";
import { AUTH } from "./apollo/auth";

export const checkLoggedIn = async (Cookie: string) => {
    try {
        if (!Cookie || !Cookie.includes('token')) {
            return null;
        }

        const data:any = await client.query({
            query: AUTH,
            context: { headers: { Cookie } },
            fetchPolicy: 'no-cache',
        });

        return data.data.Auth;
    } catch (e: any) {
        console.log(e);
        return null;
    }
};
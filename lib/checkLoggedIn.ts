import { client } from "./apollo";
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
        return null;
    }
};
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
    link: createUploadLink({
        uri: process.env.NEXT_PUBLIC_APOLLO_URI,
    }),
    cache: new InMemoryCache(),
});

export default client;
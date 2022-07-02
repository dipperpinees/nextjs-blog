import { gql } from '@apollo/client';

export const USER_PROFILE = gql`
    query ($id: Int!) {
        GetUserById(id: $id) {
            id
            name
            avatar
            followerNumber
            followingNumber
            isFollowed
            posts {
                id
                title
                thumbnail
                views
                createdAt
                updatedAt
                description
                category {
                    id
                    title
                }
                author {
                    id
                    name
                    avatar
                }
            }
        }
    }
`;


export const FOLLOW = gql`
    mutation ($id: Int!) {
        Follow(followingId: $id)
    }
`;

export const UNFOLLOW = gql`
    mutation ($id: Int!) {
        UnFollow(followingId: $id)
    }
`

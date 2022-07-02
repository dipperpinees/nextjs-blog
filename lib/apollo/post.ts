import { gql } from '@apollo/client';

export const UPLOAD_IMAGE = gql`
    mutation ($file: Upload!) {
        UploadImage(image: $file)
    }
`;

export const CREATE_POST = gql`
    mutation CreatePost($postData: CreatePostInput!) {
        CreatePost(postData: $postData) {
            id
        }
    }
`;

export const HOME_POSTS = gql`
    query ($filterData: FilterPostInput!) {
        FilterPost(filterData: $filterData) {
            docs {
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

export const GET_POST_BY_ID = gql`
    query ($id: Int!) {
        GetPostById(id: $id) {
            id
            title
            content
            thumbnail
            views
            description
            comments {
                id
                content
                author {
                    id
                    name
                    avatar
                }
                createdAt
                updatedAt
            }
            author {
                id
                name
                avatar
            }
            category {
                id
                title
            }
            createdAt
            updatedAt
        }
    }
`;

export const GET_ALL_CATEGORY = gql`
    query {
        GetAllCategory {
            id
            title
        }
    }
`;

export const POST_COMMENT = gql`
    mutation ($commentData: CreateCommentInput!) {
        CreateComment(commentData: $commentData) {
            id
        }
    }
`;

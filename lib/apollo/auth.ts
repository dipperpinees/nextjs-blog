import { gql } from "@apollo/client";

export const SIGN_UP = gql`
    mutation ($file: Upload, $signUpData: SignUpInput!) {
        SignUp (avatar: $file, signUpData: $signUpData) {
            user {
                id
                name
                avatar
            }
        }
    }
`

export const SIGN_IN = gql`
    mutation ($signInData: SignInInput!) {
        SignIn (signInData: $signInData) {
            user {
                id
                name
                avatar
            }
        }
    }
`

export const AUTH = gql`
    query Auth {
        Auth {
            id
            avatar
            name
        }
    }
`

export const LOG_OUT = gql`
    mutation {
        LogOut
    }
`
import { gql } from "@apollo/client";

export const SignUpMutation = gql`
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

export const SignInMutation = gql`
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

export const AuthQuery = gql`
    query Auth {
        Auth {
            id
            avatar
            name
        }
    }
`

export const LogOutMutation = gql`
    mutation {
        LogOut
    }
`
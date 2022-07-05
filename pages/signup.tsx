import { useMutation } from '@apollo/client';
import { Button, TextField } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { SIGN_UP } from '../lib/apollo/auth';
import loadingStore from '../store/loadingStore';
import userStore from '../store/userStore';

export interface ISignUpProps {}

export default function SignUp(props: ISignUpProps) {
    const [signUpMutate] = useMutation(SIGN_UP);
    const setUser = userStore((state) => state.setUser);
    const setIsLoading = loadingStore((state) => state.setIsLoading);
    const router = useRouter();

    const signUp = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const email = e.target.email.value;
            const name = e.target.name.value;
            const password = e.target.password.value;
            const {
                data: {
                    SignUp: { user },
                },
            } = await signUpMutate({
                variables: {
                    signUpData: { name, email, password },
                },
            });
            setUser(user);
            router.push('/');
        } catch (e) {}
        setIsLoading(false);
    };

    return (
        <>
            <Head>
                <title>Đăng kí tài khoản</title>
            </Head>

            <form className="sign-up" onSubmit={signUp}>
                <div className="logo">
                    <img src="/favicon.png" />
                    <h1>
                        <i>
                            bl<span>o</span>gify
                        </i>
                    </h1>
                </div>
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    style={{ margin: 4 }}
                    name="email"
                    required
                />
                <TextField
                    id="outlined-basic"
                    label="Tên"
                    variant="outlined"
                    style={{ margin: 4 }}
                    name="name"
                    required
                />
                <TextField
                    id="outlined-basic"
                    label="Mật khẩu"
                    variant="outlined"
                    type="password"
                    style={{ margin: 4 }}
                    name="password"
                    required
                />

                <Button variant="contained" style={{ margin: 4 }} type="submit">
                    Đăng kí
                </Button>
            </form>
        </>
    );
}

import { useMutation } from '@apollo/client';
import { Avatar, Button, IconButton, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { SignUpMutation } from '../lib/apollo/auth';
import loadingStore from '../store/loadingStore';
import userStore from '../store/userStore';

export interface ISignUpProps {}

export default function SignUp(props: ISignUpProps) {
    const [signUpMutate] = useMutation(SignUpMutation);
    const inputFile = useRef<any>(null);
	const setUser = userStore((state) => state.setUser);
    const [avatar, setAvatar] = useState<any>(null);
    const setIsLoading = loadingStore((state) => state.setIsLoading);
	const router = useRouter();

    const handleChangeImage = (e: any) => {
        setAvatar(URL.createObjectURL(e.target.files[0]));
    };

    const signUp = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const email = e.target.email.value;
            const name = e.target.name.value;
            const password = e.target.password.value;
            const {data: {SignUp: {user}}} = await signUpMutate({
                variables: {
                    file: e.target.avatar.files[0],
                    signUpData: { name, email, password },
                },
            });
			setUser(user);
			router.push("/");
        } catch (e) {
        }
		setIsLoading(false);
    };

    return (
        <form className="sign-up" onSubmit={signUp}>
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
            <input
                type="file"
                style={{ display: 'none' }}
                ref={inputFile}
                name="avatar"
                onChange={handleChangeImage}
                accept="image/*"
            />
            <IconButton
                style={{
                    margin: 'auto',
                    width: '140px',
                    height: '140px',
                }}
                onClick={() => {
                    inputFile.current.click();
                }}
            >
                <Avatar src={avatar} style={{ width: '132px', height: '132px' }} />
            </IconButton>
            <Button variant="contained" style={{ margin: 4 }} type="submit">
                Đăng kí
            </Button>
        </form>
    );
}

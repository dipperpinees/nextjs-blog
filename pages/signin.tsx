import { useMutation } from "@apollo/client";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { SIGN_IN } from "../lib/apollo/auth";
import loadingStore from "../store/loadingStore";
import userStore from "../store/userStore";

export interface ISignInProps {
    
}

export default function SignIn (props: ISignInProps) {
  const [signInMutate] = useMutation(SIGN_IN);
  const router = useRouter();
  const setUser = userStore((state) => state.setUser);
  const setIsLoading = loadingStore((state) => state.setIsLoading);
  const handleSignIn = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const {data: {SignIn: {user}}}:any = await signInMutate({
        variables: {signInData: {
          email: e.target.email.value, 
          password: e.target.password.value
        }}
      })
      setUser(user);
      router.push("/");
    } catch (e:any) {
      alert(e.message);
    }
    setIsLoading(false);
  }
  return (
    <form className="sign-in" onSubmit={handleSignIn}>
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
        label="Mật khẩu"
        variant="outlined"
        type="password"
        style={{ margin: 4 }}
        name="password"
        required
      />
      <Button variant="contained" style={{ margin: 4 }} type="submit">
        Đăng nhập
      </Button>
    </form>
  );
}


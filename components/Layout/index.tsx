import { ReactNode } from "react";
import Header from "./Header";

type Props = {
    children: ReactNode
}

const Layout = ({ children }: Props) => (
  <>
    <Header />
    {children}
  </>
);

export default Layout;
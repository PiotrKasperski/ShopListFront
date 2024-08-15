import {
  useStorage,
  useStorageItem,
} from "@capacitor-community/react-hooks/storage";
import { ReactNode } from "react";
import { Redirect } from "react-router";
type Props = { children?: ReactNode; token: string };
const PrivateRoute = ({ children, token }: Props) => {
  console.log(token);
  return token ? <>{children}</> : <Redirect to="/users" />;
};
export default PrivateRoute;

import {
  useStorage,
  useStorageItem,
} from "@capacitor-community/react-hooks/storage";
import { ReactNode } from "react";
import { Redirect } from "react-router";
type Props = { children?: ReactNode; token: string };
const PrivateRoute = ({ children, token }: Props) => {
  console.log("private route token", token);
  return !!token || token === "null" ? (
    <>{children}</>
  ) : (
    <Redirect to="/users" />
  );
};
export default PrivateRoute;

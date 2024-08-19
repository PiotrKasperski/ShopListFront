import {
  useStorage,
  useStorageItem,
  availableFeatures,
} from "@capacitor-community/storage-react";
import { useCallback } from "react";
import UserModel from "../models/UserModel";
import useApi from "./useApi";

interface AuthResults {
  isLogged: () => Promise<boolean>;
  login: (name: string, password: string) => Promise<string>;
  logout: () => Promise<string>;
  token: () => Promise<string>;
}

const useAuth = () => {
  const { get, set, remove, getKeys, clear } = useStorage();
  const { post } = useApi();
  const token = async () => await get("access_token");
  const setToken = async (token: string) => await set("access_token", token);
  const isLogged = useCallback(async () => {
    return (await token) !== null;
  }, []);
  const login = useCallback(async (name: string, password: string) => {
    const response = await post("users/login/", {
      userName: name,
      password: password,
    });
    console.log("response token", response);
    await set("access_token", response.data.access_token);
    console.log("saved_token", await get("access_token"));

    return response.data.access_token;
  }, []);
  const logout = useCallback(async () => {
    await setToken("");
    return "success";
  }, []);
  const getToken = useCallback(async () => {
    return await token;
  }, []);
  const register = useCallback(async (name: string, password: string) => {
    const response = await post("users/register", {
      userName: name,
      password: password,
    });
    return await login(response.name, password);
  }, []);
  return { isLogged, login, logout, token, register };
};
export default useAuth;

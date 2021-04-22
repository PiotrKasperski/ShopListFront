import {useStorageItem} from "@capacitor-community/react-hooks/storage";
import {useCallback} from "react";
import UserModel from "../models/UserModel";
import useApi from "./useApi";

interface AuthResults {
    isLogged: () => Promise<boolean>;
    login: (name: string, password: string) => Promise<string>;
    logout: () => Promise<string>;
    token: () => Promise<string>;
}

const useAuth = () => {
    const [starageToken, setToken] = useStorageItem("access_token");
    const {post} = useApi();
    const isLogged = useCallback(async () => {
        return (await starageToken) !== null;
    }, []);
    const login = useCallback(async (name: string, password: string) => {
        const response = await post("users/login/", {
            userName: name,
            password: password,
        });
        await setToken(response.data.access_token);
        return response.data.access_token;
    }, []);
    const logout = useCallback(async () => {
        await setToken(null);
        return "success";
    }, []);
    const token = useCallback(async () => {
        return await starageToken;
    }, []);
    const register = useCallback(async (name: string, password: string) => {
        const response = await post("user/register", {userName: name, password: password});
        return await login(response.name, password);
    },[]);
    return {isLogged, login, logout, token, register};
};
export default useAuth;

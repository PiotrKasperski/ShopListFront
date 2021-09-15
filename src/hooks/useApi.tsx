import axios, { AxiosInstance, AxiosPromise } from "axios";
import { useCallback } from "react";
import api from "../Services/api";

interface crudInterface {
  post: (url: string, data: any) => Promise<any>;
  api: AxiosInstance;
}
const useApi = (): crudInterface => {
  const post = useCallback(async (url: string, data: any) => {
    return await api.post(url, data);
  }, []);
  const api = axios.create({
    baseURL: "http://localhost:3000/",
  });
  return { post, api };
};
export default useApi;

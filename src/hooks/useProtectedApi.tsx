import {
  useStorage,
  useStorageItem,
} from "@capacitor-community/react-hooks/storage";
import { useCallback, useEffect, useState } from "react";
import useApi from "./useApi";
import useAuth from "./useAuth";

interface crudInterface {
  post: (url: string, data: any) => Promise<any>;
  get: (url: string) => Promise<any>;
  update: (url: string, data: any) => Promise<any>;
  remove: (url: string) => Promise<any>;
}
const useProtectedApi = (): crudInterface => {
  const [token, setToken] = useStorageItem("access_token");
  const { api } = useApi();
  const [headers, setHeaders] = useState({
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Imtsb25layIsInVzZXJJRCI6MiwiaWF0IjoxNzIzNjU2NTY5LCJleHAiOjE3MzIyOTY1Njl9.oqpiipDBLv6kqQaU3yWltxLDrPRLprTvxBM1No-7r_U`,
    },
  });

  useEffect(() => {
    const effect = async () => {
      console.log("effect token", token);
      await updateheaders();
    };
    effect();
  }, []);
  const updateheaders = async () => {
    setHeaders({
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  const post = useCallback(async (url: string, data: any) => {
    console.log(headers.headers);
    console.log("post token", token);
    return await api.post(url, data, headers);
  }, []);

  const get = useCallback(async (url: string) => {
    console.log(headers);
    return await api.get(url, headers);
  }, []);
  const update = useCallback(async (url: string, data: any) => {
    return await api.put(url, data, headers);
  }, []);
  const remove = useCallback(async (url: string) => {
    return await api.delete(url, headers);
  }, []);
  return { post, get, update, remove };
};
export default useProtectedApi;

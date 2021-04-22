import { useCallback, useEffect, useState } from "react";
import useApi from "./useApi";
import useAuth from "./useAuth";

interface crudInterface {
  post: (url: string, data: any) => Promise<any>;
  get: (url: string) => Promise<any>;
  update: (url: string, data: any) => Promise<any>;
  remove: (url: string, data: any) => Promise<any>;
}
const useProtectedApi = (): crudInterface => {
  const { token } = useAuth();
  const { api } = useApi();
  const [headers, setHeaders] = useState({
    headers: { Authorization: `Bearer ` },
  });

  useEffect(() => {
    const effect = async () => {
      console.log(await token());
      await updateheaders();
    };
    effect();
  });
  const updateheaders = async () => {
    setHeaders({
      headers: { Authorization: `Bearer ${await token()}` },
    });
  };
  const post = useCallback(async (url: string, data: any) => {
    return await api.post(url, data, headers);
  }, []);

  const get = useCallback(async (url: string) => {
    return await api.post(url, headers);
  }, []);
  const update = useCallback(async (url: string, data: any) => {
    return await api.post(url, data, headers);
  }, []);
  const remove = useCallback(async (url: string, data: any) => {
    return await api.post(url, data, headers);
  }, []);
  return { post, get, update, remove };
};
export default useProtectedApi;

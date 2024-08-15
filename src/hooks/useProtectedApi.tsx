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
  const storage = useStorage();
  //const token = async () => await storage.get("access_token");
  const { api } = useApi();

  const getHeaders = async () => {
    return {
      Authorization: `Bearer ${await storage.get("access_token")}`,
    };
  };
  const post = useCallback(async (url: string, data: any) => {
    return await api.post(url, data, { headers: await getHeaders() });
  }, []);

  const get = useCallback(async (url: string) => {
    return await api.get(url, { headers: await getHeaders() });
  }, []);

  const update = useCallback(async (url: string, data: any) => {
    return await api.put(url, data, { headers: await getHeaders() });
  }, []);

  const remove = useCallback(async (url: string) => {
    return await api.delete(url, { headers: await getHeaders() });
  }, []);

  return { post, get, update, remove };
};
export default useProtectedApi;

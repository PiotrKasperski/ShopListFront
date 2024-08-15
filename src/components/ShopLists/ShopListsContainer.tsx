import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
} from "@ionic/react";
import React, { useCallback, useEffect, useState } from "react";
import ShopListContainer from "./ShopListContainer";
import api from "../../Services/api";
import { add } from "ionicons/icons";
import AddShopListFab from "./AddShopListFab";
import {
  useStorage,
  useStorageItem,
} from "@capacitor-community/react-hooks/storage";
import useProtectedApi from "../../hooks/useProtectedApi";
import ShopListModel from "../../models/ShopListsModel";

function ShopListsContainer() {
  const [shopLists, setShopLists] = useState<ShopListModel[]>([]);
  const [token, setToken] = useStorageItem("access_token");
  const { get } = useProtectedApi();
  useEffect(() => {
    const effect = async () =>
      getShopLists().then((response) => {
        console.log("getShopLists success");
        setShopLists(response);
      });
    effect();
  }, []);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getShopLists = async () => {
    return await get("shop-lists/")
      .then((respone) => {
        return respone.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addNewShopList = (newShopListName: string) => {
    api
      .post("shop-lists/", { name: newShopListName }, config)
      .then((response) => {
        setShopLists([...shopLists, { ...response.data }]);
        console.log("add shop list response", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <IonPage>
      <IonContent>
        <IonList>
          {shopLists.map((shopList) => {
            return (
              <ShopListContainer
                shopList={shopList}
                onDelete={() => {
                  setShopLists([]);
                  getShopLists();
                }}
              />
            );
          })}
        </IonList>
      </IonContent>
      <AddShopListFab
        onAddListClick={(newListName) => {
          addNewShopList(newListName);
          console.log(newListName);
        }}
      />
    </IonPage>
  );
}

export default ShopListsContainer;

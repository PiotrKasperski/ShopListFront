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

function ShopListsContainer() {
  const [shopLists, setShopLists] = useState([]);
  const [newList, setNewList] = useState("");
  const [token, setToken] = useStorageItem("access_token");
  const { get } = useProtectedApi();
  useEffect(() => {
    getShopLists().then((response)=>{setShopLists(response);});
  });

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getShopLists = async () => {
    console.log("token from container", token);
    return await get("shop-lists/")
      .then((respone) => {
        return respone.data})
      .catch((error) => {
        console.log(error);
      });
  };
  const addNewShopList = (newShopListName: string) => {
    api
      .post("shop-lists/", { name: newShopListName }, config)
      .then((response) => {
        console.log(response);
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

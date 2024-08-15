import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
} from "@ionic/react";
import React, { Dispatch, useCallback, useEffect, useState } from "react";
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
  const lists: Array<
    [ShopListModel, React.Dispatch<React.SetStateAction<ShopListModel>>]
  > = [[...useState<ShopListModel>({} as ShopListModel)]];
  const [shopLists, setShopLists] = useState<ShopListModel[]>([]);
  const [token, setToken] = useStorageItem("access_token");
  const { get } = useProtectedApi();
  useEffect(() => {
    const effect = async () =>
      getShopLists().then((response) => {
        console.log("getShopLists success");
      });
    effect();
  }, []);
  useEffect(() => {
    const effect = async () => console.log("getShopLists success");
    console.log(shopLists);
    effect();
  }, [shopLists]);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getShopLists = async () => {
    return await get("shop-lists/")
      .then((response) => {
        console.log(response.data);
        setShopLists((list) => response.data);
        return response.data;
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
  const onDeleteList = (shopList: ShopListModel): void => {
    setShopLists((shopListsState) => {
      return shopListsState.splice(shopListsState.indexOf(shopList), 1);
    });
  };
  return (
    <IonPage>
      <IonContent>
        <IonList>
          {shopLists.map((shopList) => {
            console.log(shopList);
            return (
              <ShopListContainer
                shopList={shopList}
                onDelete={(shopList) => {
                  onDeleteList(shopList);
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

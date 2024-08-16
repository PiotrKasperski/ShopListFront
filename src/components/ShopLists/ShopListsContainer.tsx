import React, { useEffect, useState } from "react";
import { IonContent, IonList, IonPage } from "@ionic/react";
import ShopListContainer from "./ShopListContainer";
import api from "../../Services/api";
import { useStorageItem } from "@capacitor-community/react-hooks/storage";
import useProtectedApi from "../../hooks/useProtectedApi";
import AddShopListFab from "./AddShopListFab";
import ShopListModel from "../../models/ShopListsModel";

function ShopListsContainer() {
  const [shopLists, setShopLists] = useState<ShopListModel[]>([]);
  const { get, post } = useProtectedApi();

  useEffect(() => {
    get("shop-lists/")
      .then(({ data }) => setShopLists(data))
      .catch(console.log);
  }, [get]);
  useEffect(() => console.log("Updated shopLists:", shopLists), [shopLists]);

  const addNewShopList = async (name: string) =>
    post("shop-lists/", { name })
      .then(({ data }) => setShopLists((lists) => [...lists, data]))
      .catch(console.log);

  const onDeleteList = (shopList: ShopListModel) =>
    setShopLists((lists) => lists.filter((item) => item !== shopList));

  return (
      <IonContent>
        <IonList>
          {shopLists.map((shopList) => (
            <ShopListContainer
              key={shopList.shopListID}
              shopList={shopList}
              onDelete={() => onDeleteList(shopList)}
            />
          ))}
        </IonList>
      </IonContent>
      <AddShopListFab onAddListClick={(name) => addNewShopList(name)} />
    </IonPage >
  );
}

export default ShopListsContainer;

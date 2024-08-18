import React, { useEffect, useState } from "react";
import { IonContent, IonList, IonPage } from "@ionic/react";
import ShopListContainer from "./ShopListContainer";
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

  const addNewShopList = async (name: string) =>
    post("shop-lists/", { name })
      .then(({ data }) => setShopLists((lists) => [...lists, data]))
      .catch(console.log);

  const onDeleteList = (shopList: ShopListModel) =>
    setShopLists((lists) => lists.filter((item) => item !== shopList));

  return (
    <IonPage data-testid="shop-lists-page">
      <IonContent>
        <IonList data-testid="shop-lists">
          {shopLists.map((shopList) => (
            <ShopListContainer
              key={shopList.shopListID}
              shopList={shopList}
              onDelete={() => onDeleteList(shopList)}
              data-testid={`shop-list-container-${shopList.shopListID}`}
            />
          ))}
        </IonList>
      </IonContent>
      <AddShopListFab
        onAddListClick={(name) => addNewShopList(name)}
        data-testid="add-shop-list-fab"
      />
    </IonPage>
  );
}

export default ShopListsContainer;

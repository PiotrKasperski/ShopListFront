import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonPopover,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import { menu } from "ionicons/icons";
import React, { useState } from "react";
import useProtectedApi from "../../hooks/useProtectedApi";
import ShopListModel from "../../models/ShopListsModel";
import ProductListcontainer from "../ProductList/ProdctListConteiner";

interface Props {
  shopList: ShopListModel;
  onDelete: (shopList: ShopListModel) => void;
}

function ShopListContainer(props: Props) {
  const { remove } = useProtectedApi();
  const [shopList, setShopList] = useState(props.shopList);
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });

  const handleDeleteListButtonClick = () => {
    remove("shop-lists/" + shopList.shopListID)
      .then((response) => {
        console.log("removed shop list", response.data);
        props.onDelete(shopList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <IonCard>
      <IonCardHeader color="secondary">
        <IonToolbar color="secondary">
          <IonCardTitle>{shopList.name}</IonCardTitle>
          <IonButton
            slot="end"
            fill="clear"
            onClick={(e: any) => {
              e.persist();
              setShowPopover({ showPopover: true, event: e });
            }}
            data-testid="menu-button"
          >
            <IonIcon icon={menu} />
          </IonButton>
        </IonToolbar>
      </IonCardHeader>

      <ProductListcontainer isActive={true} shopListID={shopList.shopListID} />
      <IonPopover
        isOpen={popoverState.showPopover}
        event={popoverState.event}
        onDidDismiss={() =>
          setShowPopover({ showPopover: false, event: undefined })
        }
        data-testid="popover"
      >
        <IonButton
          fill="clear"
          expand="full"
          color="danger"
          onClick={() => {
            handleDeleteListButtonClick();
            setShowPopover({ showPopover: false, event: undefined });
          }}
          data-testid="delete-button"
        >
          Usuń
        </IonButton>
      </IonPopover>
    </IonCard>
  );
}

export default ShopListContainer;

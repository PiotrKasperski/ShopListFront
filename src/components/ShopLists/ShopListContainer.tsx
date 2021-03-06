import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPopover,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  arrowDown,
  arrowDownOutline,
  arrowUpOutline,
  menu,
  thermometerOutline,
} from "ionicons/icons";
import React, { createRef, useEffect, useRef, useState } from "react";
import ShopListModel from "../../models/ShopListsModel";
import api from "../../Services/api";
import ProductListcontainer from "../ProductList/ProdctListConteiner";

interface Props {
  shopList: ShopListModel;
  onDelete: () => void;
}
function ShopListContainer(props: Props) {
  const [shopList, setShopList] = useState(props.shopList);
  const [isActive, setActive] = useState(true);
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });

  const handleDeleteListButtonClick = () => {
    api
      .delete("shop-lists/" + shopList.shopListID)
      .then((response) => {
        console.log(response.data);
        props.onDelete();
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
          >
            <IonIcon icon={menu} />
          </IonButton>
        </IonToolbar>
      </IonCardHeader>

      <ProductListcontainer
        isActive={isActive}
        shopListID={shopList.shopListID}
      />
      <IonPopover
        isOpen={popoverState.showPopover}
        event={popoverState.event}
        onDidDismiss={() =>
          setShowPopover({ showPopover: false, event: undefined })
        }
      >
        <IonButton
          fill="clear"
          expand="full"
          color="danger"
          onClick={() => {
            handleDeleteListButtonClick();
            setShowPopover({ showPopover: false, event: undefined });
          }}
        >
          Usu??
        </IonButton>
      </IonPopover>
    </IonCard>
  );
}

export default ShopListContainer;

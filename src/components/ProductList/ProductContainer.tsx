import {
  IonCheckbox,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import React, { useState } from "react";
import ProductModel from "../../models/ProductModel";
import api from "../../Services/api";
interface Props {
  product: ProductModel;
  onDelete: (id: number) => void;
  onChange: (newProduct: ProductModel) => void;
}

function ProductContainer(props: Props) {
  const [product, setProduct] = useState(props.product);

  const handleNameChange = (name: string) => {
    product.productName = name;
    setProduct(product);
    props.onChange(product);
  };
  const handleCountChange = (count: number) => {
    product.count = count;
    setProduct(product);
    props.onChange(product);
  };

  const handleCheckedChange = (isChecked: boolean) => {
    product.isChecked = isChecked;
    setProduct(product);
    props.onChange(product);
  };

  const handleDeleteButtonClick = () => {
    props.onDelete(product.itemID);
  };
  return (
    <IonItemSliding>
      <IonItem>
        <IonInput
          value={product.productName}
          placeholder="Produkt"
          onIonChange={(e) => {
            handleNameChange(e.detail.value!);
          }}
          type="text"
        />
        <IonLabel>Ilość:</IonLabel>
        <IonInput
          size={3}
          value={product.count}
          onIonChange={(e) => {
            handleCountChange(parseInt(e.detail.value!));
          }}
          type="number"
        />
        <IonCheckbox
          onIonChange={(e) => {
            handleCheckedChange(e.detail.checked);
          }}
          checked={product.isChecked}
        />
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption
          onClick={() => {
            handleDeleteButtonClick();
          }}
          color="danger"
          expandable
        >
          <IonIcon icon={trash} size="large" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
}

export default ProductContainer;

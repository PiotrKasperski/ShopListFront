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

interface Props {
  product: ProductModel;
  onDelete: (id: number) => void;
  onChange: (updatedProduct: ProductModel) => void;
}

const ProductContainer: React.FC<Props> = ({ product, onDelete, onChange }) => {
  const [currentProduct, setCurrentProduct] = useState(product);

  const updateProduct = (field: keyof ProductModel, value: any) => {
    const updatedProduct = { ...currentProduct, [field]: value };
    setCurrentProduct(updatedProduct);
    onChange(updatedProduct);
  };

  return (
    <IonItemSliding>
      <IonItem>
        <IonInput
          data-testid="product-name-input"
          value={currentProduct.productName}
          placeholder="Produkt"
          onIonChange={(e) => updateProduct("productName", e.detail.value!)}
          type="text"
        />
        <IonLabel>Ilość:</IonLabel>
        <IonInput
          data-testid="product-count-input"
          maxlength={3}
          value={currentProduct.count}
          onIonChange={(e) =>
            updateProduct("count", parseInt(e.detail.value!, 10))
          }
          type="number"
        />
        <IonCheckbox
          data-testid="product-checkbox"
          checked={currentProduct.isChecked}
          onIonChange={(e) => updateProduct("isChecked", e.detail.checked)}
        />
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption
          data-testid="delete-btn"
          onClick={() => onDelete(currentProduct.itemID)}
          color="danger"
          expandable
        >
          <IonIcon icon={trash} size="large" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default ProductContainer;

import {
  IonButton,
  IonCardContent,
  IonIcon,
  IonList,
  IonToolbar,
} from "@ionic/react";
import { addOutline, arrowDownOutline, arrowUpOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import ProductModel from "../../models/ProductModel";
import useProtectedApi from "../../hooks/useProtectedApi";
import ProductContainer from "./ProductContainer";

interface Props {
  shopListID: number;
  isActive: boolean;
}

const ProductListContainer: React.FC<Props> = ({ shopListID, isActive }) => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [isExpanded, setIsExpanded] = useState(isActive);
  const { get, post, update, remove } = useProtectedApi();

  useEffect(() => {
    if (isExpanded) {
      fetchProducts();
    }
  }, [isExpanded]);

  const fetchProducts = () => {
    get(`items/findByShopID/?id=${shopListID}`)
      .then(({ data }) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  const updateProduct = (updatedProduct: ProductModel) => {
    update(`items/${updatedProduct.itemID}`, updatedProduct)
      .then(() => fetchProducts())
      .catch((error) => console.error("Error updating product:", error));
  };

  const addProduct = () => {
    post("items/", { shopListID })
      .then(() => fetchProducts())
      .catch((error) => console.error("Error adding product:", error));
  };

  const deleteProduct = (id: number) => {
    remove(`items/${id}`)
      .then(() => fetchProducts())
      .catch((error) => console.error("Error deleting product:", error));
  };

  return (
    <IonCardContent>
      {isExpanded && (
        <IonList>
          {products.map((product) => (
            <ProductContainer
              key={product.itemID}
              product={product}
              onChange={updateProduct}
              onDelete={deleteProduct}
            />
          ))}
        </IonList>
      )}
      <IonToolbar>
        <IonButton
          data-testid="toggle-expand-btn"
          onClick={() => setIsExpanded((prev) => !prev)}
          fill="clear"
          expand="full"
          size="small"
          color="medium"
        >
          <IonIcon icon={isExpanded ? arrowUpOutline : arrowDownOutline} />
        </IonButton>
        {isExpanded && (
          <IonButton
            data-testid="add-product-btn"
            onClick={addProduct}
            fill="clear"
            slot="end"
            size="large"
          >
            <IonIcon icon={addOutline} />
          </IonButton>
        )}
      </IonToolbar>
    </IonCardContent>
  );
};

export default ProductListContainer;

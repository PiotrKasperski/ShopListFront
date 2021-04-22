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
import api from "../../Services/api";
import ProductContainer from "./ProductContainer";

interface Props {
  shopListID: number;
  isActive: boolean;
}

const ProdctListConteiner = (props: Props) => {
  const [products, setProducts] = useState([]);

  const [isMounted, setIsMounted] = useState(props.isActive);

  useEffect(() => {
    getProducts();
  }, [isMounted]);

  const getProducts = () => {
    api
      .get("items/findByShopID/?id=" + props.shopListID)
      .then((response) => {
        console.log("getProductSuccess", response.data);
        setProducts(response.data);
      })
      .catch((error) => {});
  };
  const updateProduct = (newProduct: ProductModel) => {
    api
      .put("items/" + newProduct.itemID, newProduct)
      .then((response) => {
        console.log(response.data);
        getProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addProduct = () => {
    console.log("shopListID", props);
    api
      .post("items/", { shopListID: props.shopListID })
      .then((response) => {
        getProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduct = (id: number) => {
    api
      .delete("items/" + id)
      .then((response) => {
        console.log("delete response:", response.data);
        setProducts([]); //TODO change to not refresh whole list
        getProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddProductClick = () => {
    addProduct();
  };
  const handleProductChange = (newProduct: ProductModel) => {
    updateProduct(newProduct);
  };

  const handleProductDelete = (id: number) => {
    deleteProduct(id);
  };

  return (
    <IonCardContent>
      {isMounted ? (
        <IonList>
          {products.map((product) => {
            return (
              <ProductContainer
                product={product}
                onChange={(newProduct) => {
                  handleProductChange(newProduct);
                }}
                onDelete={(id) => {
                  handleProductDelete(id);
                }}
              />
            );
          })}
        </IonList>
      ) : null}

      <IonToolbar>
        <IonButton
          onClick={() => setIsMounted(!isMounted)}
          fill="clear"
          expand="full"
          size="small"
          color="medium"
        >
          {isMounted ? (
            <IonIcon icon={arrowUpOutline} />
          ) : (
            <IonIcon icon={arrowDownOutline} />
          )}
        </IonButton>
        {isMounted ? (
          <IonButton
            onClick={() => {
              handleAddProductClick();
            }}
            fill="clear"
            slot="end"
            size="large"
          >
            <IonIcon icon={addOutline} />
          </IonButton>
        ) : null}
      </IonToolbar>
    </IonCardContent>
  );
};

export default ProdctListConteiner;

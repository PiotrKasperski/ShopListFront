import ProductModel from "./ProductModel";

export default interface ShopListModel{
    shopListID: number;
    name: string;
    products: Array<ProductModel>
}
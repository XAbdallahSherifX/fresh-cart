import { Brand, Category, Subcategory } from "./product.type";
export interface cartType {
  _id: string;
  cartOwner: string;
  products: cartProductsType[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}
export interface cartProductsType {
  count: number;
  _id: string;
  product: cartProductType;
  price: number;
}
export interface cartProductType{
  subcategory: Subcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}
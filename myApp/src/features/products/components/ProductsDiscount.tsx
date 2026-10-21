import ProductCard from "./ProductCard";
import type { ComponentType } from "react";

const ProductCardWithoutProduct = ProductCard as unknown as ComponentType;

export default function ProductsDiscount() {
  return (
    <>
    <ProductCardWithoutProduct />
    </>
  )
}

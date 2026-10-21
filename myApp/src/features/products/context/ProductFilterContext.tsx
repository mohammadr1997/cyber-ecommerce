import { createContext } from "react";

import type { IProductType } from "@/apis/productsApi.ts";
import type {
  PriceSort,
} from "@/features/products/hooks/useProductFilters";
interface IProductFilterContext {
  products: IProductType[];
priceSort: PriceSort;
isLoading:boolean,
setPriceSort: React.Dispatch<
  React.SetStateAction<PriceSort>
>;
  price: [number, number];

  setPrice: React.Dispatch<
    React.SetStateAction<[number, number]>
  >;

  selectedBrands: string[];

  toggleBrand: (brand: string) => void;

  selectedAttributes: {
    [key: string]: string[];
  };

  toggleAttribute: (
    attributeKey: string,
    option: string
  ) => void;

  filteredProducts: IProductType[];

  resetFilters: () => void;
}

export const ProductFilterContext =
  createContext<IProductFilterContext | null>(null);
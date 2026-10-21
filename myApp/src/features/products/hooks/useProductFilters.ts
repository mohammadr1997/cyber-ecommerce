import { useMemo, useState } from "react";
import type { IProductType } from "@/apis/productsApi";

export const MIN_PRICE = 100;
export const MAX_PRICE = 1000;

export type PriceSort = "lowToHigh" | "highToLow" | null;

export interface ISelectedAttributes {
  [key: string]: string[];
}

export function useProductFilters(products: IProductType[]) {
  const [price, setPrice] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const [selectedAttributes, setSelectedAttributes] =
    useState<ISelectedAttributes>({});

  const [priceSort, setPriceSort] = useState<PriceSort>(null);

  const filteredProducts = useMemo(() => {
    let result = products;

    // ==========================
    // PRICE FILTER
    // ==========================

    if (price[0] !== MIN_PRICE || price[1] !== MAX_PRICE) {
      result = result.filter(
        (product) => product.price >= price[0] && product.price <= price[1],
      );
    }

    // ==========================
    // BRAND FILTER
    // ==========================

    if (selectedBrands.length > 0) {
      result = result.filter(
        (product) =>
          product.brand?.name && selectedBrands.includes(product.brand.name),
      );
    }

    // ==========================
    // ATTRIBUTE FILTER
    // ==========================

    Object.entries(selectedAttributes).forEach(
      ([attributeKey, selectedValues]) => {
        if (selectedValues.length === 0) {
          return;
        }

        result = result.filter((product) => {
          const productAttribute = product.attributes?.find((attribute) => {
            if (typeof attribute.attributeId === "string") {
              return false;
            }

            return attribute.attributeId.key === attributeKey;
          });

          if (!productAttribute) {
            return false;
          }

          return selectedValues.includes(productAttribute.value);
        });
      },
    );

    // ==========================
    // PRICE SORT
    // ==========================

    if (priceSort === "lowToHigh") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (priceSort === "highToLow") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, price, selectedBrands, selectedAttributes, priceSort]);

  // ==========================
  // TOGGLE BRAND
  // ==========================

  const toggleBrand = (brand: string) => {
    setSelectedBrands((current) => {
      if (current.includes(brand)) {
        return current.filter((item) => item !== brand);
      }

      return [...current, brand];
    });
  };

  // ==========================
  // TOGGLE ATTRIBUTE
  // ==========================

  const toggleAttribute = (attributeKey: string, option: string) => {
    setSelectedAttributes((current) => {
      const currentValues = current[attributeKey] ?? [];

      const newValues = currentValues.includes(option)
        ? currentValues.filter((value) => value !== option)
        : [...currentValues, option];

      if (newValues.length === 0) {
        const newAttributes = {
          ...current,
        };

        delete newAttributes[attributeKey];

        return newAttributes;
      }

      return {
        ...current,
        [attributeKey]: newValues,
      };
    });
  };

  // ==========================
  // RESET FILTERS
  // ==========================

  const resetFilters = () => {
    setPrice([MIN_PRICE, MAX_PRICE]);
    setSelectedBrands([]);
    setSelectedAttributes({});
    setPriceSort(null);
  };

  return {
    price,
    setPrice,

    selectedBrands,
    toggleBrand,

    selectedAttributes,
    toggleAttribute,

    filteredProducts,

    resetFilters,

    priceSort,
    setPriceSort,
  };
}

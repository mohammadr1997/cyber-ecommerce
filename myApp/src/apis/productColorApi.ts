import axios from "axios";

export interface IProductColor {
  _id: string;
  name: string;
  hexCode: string;
  brandId: string;
  categoryId: string;
  status: boolean;
}

export const getColorsByBrandAndCategory = async (
  brandId: string,
  categoryId: string,
) => {
  const response = await axios.get(
    `/product-colors/brand/${brandId}/category/${categoryId}`,
  );

  return response.data;
};

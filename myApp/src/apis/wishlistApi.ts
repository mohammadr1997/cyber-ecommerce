import axiosClient from "./axiosClient";
import type { IProductImage } from "./productsApi";

export interface IWishlistItem {
  _id?: string;

  productId: {
    _id: string;
    name: string;
    price: number;
    mainImage: string;
    images?: IProductImage[];
    mainImageColorId?: string;
  };
}

export interface IWishlist {
  _id: string;
  userId: string;
  items: IWishlistItem[];
}

export interface IWishlistResponse {
  success?: boolean;
  message?: string;
  data: IWishlist;
}

export interface IAddToWishlistPayload {
  productId: string;
}

const wishlistApi = {
  // ===============================
  // ADD TO WISHLIST
  // ===============================

  addToWishlist: async ({ productId }: IAddToWishlistPayload) => {
    const token = localStorage.getItem("token");

    return await axiosClient.post(
      "/wishlist",
      {
        productId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },

  // ===============================
  // GET WISHLIST
  // ===============================

  getWishlist: async () => {
    const token = localStorage.getItem("token");

    return await axiosClient.get<IWishlistResponse>("/wishlist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ===============================
  // REMOVE FROM WISHLIST
  // ===============================

  removeFromWishlist: async (productId: string) => {
    const token = localStorage.getItem("token");

    return await axiosClient.delete<IWishlistResponse>(
      `/wishlist/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
};

export default wishlistApi;

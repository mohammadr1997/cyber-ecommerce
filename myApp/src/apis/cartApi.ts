import axiosClient from "./axiosClient";

export interface ICartItem {
  _id?: string;

  productId: {
    _id: string;
    name: string;
    price: number;
    mainImage: string;
  };

  quantity: number;
}
export interface IAddToCartPayload {
  productId: string;
  colorId: string;
}
export interface ICart {
  _id: string;
  userId: string;
  items: ICartItem[];
}

export interface ICartResponse {
  success?: boolean;
  message?: string;
  data: ICart;
}

const cartApi = {
  // ===============================
  // ADD TO CART
  // ===============================

  addToCart: async ({ productId, colorId }: IAddToCartPayload) => {
    const token = localStorage.getItem("token");

    return await axiosClient.post(
      "/cart",
      {
        productId,
        colorId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },

  // ===============================
  // GET CART
  // ===============================

  getCart: async () => {
    const token = localStorage.getItem("token");

    return await axiosClient.get<ICartResponse>("/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ===============================
  // REMOVE FROM CART
  // ===============================

  removeFromCart: async (productId: string) => {
    const token = localStorage.getItem("token");

    return await axiosClient.delete<ICartResponse>(`/cart/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default cartApi;

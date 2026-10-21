import axiosClient from "./axiosClient";

// ==========================
// CATEGORY
// ==========================

export interface IColorCategory {
  _id: string;
  name: string;
}

// ==========================
// BRAND
// ==========================

export interface IColorBrand {
  _id: string;
  name: string;
}

// ==========================
// PRODUCT COLOR
// ==========================

export interface IProductColor {
  _id: string;
  name: string;

  categoryId: string | IColorCategory;

  brandId: string | IColorBrand;

  status: boolean;

  createdAt?: string;
  updatedAt?: string;
}

// ==========================
// CREATE COLOR
// ==========================

export interface ICreateColorPayload {
  name: string;
  categoryId: string;
  brandId: string;
}

// ==========================
// API
// ==========================

const colorApi = {
  // ==========================
  // CREATE COLOR
  // ==========================

  createColor: async (data: ICreateColorPayload) => {
    const token = localStorage.getItem("token");

    return await axiosClient.post("/colors", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ==========================
  // GET ALL COLORS
  // ==========================

  getColors: async () => {
    const token = localStorage.getItem("token");

    return await axiosClient.get("/colors", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ==========================
  // GET COLORS BY CATEGORY + BRAND
  // ==========================

  getColorsByCategoryAndBrand: async (categoryId: string, brandId: string) => {
    const token = localStorage.getItem("token");

    return await axiosClient.get(
      `/colors/category/${categoryId}/brand/${brandId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },

  // ==========================
  // DELETE COLOR
  // ==========================

  deleteColor: async (id: string) => {
    const token = localStorage.getItem("token");

    return await axiosClient.delete(`/colors/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default colorApi;

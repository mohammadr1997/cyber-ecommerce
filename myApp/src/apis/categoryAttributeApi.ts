import axiosClient from "./axiosClient";

// ==========================
// CATEGORY
// ==========================

export interface ICategory {
  _id: string;
  name: string;
}

// ==========================
// CATEGORY ATTRIBUTE
// ==========================

export interface ICategoryAttribute {
  _id: string;

  name: string;

  key: string;

  type: "text" | "number" | "select" | "boolean";

  options: string[];

  order: number;

  status: boolean;

  categoryId: string | ICategory;

  createdAt?: string;

  updatedAt?: string;
}

// ==========================
// RESPONSE
// ==========================

export interface ICategoryAttributesResponse {
  success: boolean;

  count: number;

  data: ICategoryAttribute[];
}

// ==========================
// CATEGORY ATTRIBUTE API
// ==========================

const categoryAttributeApi = {
  // ==========================
  // GET ALL CATEGORY ATTRIBUTES
  // ==========================

  getCategoryAttributes: async (categoryId?: string) => {
    const token = localStorage.getItem("token");

    return await axiosClient.get<ICategoryAttributesResponse>(
      "/category-attributes",
      {
        params: {
          categoryId,
        },

        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
};

export default categoryAttributeApi;

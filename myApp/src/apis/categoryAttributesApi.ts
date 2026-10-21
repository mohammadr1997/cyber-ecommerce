import axiosClient from "./axiosClient";

// =====================================================
// CATEGORY
// =====================================================

export interface ICategoryAttributeCategory {
  _id: string;
  name: string;
}

// =====================================================
// CATEGORY ATTRIBUTE
// =====================================================

export interface ICategoryAttribute {
  _id: string;

  categoryId: string | ICategoryAttributeCategory;

  name: string;

  key: string;

  type: "text" | "number" | "select" | "boolean";

  options: string[];

  order: number;

  status: boolean;

  createdAt?: string;

  updatedAt?: string;
}

// =====================================================
// RESPONSE
// =====================================================

export interface ICategoryAttributesResponse {
  success: boolean;

  count: number;

  data: ICategoryAttribute[];
}

// =====================================================
// CREATE DATA
// =====================================================

export interface ICreateCategoryAttributeData {
  categoryId: string;

  name: string;

  key: string;

  type: "text" | "number" | "select" | "boolean";

  options?: string[];

  order?: number;
}

// =====================================================
// UPDATE DATA
// =====================================================

export interface IUpdateCategoryAttributeData {
  name?: string;

  key?: string;

  type?: "text" | "number" | "select" | "boolean";

  options?: string[];

  order?: number;

  status?: boolean;
}

// =====================================================
// API
// =====================================================

const categoryAttributesApi = {
  // ===================================================
  // GET ATTRIBUTES
  // ===================================================

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

  // ===================================================
  // CREATE ATTRIBUTE
  // ===================================================

  createCategoryAttribute: async (data: ICreateCategoryAttributeData) => {
    const token = localStorage.getItem("token");

    return await axiosClient.post("/category-attributes", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ===================================================
  // UPDATE ATTRIBUTE
  // ===================================================

  updateCategoryAttribute: async (
    id: string,
    data: IUpdateCategoryAttributeData,
  ) => {
    const token = localStorage.getItem("token");

    return await axiosClient.put(`/category-attributes/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ===================================================
  // DELETE ATTRIBUTE
  // ===================================================

  deleteCategoryAttribute: async (id: string) => {
    const token = localStorage.getItem("token");

    return await axiosClient.delete(`/category-attributes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default categoryAttributesApi;

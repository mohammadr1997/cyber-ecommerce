import axiosClient from "./axiosClient";

// ==========================
// CATEGORY
// ==========================

export interface ICategory {
  _id: string;
  name: string;
}

// ==========================
// BRAND
// ==========================

export interface IBrandType {
  _id?: string;
  name: string;

  categories: ICategory[];

  status: boolean;

  createdAt?: string;
  updatedAt?: string;
}

// ==========================
// CREATE BRAND
// ==========================

export interface ICreateBrand {
  name: string;
  categories: string[];
  status?: boolean;
}

// ==========================
// RESPONSE
// ==========================

export interface IBrandsResponse {
  success: boolean;
  count: number;
  data: IBrandType[];
}

// ==========================
// BRAND API
// ==========================

const brandApi = {
  // ==========================
  // CREATE BRAND
  // POST /api/brands
  // ==========================

  createBrand: async (data: ICreateBrand) => {
    const token = localStorage.getItem("token");

    return await axiosClient.post<{
      success: boolean;
      message: string;
      data: IBrandType;
    }>("/brands", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ==========================
  // GET ALL BRANDS
  // GET /api/brands
  // ==========================

  getAllBrands: async () => {
    const token = localStorage.getItem("token");

    return await axiosClient.get<IBrandsResponse>("/brands", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ==========================
  // GET BRANDS BY CATEGORY
  // GET /api/brands/category/:categoryId
  // ==========================

  getBrandsByCategory: async (categoryId: string) => {
    const token = localStorage.getItem("token");

    return await axiosClient.get<IBrandsResponse>(
      `/brands/category/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },

  // ==========================
  // DELETE BRAND
  // DELETE /api/brands/:id
  // ==========================

  deleteBrand: async (id: string) => {
    const token = localStorage.getItem("token");

    return await axiosClient.delete<{
      success: boolean;
      message: string;
    }>(`/brands/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default brandApi;

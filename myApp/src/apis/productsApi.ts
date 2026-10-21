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

export interface IBrand {
  _id: string;
  name: string;
}

// ==========================
// CATEGORY ATTRIBUTE
// ==========================

export interface IProductAttribute {
  attributeId:
    | string
    | {
        _id: string;
        name: string;
        key: string;
        type: "text" | "number" | "select" | "boolean";
        options: string[];
        order: number;
        status: boolean;
      };

  value: string;
}

// ==========================
// PRODUCT COLOR
// ==========================

export interface IProductColor {
  _id?: string;
  id?: string;
  name?: string;
  hexCode?: string;
}

// ==========================
// PRODUCT IMAGE
// ==========================

export interface IProductImage {
  _id: string;
  url: string;

  colorId: string | IProductColor;
}

// ==========================
// PAGINATION
// ==========================

export interface IProductPagination {
  currentPage: number;
  productsPerPage: number;
  totalProducts: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// ==========================
// PAGINATED RESPONSE
// ==========================

export interface IPaginatedProductsResponse {
  success: boolean;
  pagination: IProductPagination;
  data: IProductType[];
}

// ==========================
// PRODUCT
// ==========================

export interface IProductType {
  _id?: string | undefined;

  name: string;

  shortDescription: string;

  longDescription: string;

  quantity: number;

  price: number;

  mainImage: string;

  // ==========================
  // MAIN IMAGE COLOR
  // ==========================

  mainImageColorId?: string;

  // ==========================
  // BRAND
  // ==========================

  brand?: IBrand;

  // ==========================
  // CATEGORY
  // ==========================

  categoryId: ICategory;

  // ==========================
  // SHOP
  // ==========================

  shopId?: number;

  // ==========================
  // GALLERY
  // ==========================

  images?: IProductImage[];

  // ==========================
  // PRODUCT COLORS
  // ==========================

  colors?: Array<string | IProductColor> | Array<string>;

  // ==========================
  // ATTRIBUTES
  // ==========================

  attributes?: IProductAttribute[];

  // ==========================
  // STATUS
  // ==========================

  isFeatured: boolean;

  isBestSeller: boolean;
}

// ==========================
// PRODUCT API
// ==========================

const productApi = {
  // ==========================
  // CREATE PRODUCT
  // ==========================

  createProduct: async (data: FormData) => {
    const token = localStorage.getItem("token");

    return await axiosClient.post("/products", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ==========================
  // GET ALL PRODUCTS
  // ==========================

  getAllProducts: async () => {
    const token = localStorage.getItem("token");

    return await axiosClient.get("/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ==========================
  // GET PAGINATED PRODUCTS
  // ==========================

  getProductsPaginated: async (page: number, name?: string) => {
    const token = localStorage.getItem("token");

    return await axiosClient.get<IPaginatedProductsResponse>(
      "/products/paginated",
      {
        params: {
          page,
          name,
        },

        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },

  searchProducts: async (query: string) => {
    return await axiosClient.get<{
      success: boolean;
      count: number;
      data: Pick<
        IProductType,
        "_id" | "name" | "price" | "mainImage" | "brand"
      >[];
    }>("/products/search", {
      params: {
        q: query,
      },
    });
  },
  // ==========================
  // GET PRODUCT BY ID
  // ==========================

  getProductById: async (id: string) => {
    const token = localStorage.getItem("token");

    return await axiosClient.get(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ==========================
  // UPDATE PRODUCT
  // ==========================

  updateProduct: async (id: string, data: FormData) => {
    const token = localStorage.getItem("token");

    return await axiosClient.put(`/products/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ==========================
  // DELETE PRODUCT
  // ==========================

  deleteProduct: async (id: string) => {
    const token = localStorage.getItem("token");

    return await axiosClient.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ==========================
  // ADD PRODUCT GALLERY IMAGES
  // ==========================

  addProductImages: async (id: string, data: FormData) => {
    const token = localStorage.getItem("token");

    return await axiosClient.post(`/products/${id}/images`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ==========================
  // DELETE PRODUCT GALLERY IMAGE
  // ==========================

  deleteProductImage: async (productId: string, imageId: string) => {
    const token = localStorage.getItem("token");

    return await axiosClient.delete(
      `/products/${productId}/images/${imageId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
  getProductsByCategory: async (categoryId: string) => {
    const token = localStorage.getItem("token");
    return await axiosClient.get<{
      success: boolean;
      count: number;
      data: IProductType[];
    }>(`/products/category/${categoryId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default productApi;

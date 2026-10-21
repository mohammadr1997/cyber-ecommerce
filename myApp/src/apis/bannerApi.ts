import axiosClient from "./axiosClient";

export interface IBanner {
  _id: string;
  title: string;
  description?: string;
  type: "banner" | "small";
  imageUrl: string;
  publicId: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBannerResponse {
  message: string;
  banner: IBanner;
}

export interface IBannersListResponse {
  message?: string;
  data?: IBanner[];
}

const bannerApi = {
  addBanner: async (
    title: string,
    type: "banner" | "small",
    image: File,
    description?: string,
  ) => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    if (description) formData.append("description", description);
    formData.append("image", image);

    return await axiosClient.post<IBannerResponse>("/banners", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getBanners: async () => {
    return await axiosClient.get<IBanner[]>("/banners");
  },

  getActiveBanners: async () => {
    return await axiosClient.get<IBanner[]>("/banners/active");
  },

  getBanner: async (id: string) => {
    return await axiosClient.get<IBanner>(`/banners/${id}`);
  },

  updateBanner: async (
    id: string,
    updates: {
      title?: string;
      type?: "banner" | "small";
      description?: string;
      isActive?: boolean;
      image?: File;
    },
  ) => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    if (updates.title !== undefined) formData.append("title", updates.title);
    if (updates.type !== undefined) formData.append("type", updates.type);
    if (updates.description !== undefined)
      formData.append("description", updates.description);
    if (updates.isActive !== undefined)
      formData.append("isActive", String(updates.isActive));
    if (updates.image) formData.append("image", updates.image);

    return await axiosClient.put<IBannerResponse>(`/banners/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteBanner: async (id: string) => {
    const token = localStorage.getItem("token");

    return await axiosClient.delete<{ message: string }>(`/banners/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default bannerApi;

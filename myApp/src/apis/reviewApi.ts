import axiosClient from "./axiosClient";

export interface IReviewUser {
  _id: string;
  name?: string;
  avatar?: string;
}

export interface IReviewType {
  _id: string;

  productId: string;

  userId: IReviewUser;

  rating: number;

  comment: string;

  createdAt: string;

  updatedAt: string;
}

export interface IRatingCounts {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface IProductReviewsData {
  averageRating: number;

  totalReviews: number;

  ratingCounts: IRatingCounts;

  reviews: IReviewType[];
}

// ==========================
// GET PRODUCT REVIEWS RESPONSE
// ==========================

export interface IProductReviewsResponse {
  success: boolean;

  data: IProductReviewsData;
}

// ==========================
// REVIEW RESPONSE
// ==========================

export interface IReviewResponse {
  success: boolean;

  message: string;

  data: IReviewType;
}

// ==========================
// CREATE REVIEW
// ==========================

export interface ICreateReview {
  productId: string;

  userId: string;

  rating: number;

  comment: string;
}

// ==========================
// UPDATE REVIEW
// ==========================

export interface IUpdateReview {
  rating?: number;

  comment?: string;
}

// ==========================
// REVIEW API
// ==========================

const reviewApi = {
  getProductReviews: async (productId: string) => {
    const token = localStorage.getItem("token");

    return await axiosClient.get<IProductReviewsResponse>(
      `/products/${productId}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },

  // ==========================
  // ADD REVIEW
  // ==========================

  addReview: async (data: ICreateReview) => {
    const token = localStorage.getItem("token");

    return await axiosClient.post<IReviewResponse>("/reviews", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ==========================
  // UPDATE REVIEW
  // ==========================

  updateReview: async ({ id, data }: { id: string; data: IUpdateReview }) => {
    const token = localStorage.getItem("token");

    return await axiosClient.put<IReviewResponse>(`/reviews/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  deleteReview: async (id: string) => {
    const token = localStorage.getItem("token");

    return await axiosClient.delete<IReviewResponse>(`/reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default reviewApi;

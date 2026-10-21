import axiosClient from "./axiosClient";

export interface IAuthPayload {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export const authApi = {
  register: async (data: IAuthPayload) => {
    return axiosClient.post("/auth/signup", data);
  },
  loginUser: async (data: IAuthPayload) => {
    return await axiosClient.post("/auth/signin", data);
  },
  getMe: async () => {
    const token = localStorage.getItem("token");

    return await axiosClient.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

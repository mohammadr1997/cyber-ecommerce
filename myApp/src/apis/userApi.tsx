
import axiosClient from "./axiosClient";

// ==========================
// USER
// ==========================

export interface IUserType {
  _id: string;

  firstName: string;

  lastName: string;

  email: string;

  avatar: string;

  role: string;

  createdAt: string;

  updatedAt: string;
}

// ==========================
// CREATE USER
// ==========================

export interface ICreateUser {
  firstName: string;

  lastName: string;

  email: string;

  password: string;

  avatar?: string;

  role?: string;
}

// ==========================
// UPDATE USER
// ==========================

export interface IUpdateUser {
  firstName?: string;

  lastName?: string;

  email?: string;

  password?: string;

  avatar?: string;

  role?: string;
}

// ==========================
// USERS RESPONSE
// ==========================

export interface IUsersResponse {
  success: boolean;

  message: string;

  data: IUserType[];
}

// ==========================
// SINGLE USER RESPONSE
// ==========================

export interface IUserResponse {
  success: boolean;

  message: string;

  data: IUserType;
}

// ==========================
// USER API
// ==========================

const userApi = {
  // ==========================
  // GET ALL USERS
  // ==========================

  getAllUsers: async () => {
    const token = localStorage.getItem("token");

    return await axiosClient.get<IUsersResponse>("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ==========================
  // GET SINGLE USER
  // ==========================

  getUserById: async (id: string) => {
    const token = localStorage.getItem("token");

    return await axiosClient.get<IUserResponse>(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ==========================
  // CREATE USER
  // ==========================

  createUser: async (data: ICreateUser) => {
    const token = localStorage.getItem("token");

    return await axiosClient.post<IUserResponse>("/users", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ==========================
  // UPDATE USER
  // ==========================

  updateUser: async (id: string, data: IUpdateUser) => {
    const token = localStorage.getItem("token");

    return await axiosClient.put<IUserResponse>(`/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  
updateMe: async (data: {
  firstName: string;
  lastName: string;
  email: string;
}) => {
  const token = localStorage.getItem("token");

  return await axiosClient.put("/users/me", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},
  // ==========================
  // DELETE USER
  // ==========================

  deleteUser: async (id: string) => {
    const token = localStorage.getItem("token");

    return await axiosClient.delete<IUserResponse>(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default userApi;



import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IUserData {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  role: string;
  isAuthenticated: boolean;
}

const initialState: IUserData = {
  firstName: "",
  lastName: "",
  avatar: "",
  email: "",
  role: "",
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserData>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.avatar = action.payload.avatar;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

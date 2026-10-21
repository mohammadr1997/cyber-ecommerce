import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitiaStatesTypes {
  open: boolean;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

const initialState: InitiaStatesTypes = {
  open: false,
  message: "",
  type: "info",
};
export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{ message: string; type: string }>,
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type as
        | "success"
        | "error"
        | "info"
        | "warning";
    },
    hideToast: (state) => {
      state.open = false;
      state.message = "";
      state.type = "info";
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;

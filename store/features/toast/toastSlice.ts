import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ToastVariant = "success" | "error" | "info";

interface ToastState {
  message: string | null;
  variant: ToastVariant;
  isVisible: boolean;
}

const initialState: ToastState = {
  message: null,
  variant: "info",
  isVisible: false,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{ message: string; variant?: ToastVariant }>,
    ) => {
      state.message = action.payload.message;
      state.variant = action.payload.variant || "info";
      state.isVisible = true;
    },
    hideToast: (state) => {
      state.isVisible = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;

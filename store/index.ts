import { configureStore } from "@reduxjs/toolkit";
import jobPostReducer from "./features/jobPost/jobPostSlice";

export const store = configureStore({
  reducer: {
    jobPost: jobPostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

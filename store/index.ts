import { configureStore } from "@reduxjs/toolkit";
import jobPostReducer from "./features/jobPost/jobPostSlice";
import postingsReducer from "./features/postings/postingsSlice";

export const store = configureStore({
  reducer: {
    jobPost: jobPostReducer,
    postings: postingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

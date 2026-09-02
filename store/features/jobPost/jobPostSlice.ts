import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface JobPostState {
  // Step 1 Details
  title: string;
  department: string;
  employmentType: string;
  locationType: string;
  location: string;
  salaryMin: string;
  salaryMax: string;
  companyName: string;
  // Step 2 Details
  description: string;
  companyOverview: string;
  benefits: string[];
  // Step 3 / Meta
  visibility: string;
  expirationDate: string;
}

const initialState: JobPostState = {
  title: "",
  department: "",
  employmentType: "",
  locationType: "",
  location: "",
  salaryMin: "",
  salaryMax: "",
  companyName: "",
  description: "",
  companyOverview: "",
  benefits: [],
  visibility: "PUBLIC",
  expirationDate: "",
};

export const jobPostSlice = createSlice({
  name: "jobPost",
  initialState,
  reducers: {
    updateJobDetails: (
      state,
      action: PayloadAction<
        Partial<
          Omit<JobPostState, "description" | "companyOverview" | "benefits">
        >
      >,
    ) => {
      Object.assign(state, action.payload);
    },
    updateJobDescription: (
      state,
      action: PayloadAction<{
        description?: string;
        companyOverview?: string;
        benefits?: string[];
      }>,
    ) => {
      if (action.payload.description !== undefined)
        state.description = action.payload.description;
      if (action.payload.companyOverview !== undefined)
        state.companyOverview = action.payload.companyOverview;
      if (action.payload.benefits !== undefined)
        state.benefits = action.payload.benefits;
    },
    resetJobPostForm: () => initialState,
  },
});

export const { updateJobDetails, updateJobDescription, resetJobPostForm } =
  jobPostSlice.actions;
export default jobPostSlice.reducer;

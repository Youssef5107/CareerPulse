import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Posting {
  id: string;
  title: string;
  location: string;
  type: string;
  postedDate: string;
  status: "ACTIVE" | "DRAFT" | "CLOSED";
  totalApplicants: number;
  newApplicants: number;
}

interface PostingsState {
  items: Posting[];
  activeTab: "ALL" | "ACTIVE" | "DRAFT" | "CLOSED";
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

const initialState: PostingsState = {
  items: [],
  activeTab: "ALL",
  searchQuery: "",
  loading: false,
  error: null,
};

// Fetch postings using your existing /api/posts route
export const fetchPostings = createAsyncThunk(
  "postings/fetchPostings",
  async () => {
    const response = await fetch("/api/posts");
    if (!response.ok) throw new Error("Failed to fetch posts");
    return (await response.json()) as Posting[];
  },
);

// Update status using your existing /api/posts/[post-id] route
export const updatePostingStatus = createAsyncThunk(
  "postings/updatePostingStatus",
  async ({
    jobId,
    status,
  }: {
    jobId: string;
    status: "ACTIVE" | "DRAFT" | "CLOSED";
  }) => {
    const response = await fetch(`/api/posts/${jobId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error("Failed to update status");
    return { jobId, status };
  },
);

const postingsSlice = createSlice({
  name: "postings",
  initialState,
  reducers: {
    setPostings: (state, action: PayloadAction<Posting[]>) => {
      state.items = action.payload;
    },
    setActiveTab: (
      state,
      action: PayloadAction<"ALL" | "ACTIVE" | "DRAFT" | "CLOSED">,
    ) => {
      state.activeTab = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostings.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPostings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load posts";
      })
      .addCase(updatePostingStatus.fulfilled, (state, action) => {
        const { jobId, status } = action.payload;
        const posting = state.items.find((p) => p.id === jobId);
        if (posting) {
          posting.status = status;
        }
      });
  },
});

export const { setPostings, setActiveTab, setSearchQuery } =
  postingsSlice.actions;
export default postingsSlice.reducer;

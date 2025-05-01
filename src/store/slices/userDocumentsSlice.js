import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserUploads = createAsyncThunk(
  "fetchUserUploads",
  async ({ userId }) => {
    try {
      if (userId) {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/user/uploads/${userId}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch user uploads: ${response.status}`);
        }

        const responseData = await response.json();

        return responseData;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const intialState = {
  documents: [],
  isDocumentsLoading: false,
  error: null,
};

const userDocumentsSlice = createSlice({
  name: "userDocuments",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserUploads.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserUploads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documents = action.payload;
      })
      .addCase(fetchUserUploads.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const userDocumentsActions = userDocumentsSlice.actions;
export default userDocumentsSlice.reducer;

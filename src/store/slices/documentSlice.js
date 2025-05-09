import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFileDetails = createAsyncThunk(
  "fetchFileDetails",
  async (fileId, { dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/documents/document/${fileId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.message}`);
      }

      const data = await response.json();
      dispatch(setDocument(data.data));

      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
);

const intialState = {
  document: null,
  loading: true,
  error: null,
};

const documentSlice = createSlice({
  name: "document",
  initialState: intialState,
  reducers: {
    setDocument(state, action) {
      state.document = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFileDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFileDetails.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchFileDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setDocument } = documentSlice.actions;
export default documentSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDocuments = createAsyncThunk(
  "fetchDocuments",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/documents`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch: ${response.statusText || "Unknown error"}`
        );
      }

      const data = await response.json();

      if (data) {
        dispatch(setDocuments(data.documents));
      } else {
        throw new Error("Documents data is not in the expected format.");
      }

      return data.documents;
    } catch (error) {
      console.error("Fetch error:", error);
      return rejectWithValue(error.message);
    }
  }
);

const intialState = {
  documents: null,
  loading: true,
  error: null,
};

const documentsSlice = createSlice({
  name: "documents",
  initialState: intialState,
  reducers: {
    setDocuments(state, action) {
      state.documents = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDocuments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDocuments.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchDocuments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setDocuments } = documentsSlice.actions;

export default documentsSlice.reducer;

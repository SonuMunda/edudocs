import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchAllDocuments = createAsyncThunk(
//   "fetchAllDocuments",
//   async ({ rejectWithValue, dispatch }) => {
//     try {
//       {
//         console.log("fetching documents");
//         const response = await fetch(
//           `${import.meta.env.VITE_SERVER_URL}/api/documents`,
//           {
//             method: "GET",
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`Failed to fetch: ${response.message}`);
//         }

//         const data = await response.json();
//         if (data) {
//           dispatch(setDocuments(data.documents));
//           console.log(data);
//         }
//       }
//     } catch (error) {
//       rejectWithValue(error.message);
//     }
//   }
// );

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

export const addDocumentLike = createAsyncThunk(
  "addDocumentLike",
  async ({ documentId, currentUserId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/documents/document/like/${documentId}/${currentUserId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const responseData = await response.json();
      return responseData.message;
    } catch (error) {
      console.error("Error adding like", error);
      return rejectWithValue("An error occurred while adding like");
    }
  }
);

export const addDocumentVote = createAsyncThunk(
  "addDocumentVote",
  async ({ documentId, userId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/documents/document/vote/${documentId}/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const responseData = await response.json();
      return responseData.message;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFileDetails = createAsyncThunk(
  "fetchFileDetails",
  async (fileId) => {
    try {
      console.log(fileId);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/documents/document/${fileId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.message}`);
      }

      const responseData = await response.json();

      return responseData.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
);

const intialState = {
  documents: null,
  loading: true,
  error: null,
};

const documentSlice = createSlice({
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

export const { setDocuments } = documentSlice.actions;

export default documentSlice.reducer;

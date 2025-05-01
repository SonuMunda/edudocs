import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchUserDetailsById = createAsyncThunk(
//   "fetchUserDetailsById",
//   async (userId) => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_SERVER_URL}/api/user/${userId}`,
//         {
//           method: "GET",
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch: ${response.message}`);
//       }

//       const responseData = await response.json();
//       return responseData.user;
//     } catch (error) {
//       console.log(error.message);
//       throw error;
//     }
//   }
// );

export const fetchUserDetailsByUsername = createAsyncThunk(
  "fetchUserDetailsByUsername",
  async (username) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/user/${username}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.message}`);
      }

      const responseData = await response.json();
      return responseData.user;
    } catch (error) {
      console.log(error.message);
      throw error;
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

export const fetchAllDocuments = createAsyncThunk(
  "fetchAllDocuments",
  async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/documents`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.message}`);
      }

      const responseData = await response.json();
      return responseData.documents;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
);
const initialState = {
  user: null,
  documents: [],
  isLogin: !!localStorage.getItem("token"),
  isLoading: true,
  isError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserDetails: (state) => {
      state.user = null;
      state.isLoading = true;
      state.isError = false;
    },
    clearUserUploads: (state) => {
      state.documents = [];
      state.isLoading = true;
      state.isError = false;
    },
    clearAllUserData: (state) => {
      state.user = null;
      state.documents = [];
      state.isLoading = true;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetailsByUsername.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUserDetailsByUsername.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserDetailsByUsername.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { clearUserDetails, clearUserUploads, clearAllUserData } =
  userSlice.actions;

export default userSlice.reducer;

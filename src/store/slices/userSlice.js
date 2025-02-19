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
        console.log("error");
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
  reducers: {},
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
    builder.addCase(fetchUserUploads.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.documents = action.payload;
    });
    builder.addCase(fetchUserUploads.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserUploads.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

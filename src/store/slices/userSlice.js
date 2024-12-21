import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      if (id) {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/user/auth/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          const errorResponseData = await response.json();
          return rejectWithValue(errorResponseData);
        }

        const data = await response.json();
        if (data) {
          dispatch(setUser(data.user));
        }

        return data;
      } else {
        return rejectWithValue({ message: "User ID is required." });
      }
    } catch (error) {
      const errorMessage =
        error.message || "An unexpected error occurred during fetchUserDetails";
      return rejectWithValue({ message: errorMessage });
    }
  }
);

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
        console.log("erroro");
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


export const userDocumentUpload = createAsyncThunk(
  "userDocumentUpload",
  async ({ id, formData, toast }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/user/upload/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
      }

      const responseData = await response.json();
      toast.success(responseData.message);

      return responseData;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue("An error occurred while uploading the document");
    }
  }
);

export const fetchUserUploads = createAsyncThunk(
  "fetchUserUploads",
  async (userId) => {
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
  isLogin: !!localStorage.getItem("token"),
  isLoading: true,
  isError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserDetails.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

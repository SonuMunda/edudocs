import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Thunks
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ data, toast }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorResponseData = await response.json();
        toast.error(errorResponseData.message, {
          position: "top-center",
        });
        return rejectWithValue(errorResponseData);
      }

      const responseData = await response.json();
      toast.success(responseData.message, {
        position: "top-center",
      });

      return responseData;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage, {
        position: "top-center",
      });
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ data, toast, navigate }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorResponseData = await response.json();
        toast.error(errorResponseData.message, {
          position: "top-center",
        });
        return rejectWithValue(errorResponseData);
      }

      const responseData = await response.json();

      const { token } = responseData;
      localStorage.setItem("token", token);
      dispatch(setUserProfile(responseData.user));

      toast.success(responseData.message, {
        position: "top-center",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage, {
        position: "top-center",
      });
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  "fetchUserDetails",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/user-info`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        dispatch(setUserProfile(responseData.user));
      } else {
        return rejectWithValue("Failed to fetch user details");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async ({ data, toast }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/update/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ ...data }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.message);
        return rejectWithValue(responseData.message);
      }

      toast.success(responseData.message, {
        position: "top-center",
      });
      dispatch(setUserProfile(responseData.user));
      return responseData;
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred while updating the profile.");
      return rejectWithValue("An error occurred while updating the profile.");
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ data, toast }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/update-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorResponseData = await response.json();
        toast.error(errorResponseData.message, {
          position: "top-center",
        });
        return rejectWithValue(errorResponseData);
      }

      const responseData = await response.json();
      toast.success(responseData.message, {
        position: "top-center",
      });

      return responseData;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage, {
        position: "top-center",
      });
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async ({ email, toast }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/forget-password/${email}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        const errorResponseData = await response.json();
        toast.error(errorResponseData.message, {
          position: "top-center",
        });
        return rejectWithValue(errorResponseData);
      }

      const responseData = await response.json();
      toast.success(responseData.message, {
        position: "top-center",
      });

      return responseData;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage, {
        position: "top-center",
        className: "text-4xl",
      });
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ newPassword, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/reset-password`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword }),
        }
      );

      if (!response.ok) {
        const errorResponseData = await response.json();
        toast.error(errorResponseData.message, {
          position: "top-center",
        });
        return rejectWithValue(errorResponseData);
      }

      const responseData = await response.json();
      toast.success(responseData.message, {
        position: "top-center",
      });

      localStorage.removeItem("token");
      setTimeout(() => {
        navigate("/signin");
      }, 1000);

      return responseData;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage, {
        position: "top-center",
      });
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState = {
  user: null,
  isLoading: true,
  isLoggedIn: false,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.user = action?.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state) => {
      state.isLoggedIn = true;
    });

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

export const { logout, setUserProfile } = authSlice.actions;
export default authSlice.reducer;

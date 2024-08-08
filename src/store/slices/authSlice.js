import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Thunks
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ data, toast }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/user/auth/signup`,
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

export const login = createAsyncThunk(
  "auth/login",
  async ({ data, toast }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/user/auth/signin`,
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

      const { token } = responseData;
      localStorage.setItem("token", token);
      fetchUserDetails();
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
  isLoading: true,
  isLoggedIn: false,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

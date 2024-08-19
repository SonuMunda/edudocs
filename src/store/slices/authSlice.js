import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setUser } from "./userSlice";

// Thunks
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ data, toast }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/users/auth/signup`,
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
  async ({ data, toast, navigate }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/users/auth/signin`,
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
      dispatch(setUser(responseData.user));

      toast.success(responseData.message, {
        position: "top-center",
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
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
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state) => {
      state.isLoggedIn = true;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      if (id) {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/users/auth/user/${id}`,
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

//update profile
export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async ({ id, data, toast }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/users/auth/user/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.message);
        return rejectWithValue(responseData.message);
      }

      toast.success(responseData.message);
      dispatch(setUser(responseData.user));
      return responseData;
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating the profile.");
      return rejectWithValue("An error occurred while updating the profile.");
    }
  }
);

const initialState = {
  user: null,
  isLogin: !!localStorage.getItem("token"),
  isLoading: true,
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
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

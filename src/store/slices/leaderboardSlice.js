import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLeaderboard = createAsyncThunk(
  "fetchLeaderboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/leaderboard`
      );

      if (!response.ok) {
        rejectWithValue(`Failed to fetch: ${response.message}`);
      }

      const responseData = await response.json();
      return responseData.users;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default leaderboardSlice.reducer;

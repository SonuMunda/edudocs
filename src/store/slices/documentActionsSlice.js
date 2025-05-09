import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async Thunks
export const toggleLike = createAsyncThunk(
  "documentActions/toggleLike",
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

      const data = await response.json();
      updateLikes(data.likes);

      return { documentId, likes: data.likes };
    } catch (error) {
      return rejectWithValue("Error toggling like");
    }
  }
);

export const toggleVote = createAsyncThunk(
  "documentActions/toggleVote",
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

      const data = await response.json();

      updateVotes(data.votes);
      return { documentId, votes: data.votes };
    } catch (error) {
      return rejectWithValue("Error toggling vote");
    }
  }
);

const initialState = {
  likes: {},
  votes: {},
  likesLoading: false,
  votesLoading: false,
  error: null,
};

const documentActionsSlice = createSlice({
  name: "documentActions",
  initialState,
  reducers: {
    updateLikes: (state, action) => {
      const { likes } = action.payload;
      state.likes = likes;
    },
    updateVotes: (state, action) => {
      const { votes } = action.payload;
      state.votes = votes;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleLike.pending, (state) => {
        state.likesLoading = true;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { likes } = action.payload;
        state.likes = likes;
        state.likesLoading = false;
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.likesLoading = false;
        state.error = action.payload;
      })
      .addCase(toggleVote.pending, (state) => {
        state.votesLoading = true;
      })
      .addCase(toggleVote.fulfilled, (state, action) => {
        const { votes } = action.payload;
        state.votes = votes;
        state.votesLoading = false;
      })
      .addCase(toggleVote.rejected, (state, action) => {
        state.votesLoading = false;
        state.error = action.payload;
      });
  },
});

export const { updateLikes, updateVotes } = documentActionsSlice.actions;
export default documentActionsSlice.reducer;

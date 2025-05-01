import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk(
  "fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/books`,
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
        console.log(data);
        return data?.books;
      } else {
        throw new Error("Books data is not in the expected format.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBookDetails = createAsyncThunk(
  "fetchBookDetails",
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/books/book/${bookId}`,
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
        return data;
      } else {
        throw new Error("Book details data is not in the expected format.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  books: [],
  bookDetails: null,
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase("fetchBooks/pending", (state) => {
        state.loading = true;
      })
      .addCase("fetchBooks/fulfilled", (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase("fetchBooks/rejected", (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase("fetchBookDetails/pending", (state) => {
        state.loading = true;
      })
      .addCase("fetchBookDetails/fulfilled", (state, action) => {
        state.loading = false;
        state.bookInfo = action.payload;
      })
      .addCase("fetchBookDetails/rejected", (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default booksSlice.reducer;

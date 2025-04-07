import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import chatbotReducer from "./slices/chatbotSlice";
import documentSlice from "./slices/documentSlice";
import leaderboardSlice from "./slices/leaderboardSlice";
import booksSlice from "./slices/booksSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    chatbot: chatbotReducer,
    documents: documentSlice,
    books: booksSlice,
    leaderboard: leaderboardSlice,
  },
});

export default store;

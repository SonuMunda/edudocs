import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import chatbotReducer from "./slices/chatbotSlice";
import documentSlice from "./slices/documentSlice";
import leaderboardSlice from "./slices/leaderboardSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    chatbot: chatbotReducer,
    documents: documentSlice,
    leaderboard: leaderboardSlice,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import chatbotReducer from "./slices/chatbotSlice";
import documentSlice from "./slices/documentSlice";
import leaderboardSlice from "./slices/leaderboardSlice";
import booksSlice from "./slices/booksSlice";
import userDocumentsSlice from "./slices/userDocumentsSlice";
import documentActionsSlice from "./slices/documentActionsSlice";
import documentsSlice from "./slices/documentsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    userDocuments: userDocumentsSlice,
    chatbot: chatbotReducer,
    documents: documentsSlice,
    document: documentSlice,
    documentActions: documentActionsSlice,
    books: booksSlice,
    leaderboard: leaderboardSlice,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import chatbotReducer from "./slices/chatbotSlice"

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    chatbot: chatbotReducer
  },
});

export default store;

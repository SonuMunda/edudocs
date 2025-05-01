import { GoogleGenAI } from "@google/genai";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const chatbotConversation = createAsyncThunk(
  "chatbot/getConversation",
  async (message, { rejectWithValue }) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ role: "user", parts: [{ text: message }] }],
      });

      const result = response.text;
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  status: "idle",
  error: null,
  isLoading: false,
  conversation: [],
};

// Redux slice
const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    clearConversation: (state) => {
      state.conversation = [];
    },
    addUserMessage: (state, action) => {
      state.conversation.push({ role: "user", content: action.payload });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(chatbotConversation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(chatbotConversation.fulfilled, (state, action) => {
        state.isLoading = false;
        const botMessage = action.payload || "No response from Gemini API";
        state.conversation.push({ role: "bot", content: botMessage });
      })
      .addCase(chatbotConversation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearConversation, addUserMessage } = chatbotSlice.actions;
export default chatbotSlice.reducer;

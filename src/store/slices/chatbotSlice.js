import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const sendMessageToChatbot = createAsyncThunk(
  "chatbot/sendMessage",
  async (message, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://open-ai21.p.rapidapi.com/conversationgpt35",
        {
          method: "POST",
          headers: {
            "x-rapidapi-key": `${import.meta.env.VITE_X_RAPIDAPI_KEY}`,
            "x-rapidapi-host": "open-ai21.p.rapidapi.com",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: message }],
            web_access: false,
            system_prompt: "",
            temperature: 0.9,
            top_k: 5,
            top_p: 0.9,
            max_tokens: 256,
          }),
        }
      );

      const data = await response.json();
      return data.result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  status: "idle",
  error: null,
  isLoading: false,
  conversation: [],
};

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
      .addCase(sendMessageToChatbot.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendMessageToChatbot.fulfilled, (state, action) => {
        state.isLoading = false;
        const botMessage = action.payload || "No response from API";
        state.conversation.push({ role: "bot", content: botMessage });
      })
      .addCase(sendMessageToChatbot.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearConversation } = chatbotSlice.actions;

export default chatbotSlice.reducer;

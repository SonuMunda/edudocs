import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessageToChatbot,
  clearConversation,
} from "../store/slices/chatbotSlice";
import { ThreeDots } from "react-loader-spinner";

const Chatbot = () => {
  const dispatch = useDispatch();
  const { error, isLoading, conversation } = useSelector(
    (state) => state.chatbot || {}
  );
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(sendMessageToChatbot(message));
      dispatch({ type: "chatbot/addUserMessage", payload: message });
      setMessage("");
    }
  };

  return (
    <div className="h-screen bg-blue-200 flex flex-col bg-gradient-to-l from-red-800 to-indigo-600">
      <div className="bg-blue-500 text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-semibold mt-12">
          Ask Question to Chatbot
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-blue-200">
        <div className="space-y-4">
          {conversation?.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-3xl break-words ${
                msg.role === "bot"
                  ? "bg-blue-50 text-gray-800 w-full"
                  : "bg-blue-600 text-white mr-auto"
              }`}
            >
              <p>{msg.content}</p>
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="text-center text-black py-2 px-2 bg-white rounded-full w-fit">
            <ThreeDots height={12} color="blue"/>
          </div>
        )}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
      </div>

      <div className="bg-gray-50 p-6 border-t border-gray-300">
        <div className="flex space-x-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-3 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="p-3 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
          <button
            onClick={() => dispatch(clearConversation())}
            className="p-3 bg-gray-500 text-white rounded-3xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

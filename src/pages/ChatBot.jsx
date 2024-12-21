import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessageToChatbot,
  clearConversation,
} from "../store/slices/chatbotSlice";
import { Comment } from "react-loader-spinner";
import { LuBot, LuUser } from "react-icons/lu";

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
    <div className="h-screen bg-blue-100 flex flex-col">
      {conversation == [] || conversation == "" ? (
        <div className="h-full center flex-col p-2">
          <div className="bot-icon text-gray-700">
          <LuBot size={64} />
          </div>
          <h2 className="text-3xl text-center font-extrabold text-gray-700 mb-4">
            Chatbot
          </h2>
          <p className="text-lg text-gray-700 text-center">
            Got questions or doubts? Ask away! Your learning companion is here
            to assist you.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-blue-100">
          <div className="message-list space-y-4 mt-14">
            {conversation?.map((msg, index) => (
              <div key={index} className={`flex items-center space-x-3`}>
                {msg.role === "user" && (
                  <div className="bg-blue-50 p-2 rounded-full">
                    <LuUser size={24} />
                  </div>
                )}
                {msg.role === "bot" && (
                  <div className="bg-blue-50 p-2 rounded-full">
                    <LuBot size={24} />
                  </div>
                )}
                <div
                  className={`p-4 rounded-3xl break-words  ${
                    msg.role === "bot"
                      ? "bg-blue-50 text-gray-800"
                      : "bg-blue-300"
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {isLoading && (
            <div className="loader ms-10">
              <Comment height={42} backgroundColor="#4382ec" />
            </div>
          )}
          {error && <p className="text-center text-red-500">Error: {error}</p>}
        </div>
      )}

      <div className="bg-blue-100 p-6 border-t border-gray-400 absolute w-full bottom-0">
        <div className="flex space-x-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-3 ring-2 ring-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
          <button
            onClick={() => dispatch(clearConversation())}
            className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

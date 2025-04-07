import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageToChatbot } from "../store/slices/chatbotSlice";
import { Hourglass } from "react-loader-spinner";
import { LuBot, LuUser } from "react-icons/lu";
import { PiPaperPlaneRightBold } from "react-icons/pi";

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
    <section
      className="chat-bot max-h-screen bg-gray-100 flex flex-col"
      style={{ overflow: "hidden" }}
    >
      {conversation == [] || conversation == "" ? (
        <div className="h-full min-w-xl center flex-col p-2">
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
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 bg-gray-100">
          <div className="message-list space-y-4">
            {conversation?.map((msg, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {msg.role === "user" && (
                  <div className="bg-blue-600 p-2 rounded-full ms-4">
                    <LuUser size={24} className="text-white" />
                  </div>
                )}
                {msg.role === "bot" && (
                  <div className="bg-green-600 p-2 rounded-full">
                    <LuBot size={24} className="text-white" />
                  </div>
                )}
                <div
                  className={`p-4 rounded-lg break-words max-w-xl ${
                    msg.role === "bot"
                      ? "bg-green-200 text-gray-800"
                      : "bg-blue-100 text-gray-800"
                  }`}
                >
                  {msg.content.startsWith("```") ? (
                    <pre className="bg-gray-900 text-white p-3 rounded-lg overflow-x-auto">
                      <code>{msg.content.replace(/```/g, "")}</code>
                    </pre>
                  ) : (
                    <p>{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="loader text-left mt-2 flex items-center gap-4">
                <div className="bg-green-600 p-2 rounded-full">
                  <LuBot size={24} className="text-white" />
                </div>
                <div className="flex items-center justify-center gap-2 p-4 rounded bg-gray-200">
                  <p>One moment, I'm working on it...</p>
                  <Hourglass height={20} width={20} />
                </div>
              </div>
            )}
            {error && (
              <p className="text-center text-red-500">Error: {error}</p>
            )}
          </div>
        </div>
      )}
      <div className="bg-gray-100 py-2 px-6 border-t border-gray-300 relative w-full bottom-14">
        <div className="flex items-center space-x-3">
          <textarea
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-3 ring-2 ring-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            onClick={handleSendMessage}
            className={`bg-blue-600 text-white h-12 w-12 center m-auto rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isLoading ? "cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            <PiPaperPlaneRightBold size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;

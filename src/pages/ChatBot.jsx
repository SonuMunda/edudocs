import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  chatbotConversation,
  addUserMessage,
} from "../store/slices/chatbotSlice";
import { LuArrowLeft, LuBot, LuUser } from "react-icons/lu";
import { PiPaperPlaneRightBold } from "react-icons/pi";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xcode } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Link } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";

const Chatbot = () => {
  const dispatch = useDispatch();
  const { error, isLoading, conversation } = useSelector(
    (state) => state.chatbot || {}
  );
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  // // Auto-scroll to bottom when messages change
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [conversation]);

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(addUserMessage(message));
      dispatch(chatbotConversation(message));
      setMessage("");
    }
  };

  return (
    <section className="chatbot flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bot-header center relative gap-20 p-4 bg-white border-b">
        <div className="back-btn absolute left-2 p-2 bg-gray-100 rounded hover:ring-1">
          <Link to="/" className="flex items-center gap-1">
            <LuArrowLeft size={24} /> <span className="hidden sm:block">Back to Home</span>
          </Link>
        </div>
        <div className="center">
          <LuBot className="mr-2" size={32} />
          <h1 className="sm:text-xl font-semibold">Your Learning Companion</h1>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {conversation.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <LuBot size={48} className="text-gray-400 mb-4" />
            <p className="text-gray-600 max-w-md">
              Ask me anything about programming, concepts, or your course
              material.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg p-3 ${
                    msg.role === "bot"
                      ? "bg-white border max-w-4xl"
                      : "max-w-sm bg-blue-100"
                  }`}
                >
                  <div
                    className={`flex items-center mb-1 ${
                      msg.role === "bot" ? "justify-start" : "justify-end"
                    }`}
                  >
                    {msg.role === "bot" ? (
                      <>
                        <LuBot className="text-green-500 mr-2" />
                        <span className="font-medium">Assistant</span>
                      </>
                    ) : (
                      <>
                        <LuUser className="text-blue-500 mr-2" />
                        <span className="font-medium">You</span>
                      </>
                    )}
                  </div>
                  <ReactMarkdown
                    components={{
                      code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={xcode}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className="bg-gray-200 px-1 rounded" {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border rounded-lg p-3 max-w-xs md:max-w-md">
                  <div className="flex items-center">
                    <LuBot className="text-green-500 mr-2" />
                    <span className="font-medium">Assistant</span>
                  </div>
                  <p>Thinking...</p>
                </div>
              </div>
            )}
            {error && (
              <div className="text-red-500 text-center p-2 bg-red-50 rounded">
                Error: {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <form className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !message.trim()}
            className="bg-blue-500 text-white p-4 rounded-lg disabled:opacity-50"
          >
            <PiPaperPlaneRightBold size={20} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Chatbot;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDoubts, resolveDoubt } from "../store/slices/userSlice";
import Loader from "../components/Loader";
import FetchUserId from "../utils/FetchUserId";

const ChatBot = () => {
  const { user, isLoading } = useSelector((state) => state?.user);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);

  const dispatch = useDispatch();
  const userId = FetchUserId();

  const fetchMessages = async () => {
    try {
      const result = await dispatch(fetchUserDoubts(userId));
      const fetchedMessages = result.payload
        ? result.payload
            .map((chat) => [
              { text: chat.question, sender: "user" },
              { text: chat.answer, sender: "bot" },
            ])
            .flat()
        : [];
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!question.trim()) return;

    const userMessage = { text: question, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setIsThinking(true);

    try {
      const response = await dispatch(resolveDoubt({ userId, question }));
      if (response.payload && response.payload.answer) {
        const botMessage = { text: response.payload.answer, sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        console.error("Failed to get bot response", response);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setIsThinking(false);
    setQuestion("");
  };

  useEffect(() => {
    if (userId) fetchMessages();
  }, [userId]); // Ensure useEffect only triggers when userId is available

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col h-screen w-full overflow-y-hidden">
      <div className="flex-grow mt-12 overflow-y-auto p-4 bg-gray-100 w-full overflow-x-hidden">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg max-w-xs w-full ${
              message.sender === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-300 text-black self-start"
            }`}
          >
            {message.text}
          </div>
        ))}
        {isThinking && (
          <div className="mb-4 p-3 rounded-lg max-w-xs w-full bg-gray-200 text-black">
            Thinking...
          </div>
        )}
      </div>
      <div className="p-4 bg-white flex items-center border-t border-gray-300">
        <input
          className="flex-grow border border-gray-300 rounded-lg p-2 mr-4"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your query"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;

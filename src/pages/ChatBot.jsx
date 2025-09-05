import { useState, useRef, useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  chatbotConversation,
  addUserMessage,
} from "../store/slices/chatbotSlice";
import { LuBot, LuHouse, LuMic, LuSendHorizontal } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Link } from "react-router-dom";
import { Bars, ThreeDots } from "react-loader-spinner";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const Chatbot = () => {
  const dispatch = useDispatch();
  const { error, isLoading, conversation } = useSelector(
    (state) => state.chatbot || {}
  );

  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false)
  const messageRef = useRef(null);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();


  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    if (message.trim()) {
      await dispatch(addUserMessage(message));
      await dispatch(chatbotConversation({ message, conversation }));
      setMessage("");
    }

  };

  const handleListen = () => {
    if (!isListening) {
      setIsListening(true);
      SpeechRecognition.startListening({ continuous: true });
    } else {
      setIsListening(false);
      SpeechRecognition.stopListening();
      resetTranscript()
    }
  };

  useEffect(() => {
    if (isListening) {
      setMessage(transcript)
    }
  }, [isListening, transcript]);


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&aspos;t support speech recognition.</span>;
  }

  return (
    <section className="chatbot flex flex-col min-h-dvh bg-neutral-900 text-neutral-100">
      {/* Header */}
      <div className="bot-header p-2 fixed top-0 w-full flex items-center gap-6 bg-neutral-900 border-b border-neutral-700">
        <div className="relative">
          <button className="back-btn relative left-2 p-2 rounded hover:ring-1 w-fit" title="Back to EduDocs">
            <Link to="/" className="flex items-center gap-2">
              <LuHouse size={24} />
            </Link>
          </button>
          <div id="tooltip-bottom" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip bg-gray-700">
            Tooltip on bottom
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
        <div className="bot-name">
          <h2 className="text-lg font-bold">EduQueria</h2>
        </div>
      </div>

      {/* Messages */}
      {conversation.length === 0 ? (
        <div className="min-h-screen p-4  flex flex-col items-center justify-center text-center text-neutral-200">
          <LuBot size={48} className="text-gray-400 mb-4" />
          <p className="text-gray-200 max-w-md">
            Ask me anything about programming, concepts, or your course
            material.
          </p>
        </div>
      )
        : (
          <div className="max-w-7xl w-full mx-auto px-4 py-24">
            {conversation.length > 0 && (
              <div className="space-y-4 max-w-2xl mx-auto overflow-x-hidden">
                {conversation.map((msg, index) => (
                  <div key={index} className={`query-block  ${msg.role == "user" ? "font-bold text-wrap" : "border-b py-4 border-neutral-700"} `} ref={messageRef}>
                    <div className="grid grid-cols-1 gap-2">
                      {msg.role === "assistant" && (
                        <div className="flex gap-2 px-2 py-2 mb-2 border-b-2 border-neutral-500 w-fit">
                          <LuBot className="text-2xl" />
                          <h5 className="font-medium">Answer</h5>
                        </div>
                      )}


                      <ReactMarkdown
                        components={{
                          code({ inline, className, children, ...props }) {
                            let match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={vs2015}
                                language={match[1]}
                                wrapLongLines
                                wrapLines
                                PreTag="div"
                                className="break-word"
                                {...props}
                              >
                                {children}
                              </SyntaxHighlighter>
                            ) : (
                              <code
                                className="bg-neutral-800 px-1 rounded break-words"
                                {...props}
                              >
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
                  <div className="loader">
                    <ThreeDots width={32} color="gray" />
                  </div>
                )}
                {error && (
                  <div className="text-red-500 text-center p-2 bg-red-50 rounded">
                    Error: {error}
                  </div>
                )}
                <div />
              </div>
            )}
          </div>

        )}

      {/* Input */}
      <div className="fixed bottom-5 w-full px-4">
        <form
          onSubmit={handleSendMessage}
          className="flex items-end gap-2 max-w-3xl mx-auto bg-neutral-900 border border-neutral-700 shadow-lg rounded-xl p-3"
        >
          <textarea
            id="query"
            name="query"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            rows={1}
            className="flex-1 resize-none bg-neutral-900 border-none focus:ring-0 focus:outline-none rounded-lg p-2 text-neutral-100"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />

          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 bg-white hover:bg-neutral-300 text-black rounded-full disabled:opacity-50 transition-colors" onClick={handleListen}>
            {
              !listening ? (<LuMic size={20} />) : (<Bars height={20} color="#00000" />)
            }
          </button>

          <button
            type="submit"
            disabled={isLoading || !message.trim() && isListening}
            className="flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full disabled:opacity-50 transition-colors"
          >
            <LuSendHorizontal size={20} />
          </button>
        </form>
      </div>

    </section>
  );
};

export default Chatbot;

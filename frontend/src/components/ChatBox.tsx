import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
const ChatBox = ({messages}: {messages: string[]}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-box">
      {messages.map((msg, index) => {
        const isMe = msg.startsWith("Me:");
        const isTina = msg.startsWith("Tina:");
        
        return(
          <div key={index} className={`message ${isMe ? 'me' : isTina ? 'tina' : ''}`}>
            <ReactMarkdown>{msg}</ReactMarkdown>
          </div>
        )
      })}
      <div ref={bottomRef} />
    </div>
    
  );
}

export default ChatBox;
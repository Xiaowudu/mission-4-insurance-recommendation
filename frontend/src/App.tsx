import { useState,useEffect,useRef } from 'react'
import './App.css'
import ChatBox from './components/ChatBox'
import SubmitButton from './components/SubmitButton'
import UserInput from './components/UserInput'
import API_BASE_URL from './config/api'

function App() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const called = useRef(false);
  
  const handleChange = (value: string) => {
    setInput(value);
  };

  const handleStart = async () => {
    setLoading(true);
    const response = await fetch(`${API_BASE_URL}/start-chat`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(!response.ok) {
      console.error('Failed to start chat:', response.statusText);
      const errorMessage = await response.text();
      setChatHistory([...chatHistory, "Tina: " + errorMessage]);
      setLoading(false);
      return;
    }
    
    const data = await response.json();
    setChatId(data.chatId);
    console.log("Chat ID:", data.chatId);
    setChatHistory([...chatHistory, "Tina: " + data.reply]);
    setLoading(false);
  }

  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch(`${API_BASE_URL}/reply-chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer: input, chatId }),
    });
    if(!response.ok) {
      console.error('Failed to reply chat:', response.statusText);
      const errorMessage = await response.text();
      setChatHistory([...chatHistory, "Tina: " + errorMessage]);
      setLoading(false);
      return;
    }
    const data = await response.json();
    setChatHistory([...chatHistory, "Me: " + input, "Tina: " + data.reply]);
    setInput("");
    setLoading(false);
  }

  useEffect(() => {
    if (called.current) return;
    called.current = true;
    handleStart();
  }, []);

  return (
    <>
      <h1>Tina - Your AI Insurance Policy Assistant</h1>
      <ChatBox messages={chatHistory} />
      <div className="bottom-section">
        <UserInput onChange={handleChange} input={input} />
        <SubmitButton onClick={handleSubmit} loading={loading} />
      </div>
    </>
  )
}

export default App

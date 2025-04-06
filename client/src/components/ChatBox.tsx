import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ChatBox.css';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const carId = 2;

  useEffect(() => {
    // You can preload messages or car info here if needed
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await axios.post('http://localhost:3001/api/ask', {
        question: input,
      });

      const botMessage = { sender: 'bot', text: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err);
    }
  };

  return (
    <div className="chatbox">
      <div className="chat-header">Used Car Chat Assistant</div>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            <div className="bubble">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          placeholder="Ask anything about the car..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;

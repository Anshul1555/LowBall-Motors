import React from 'react';
import { useState, useEffect } from 'react';
import '../css/offerchat.css';
//import { OpenAIReply } from 'openai';


export default function ChatBox( {car}) {
  //variables
  //controls the opening and closing of the chat
  const [isOpen, setIsOpen] = useState(false);
  //stores messages memory
  const [messages, setMessages] = useState([]);
  //sets the user input to an empty string
  const [input, setInput] = useState('');

  const [hasSentFirstMessage, setHasSentFirstMessage] = useState(false);

  useEffect(() => {
    const sendFirstMessage = async () => {
      if (isOpen && !hasSentFirstMessage && messages.length === 0 && car) {
        const halfPrice = (car.price / 2).toLocaleString();
        const lowballMessage = `Would you accept $${halfPrice} for your this piece of junk?`;

        const userMessage = { role: 'user', text: lowballMessage };
        setMessages([userMessage]);
        setHasSentFirstMessage(true);

        const theReply = await OpenAIReply(lowballMessage);
        setMessages((prev) => [...prev, { role: 'assistant', text: theReply }]);
      }
    };

    sendFirstMessage();
  }, [isOpen]);

  //methods
  //This should flip the isOpen between true and false
  const toggleChat = () => setIsOpen(!isOpen)

  //Handles what happens when the user hits "send"
  const handleSend = async (e) => {
    console.log('Handle send checkpoint')
    e.preventDefault(); //preventing reload on submit
    if (!input.trim()) return console.log('empty message'); //handling empty messages
     
    const userMessage = {role: 'user', text: input}
    setMessages((prev) => [...prev, userMessage]); //sends messages to the chat
    setInput('') //clearing the input
    console.log(userMessage); //this is logging

    
    const theReply = await OpenAIReply(userMessage.text); 
    console.log('Reply receivec:', theReply);
    
    console.log(theReply); //testing to see if reply is reading
    setMessages((prev) => [...prev, {role: 'assistant', text: theReply}]);
  };

  const OpenAIReply = async (message) => {
    try {const res = await fetch('http://localhost:3001/api/chat', { //REMEMBER TO CHANGE THIS WHEN WE RENDER ON RENDER WITH RENDER
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
      });
      

      if (!res.ok) {
        throw new Error ('Failed to fetch AI reply')
      }

    const data = await res.json();
    console.log('data', data)
    console.log('OpenAI Response:', data);
    return data.reply;

    } catch (err) {
      console.error(`Chatbox error:`, err);
      return `The OfferChat component made an oopsie daisies in the fetch`;
    }}
    console.log("Saved in messages:", messages);
  return (
    <div>
    {/* Chat toggle button */}
    <button className="chat-toggle" onClick={toggleChat}>
      SEND LOWBALL
    </button>

    {/* Chat popup window */}
    {isOpen && (
    
      <>
      <div className="chat-overlay"></div>
      
      <div className="chat-popup">
        {/* Header */}
        <div className="chat-header">
          <span>Owner of {`${car.year} ${car.brand} ${car.model}`}</span>
          <button onClick={toggleChat}>✖</button>
        </div>

        {/* Messages */}
        <div className="chat-body">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input field */}
        <form className="chat-input" onSubmit={handleSend}>
          <input
            className="input-box"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div> 
      </>
    )
    }
    </div>
    
  );
}
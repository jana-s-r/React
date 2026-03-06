import { useState } from "react";
import "../styles/chatbot.css";

function Chatbot() {
  type Message = {
    sender: string;
    text: string;
  };

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleAsk = () => {
    const question = input.toLowerCase();
    let botReply = "";

    if (question.includes("hi")) {
      botReply = "Hello!";
    } else if (question.includes("how are you")) {
      botReply = "I'm doing great!";
    } else if (question.includes("name")) {
      botReply = "I'm a React chatbot.";
    } else {
      botReply = "Sorry, I don't understand.";
    }

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input },
      { sender: "bot", text: botReply },
    ]);

    setInput("");
  };

  return (
    <div className="chat-container">
      <h2 className="name">ChatBot</h2>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "user" ? "message user" : "message bot"}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          className="searchbar"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAsk();
            }
          }}
        />

        <button onClick={handleAsk}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;

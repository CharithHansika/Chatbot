"use client";
import { useState } from "react";

export default function Home() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (!input) return;
        const userMsg = { role: "user", text: input };
        setMessages([...messages, userMsg]);

        const res = await fetch("/api/chat", {
            method: "POST",
            body: JSON.stringify({ message: input }),
        });
        const data = await res.json();
        
        setMessages(prev => [...prev, { role: "bot", text: data.text }]);
        setInput("");
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>Gemini Flash Chatbot</h2>
            <div style={{ border: "1px solid #ccc", height: "400px", overflowY: "scroll", padding: "10px" }}>
                {messages.map((m, i) => (
                    <p key={i} style={{ color: m.role === "user" ? "blue" : "green" }}>
                        <strong>{m.role}:</strong> {m.text}
                    </p>
                ))}
            </div>
            <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                style={{ width: "80%", marginTop: "10px" }}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

"use client";
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }), // මෙහි prompt ලෙස යැවීමට වගබලා ගන්න
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'bot', content: data.reply }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#1a73e8' }}>Sinhala AI Chatbot</h1>
      
      {/* මැසේජ් පෙන්වන කොටස */}
      <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ddd', padding: '15px', marginBottom: '20px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '15px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <span style={{ 
              display: 'inline-block', 
              padding: '10px', 
              borderRadius: '10px', 
              backgroundColor: msg.role === 'user' ? '#1a73e8' : '#e9ecef', 
              color: msg.role === 'user' ? 'white' : 'black' 
            }}>
              {msg.content}
            </span>
          </div>
        ))}
        {loading && <p>AI පිළිතුරු දෙමින් පවතියි...</p>}
      </div>

      {/* Input පෝරමය */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input 
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="මෙහි ලියන්න..." 
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          යවන්න
        </button>
      </form>
    </main>
  );
}

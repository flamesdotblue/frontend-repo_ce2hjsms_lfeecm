import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, Sparkles } from 'lucide-react';

const AIChat = ({ baseUrl, token }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am your HEALNEX assistant. Ask me about symptoms, reports, or care plans.' },
  ]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  const sendMessage = async (e) => {
    e?.preventDefault();
    const content = input.trim();
    if (!content) return;

    const next = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ message: content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to get AI response');
      const reply = data.reply || data.response || JSON.stringify(data);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Sorry, I ran into an issue: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading]);

  return (
    <section id="ai" className="w-full">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-fuchsia-500 to-indigo-500 flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">AI Health Assistant</h3>
            <p className="text-white/60 text-sm">Describe symptoms, ask questions, or share report context</p>
          </div>
        </div>

        <div ref={listRef} className="h-64 md:h-72 overflow-y-auto rounded-lg border border-white/10 bg-black/40 p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
              m.role === 'user'
                ? 'ml-auto bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 text-white'
                : 'mr-auto bg-white/10 text-white/90'
            }`}>
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="inline-flex items-center gap-2 text-white/70 text-sm">
              <Sparkles className="h-4 w-4 animate-pulse" /> Thinking...
            </div>
          )}
        </div>

        <form onSubmit={sendMessage} className="mt-4 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-md bg-black/40 border border-white/10 p-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-4 py-2 text-white font-medium hover:opacity-90 disabled:opacity-60"
          >
            <Send className="h-4 w-4" /> Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default AIChat;

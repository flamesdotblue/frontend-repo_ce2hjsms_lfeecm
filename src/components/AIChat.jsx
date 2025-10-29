import { useState } from 'react';
import { Bot, Send } from 'lucide-react';

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function AIChat({ token }) {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setChat((c) => [...c, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ message: userMsg.content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Chat failed');
      const botText = data.reply || data.answer || JSON.stringify(data);
      setChat((c) => [...c, { role: 'assistant', content: botText }]);
    } catch (err) {
      setChat((c) => [...c, { role: 'assistant', content: err.message || 'Error' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai" className="relative">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 grid place-items-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-white">HEALNEX AI Assistant</h3>
        </div>
        <div className="h-64 overflow-y-auto rounded-lg border border-white/10 bg-black/40 p-4 space-y-3">
          {chat.length === 0 && (
            <p className="text-sm text-cyan-200/70">Ask about symptoms, appointments, or care guidance.</p>
          )}
          {chat.map((m, i) => (
            <div key={i} className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${m.role === 'user' ? 'ml-auto bg-cyan-500/20 text-cyan-100' : 'bg-fuchsia-500/20 text-fuchsia-100'}`}>
              {m.content}
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="mt-4 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms or ask a question…"
            className="flex-1 rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-2 font-medium text-white hover:opacity-90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            Send
          </button>
        </form>
      </div>
    </section>
  );
}

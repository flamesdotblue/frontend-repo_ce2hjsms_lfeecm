import { useState } from 'react';

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function AuthPortal({ onAuthenticated }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      if (mode === 'register') {
        const res = await fetch(`${baseURL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
            role: form.role,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || 'Registration failed');
        setMessage('Registration successful. You can now log in.');
        setMode('login');
      } else {
        const res = await fetch(`${baseURL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, password: form.password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || 'Login failed');
        onAuthenticated?.(data.token, data.user || null);
        setMessage('Logged in successfully.');
      }
    } catch (err) {
      setMessage(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="auth" className="relative">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-white">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-sm text-cyan-300 hover:text-white transition"
          >
            {mode === 'login' ? 'Need an account?' : 'Have an account? Log in'}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {mode === 'register' && (
            <div className="grid gap-2">
              <label className="text-sm text-cyan-200">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Alex Johnson"
              />
            </div>
          )}
          <div className="grid gap-2">
            <label className="text-sm text-cyan-200">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="you@healnex.ai"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-cyan-200">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="••••••••"
            />
          </div>
          {mode === 'register' && (
            <div className="grid gap-2">
              <label className="text-sm text-cyan-200">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-4 py-2 font-medium text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Please wait…' : mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
          {message && <p className="text-sm text-cyan-200/90">{message}</p>}
        </form>
      </div>
    </section>
  );
}

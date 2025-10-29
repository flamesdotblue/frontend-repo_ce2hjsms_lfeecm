import React, { useState } from 'react';
import { LogIn, Shield, User } from 'lucide-react';

const AuthPortal = ({ baseUrl, onAuth }) => {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient'); // patient | doctor | admin
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Authentication failed');

      // Expected response: { token, user: { email, role, ... } }
      onAuth(data.token, data.user || { email, role });
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="auth" className="w-full">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h3>
              <p className="text-white/60 text-sm">Access your personalized health hub</p>
            </div>
          </div>
          <div className="flex gap-2 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setMode('login')}
              className={`px-3 py-1.5 text-sm rounded-md ${mode === 'login' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'}`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('register')}
              className={`px-3 py-1.5 text-sm rounded-md ${mode === 'register' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'}`}
            >
              Register
            </button>
          </div>
        </div>

        <form onSubmit={submit} className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/70">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-md bg-black/40 border border-white/10 p-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                placeholder="you@healnex.com"
              />
            </div>
            <div>
              <label className="text-xs text-white/70">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full rounded-md bg-black/40 border border-white/10 p-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-white/70">Role</label>
            <div className="mt-1 grid grid-cols-3 gap-2">
              {['patient', 'doctor', 'admin'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex items-center justify-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm transition ${
                    role === r ? 'bg-white/20 text-white' : 'bg-black/40 text-white/70 hover:text-white'
                  }`}
                >
                  <User className="h-4 w-4" /> {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-md p-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-5 py-3 text-white font-medium shadow-[0_0_30px_-5px_rgba(34,211,238,0.5)] hover:opacity-90 disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" /> {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AuthPortal;

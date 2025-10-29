import React, { useEffect, useMemo, useState } from 'react';
import Spline from '@splinetool/react-spline';
import Header from './components/Header';
import AuthPortal from './components/AuthPortal';
import ReportUploader from './components/ReportUploader';
import AIChat from './components/AIChat';

function App() {
  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', []);
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [section, setSection] = useState('auth');

  useEffect(() => {
    const t = localStorage.getItem('healnex_token');
    const u = localStorage.getItem('healnex_user');
    if (t) setToken(t);
    if (u) setUser(JSON.parse(u));
  }, []);

  const handleAuth = (tok, usr) => {
    setToken(tok);
    setUser(usr);
    localStorage.setItem('healnex_token', tok);
    localStorage.setItem('healnex_user', JSON.stringify(usr));
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('healnex_token');
    localStorage.removeItem('healnex_user');
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* 3D Background */}
      <div className="fixed inset-0">
        <Spline scene="https://prod.spline.design/kQvG7wlO1TflLQkC/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Ambient gradients overlay - make sure it does not block pointer events */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/30 blur-3xl" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <Header user={user} onLogout={handleLogout} onNavigate={setSection} />

        <main className="mx-auto max-w-6xl px-4 py-8 md:py-12 space-y-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold">Welcome to HEALNEX</h1>
                <p className="text-white/70">Your neon-themed health companion with AI guidance and secure records.</p>
              </div>
              <div className="text-sm text-white/70">
                Status: {user ? (
                  <span className="text-white">Signed in as {user.email} ({user.role})</span>
                ) : (
                  <span className="text-white/80">Browsing as guest</span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <AuthPortal baseUrl={baseUrl} onAuth={handleAuth} />
              <ReportUploader baseUrl={baseUrl} token={token} />
            </div>
            <div className="space-y-6">
              <AIChat baseUrl={baseUrl} token={token} />
              <section id="care" className="w-full">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8">
                  <h3 className="text-white font-semibold mb-2">Care shortcuts</h3>
                  <p className="text-white/70 text-sm">Role-based dashboards coming next: personalized views for patients and doctors with appointments, prescriptions, and tailored insights.</p>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

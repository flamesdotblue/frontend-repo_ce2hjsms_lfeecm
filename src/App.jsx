import { useMemo, useState } from 'react';
import Spline from '@splinetool/react-spline';
import Header from './components/Header';
import AuthPortal from './components/AuthPortal';
import ReportUploader from './components/ReportUploader';
import AIChat from './components/AIChat';

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);

  const authed = useMemo(() => Boolean(token), [token]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06070B] text-white">
      {/* 3D Scene Background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/5a5d7kE6ICkMLs8b/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Glow gradients */}
      <div className="pointer-events-none absolute -top-20 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-fuchsia-500/30 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="relative z-10">
        <Header />

        <main className="mx-auto max-w-7xl px-6 pb-24">
          <section className="mt-8 mb-10 text-center">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              Your Neon Gateway to Smart Health
            </h1>
            <p className="mt-3 text-cyan-200/90 max-w-2xl mx-auto">
              Securely manage your health, upload reports, and chat with our AI assistant. All in a vibrant, future-forward interface.
            </p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AuthPortal
              onAuthenticated={(jwt, profile) => {
                setToken(jwt);
                setUser(profile || null);
              }}
            />

            <ReportUploader token={token} />

            <div className="lg:col-span-2">
              <AIChat token={token} />
            </div>
          </div>

          {/* Status ribbon */}
          <div className="mt-10 text-center text-sm text-cyan-200/80">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2">
              <span className={`h-2 w-2 rounded-full ${authed ? 'bg-emerald-400' : 'bg-rose-400'}`} />
              {authed ? (
                <>
                  Signed in{user?.name ? ` as ${user.name}` : ''}
                </>
              ) : (
                'Not signed in'
              )}
              <span className="mx-2 text-white/30">•</span>
              <span className="text-white/70">API: {baseURL}</span>
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}

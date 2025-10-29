import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import SplineBackground from './components/SplineBackground';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';

function App() {
  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', []);
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [section, setSection] = useState('dashboard');

  useEffect(() => {
    const t = localStorage.getItem('healnex_token');
    const u = localStorage.getItem('healnex_user');
    if (t) setToken(t);
    if (u) setUser(JSON.parse(u));
  }, []);

  const handleLogout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('healnex_token');
    localStorage.removeItem('healnex_user');
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <SplineBackground />

      {/* Foreground content */}
      <div className="relative z-10">
        <Header user={user} onLogout={handleLogout} onNavigate={setSection} />

        <main className="mx-auto max-w-6xl px-4 py-8 md:py-12 space-y-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold">HEALNEX Dashboards</h1>
                <p className="text-white/70">Personalized views for patients and doctors.</p>
              </div>
              <div className="text-sm text-white/70">
                Status: {user ? (
                  <span className="text-white">Signed in as {user.email} ({user.role})</span>
                ) : (
                  <span className="text-white/80">Please sign in from Account to access dashboards</span>
                )}
              </div>
            </div>
          </div>

          {section === 'dashboard' && (
            <div className="grid grid-cols-1 gap-6">
              {user?.role === 'patient' && (
                <PatientDashboard baseUrl={baseUrl} token={token} />
              )}
              {user?.role === 'doctor' && (
                <DoctorDashboard baseUrl={baseUrl} token={token} />
              )}
              {!user && (
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8">
                  <h3 className="text-white font-semibold mb-2">Get started</h3>
                  <p className="text-white/70 text-sm">Use the Account tab to sign in or register as a patient or doctor to view your dashboard.</p>
                </div>
              )}
              {user && user.role !== 'patient' && user.role !== 'doctor' && (
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8">
                  <h3 className="text-white font-semibold mb-2">No dashboard available</h3>
                  <p className="text-white/70 text-sm">Dashboards are currently available for patient and doctor roles.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

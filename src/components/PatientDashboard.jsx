import React, { useEffect, useState } from 'react';
import { CalendarDays, FileText, Loader2 } from 'lucide-react';

const Card = ({ title, children }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 md:p-6">
    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">{title}</h3>
    {children}
  </div>
);

const formatTime = (iso) => {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
};

const PatientDashboard = ({ baseUrl, token }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch(`${baseUrl}/dashboard/patient`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then((json) => setData(json))
      .catch((e) => setError(e.message || 'Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, [baseUrl, token]);

  if (!token) {
    return (
      <Card title={<span className="flex items-center gap-2"><CalendarDays className="h-4 w-4"/> Patient Dashboard</span>}>
        <p className="text-white/70 text-sm">Sign in to view your upcoming appointments and prescriptions.</p>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-white/80">
        <Loader2 className="h-5 w-5 animate-spin" /> Loading your dashboard...
      </div>
    );
  }

  if (error) {
    return <p className="text-red-300">{error}</p>;
  }

  const next = data?.next_appointment;
  const appts = data?.appointments || [];
  const prescs = data?.prescriptions || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title={<span className="flex items-center gap-2"><CalendarDays className="h-4 w-4"/> Next appointment</span>}>
        {next ? (
          <div className="text-sm text-white/80">
            <p className="mb-1"><span className="text-white/60">When:</span> {formatTime(next.scheduled_at)}</p>
            <p className="mb-1"><span className="text-white/60">Doctor:</span> {next.doctor_id}</p>
            {next.reason && <p><span className="text-white/60">Reason:</span> {next.reason}</p>}
          </div>
        ) : (
          <p className="text-white/70 text-sm">No appointments yet.</p>
        )}
      </Card>

      <Card title={<span className="flex items-center gap-2"><CalendarDays className="h-4 w-4"/> Appointments</span>}>
        {appts.length ? (
          <ul className="space-y-2 text-sm text-white/80 max-h-64 overflow-auto">
            {appts.map((a) => (
              <li key={a._id} className="flex items-center justify-between gap-3">
                <span className="truncate">{formatTime(a.scheduled_at)}</span>
                <span className="text-white/60 truncate">Dr: {a.doctor_id}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white/70 text-sm">No data.</p>
        )}
      </Card>

      <Card title={<span className="flex items-center gap-2"><FileText className="h-4 w-4"/> Prescriptions</span>}>
        {prescs.length ? (
          <ul className="space-y-2 text-sm text-white/80 max-h-64 overflow-auto">
            {prescs.map((p) => (
              <li key={p._id} className="truncate">{p.content}</li>
            ))}
          </ul>
        ) : (
          <p className="text-white/70 text-sm">No prescriptions yet.</p>
        )}
      </Card>
    </div>
  );
};

export default PatientDashboard;

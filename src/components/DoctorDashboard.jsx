import React, { useEffect, useState } from 'react';
import { CalendarDays, Users, FileText, Loader2 } from 'lucide-react';

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

const DoctorDashboard = ({ baseUrl, token }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch(`${baseUrl}/dashboard/doctor`, {
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
      <Card title={<span className="flex items-center gap-2"><Users className="h-4 w-4"/> Doctor Dashboard</span>}>
        <p className="text-white/70 text-sm">Sign in as a doctor to view your schedule and patient list.</p>
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

  const appts = data?.appointments || [];
  const patients = data?.patients || [];
  const prescs = data?.prescriptions || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card title={<span className="flex items-center gap-2"><CalendarDays className="h-4 w-4"/> Upcoming appointments</span>}>
        {appts.length ? (
          <ul className="space-y-2 text-sm text-white/80 max-h-64 overflow-auto">
            {appts.map((a) => (
              <li key={a._id} className="flex items-center justify-between gap-3">
                <span className="truncate">{formatTime(a.scheduled_at)}</span>
                <span className="text-white/60 truncate">Patient: {a.patient_id}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white/70 text-sm">No appointments scheduled.</p>
        )}
      </Card>

      <Card title={<span className="flex items-center gap-2"><Users className="h-4 w-4"/> Patients</span>}>
        {patients.length ? (
          <ul className="space-y-2 text-sm text-white/80 max-h-64 overflow-auto">
            {patients.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3">
                <span className="truncate">{p.name}</span>
                <span className="text-white/60 truncate">{p.email}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white/70 text-sm">No patients yet.</p>
        )}
      </Card>

      <Card title={<span className="flex items-center gap-2"><FileText className="h-4 w-4"/> Recent prescriptions</span>}>
        {prescs.length ? (
          <ul className="space-y-2 text-sm text-white/80 max-h-64 overflow-auto">
            {prescs.map((p) => (
              <li key={p._id} className="truncate">{p.content}</li>
            ))}
          </ul>
        ) : (
          <p className="text-white/70 text-sm">No prescriptions written yet.</p>
        )}
      </Card>
    </div>
  );
};

export default DoctorDashboard;

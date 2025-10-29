import React, { useState } from 'react';
import { User, Stethoscope, ShieldCheck, Lock, Mail, Phone, CalendarDays, Droplets, FileUp } from 'lucide-react';

const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
      active ? 'bg-white/10 border-white/30 text-white' : 'bg-white/5 border-white/10 text-neutral-200 hover:border-white/20'
    }`}
  >
    <Icon className="w-4 h-4" />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const Input = ({ label, type = 'text', placeholder }) => (
  <label className="block">
    <span className="text-sm text-neutral-300">{label}</span>
    <input
      type={type}
      placeholder={placeholder}
      className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white placeholder-neutral-400 focus:outline-none focus:border-cyan-400"
    />
  </label>
);

const Select = ({ label, children }) => (
  <label className="block">
    <span className="text-sm text-neutral-300">{label}</span>
    <select className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400">
      {children}
    </select>
  </label>
);

const Upload = ({ label }) => (
  <label className="block">
    <span className="text-sm text-neutral-300">{label}</span>
    <div className="mt-1 flex items-center gap-3 px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white">
      <FileUp className="w-4 h-4 text-cyan-300" />
      <input type="file" className="bg-transparent text-neutral-300" />
    </div>
  </label>
);

const AuthPortal = () => {
  const [tab, setTab] = useState('patient');

  return (
    <section id="auth" className="relative py-20 bg-gradient-to-b from-neutral-950 to-black text-white">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-extrabold">Access Portal</h2>
            <p className="mt-2 text-neutral-300">Sign in or register to continue. Choose your role to see tailored options.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <TabButton active={tab === 'patient'} onClick={() => setTab('patient')} icon={User} label="Patient" />
              <TabButton active={tab === 'doctor'} onClick={() => setTab('doctor')} icon={Stethoscope} label="Doctor" />
              <TabButton active={tab === 'admin'} onClick={() => setTab('admin')} icon={ShieldCheck} label="Admin" />
            </div>
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-fuchsia-500/10 via-cyan-500/10 to-emerald-500/10 border border-white/10">
              <p className="text-sm text-neutral-200">
                Note: This interface showcases the HEALNEX role-based flows. In the full app, these actions connect to secure APIs and databases.
              </p>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 gap-6">
            {tab === 'patient' && (
              <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
                <h3 className="text-xl font-semibold flex items-center gap-2"><User className="w-5 h-5 text-fuchsia-300" /> Patient Registration</h3>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Full Name" placeholder="Jane Doe" />
                  <Input type="email" label="Email" placeholder="jane@healnex.com" />
                  <Input type="password" label="Password" placeholder="••••••••" />
                  <Input type="tel" label="Phone" placeholder="+1 555 123 4567" />
                  <Select label="Gender">
                    <option>Female</option>
                    <option>Male</option>
                    <option>Non-binary</option>
                    <option>Prefer not to say</option>
                  </Select>
                  <Select label="Blood Group">
                    {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g => (
                      <option key={g}>{g}</option>
                    ))}
                  </Select>
                  <Input label="Current Disease/Concern" placeholder="e.g., Type 2 Diabetes" />
                  <Input label="Medical History" placeholder="Allergies, surgeries, conditions..." />
                  <Select label="Preferred Specialist for Appointment">
                    <option>General Medicine</option>
                    <option>Cardiology</option>
                    <option>Neurology</option>
                    <option>Orthopedics</option>
                    <option>Dermatology</option>
                    <option>Pediatrics</option>
                    <option>Oncology</option>
                    <option>Psychiatry</option>
                  </Select>
                  <Input label="Preferred Appointment Date" type="date" />
                  <Upload label="Upload Latest Blood Report (PDF)" />
                </div>
                <div className="mt-5 flex gap-3">
                  <button className="px-5 py-3 rounded-lg font-semibold bg-gradient-to-r from-fuchsia-500 to-cyan-500">Register & Request Appointment</button>
                  <button className="px-5 py-3 rounded-lg font-semibold border border-white/20">Login</button>
                </div>
              </div>
            )}

            {tab === 'doctor' && (
              <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
                <h3 className="text-xl font-semibold flex items-center gap-2"><Stethoscope className="w-5 h-5 text-cyan-300" /> Doctor Registration</h3>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Full Name" placeholder="Dr. John Smith" />
                  <Input type="email" label="Email" placeholder="drsmith@healnex.com" />
                  <Input type="password" label="Password" placeholder="••••••••" />
                  <Input label="License Number" placeholder="MED-XXXX-XXXX" />
                  <Select label="Specialization">
                    <option>General Medicine</option>
                    <option>Cardiology</option>
                    <option>Neurology</option>
                    <option>Orthopedics</option>
                    <option>Dermatology</option>
                    <option>Pediatrics</option>
                    <option>Oncology</option>
                    <option>Psychiatry</option>
                    <option>Gynecology</option>
                    <option>Endocrinology</option>
                  </Select>
                  <Input label="Years of Experience" type="number" placeholder="10" />
                </div>
                <div className="mt-5 flex gap-3">
                  <button className="px-5 py-3 rounded-lg font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500">Register as Doctor</button>
                  <button className="px-5 py-3 rounded-lg font-semibold border border-white/20">Login</button>
                </div>
              </div>
            )}

            {tab === 'admin' && (
              <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
                <h3 className="text-xl font-semibold flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-300" /> Admin Access</h3>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input type="email" label="Email" placeholder="admin@healnex.com" />
                  <Input type="password" label="Password" placeholder="••••••••" />
                </div>
                <div className="mt-5 flex gap-3">
                  <button className="px-5 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-500 to-fuchsia-500">Login to Admin</button>
                  <button className="px-5 py-3 rounded-lg font-semibold border border-white/20">Create Admin</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthPortal;

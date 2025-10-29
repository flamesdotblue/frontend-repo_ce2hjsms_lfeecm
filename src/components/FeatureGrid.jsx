import React from 'react';
import { Database, Stethoscope, CalendarCheck, FileChart, BrainCircuit } from 'lucide-react';

const features = [
  {
    title: 'Comprehensive Disease DB',
    desc: 'Explore an extensive catalog of diseases with symptoms, causes, prevention, and treatments.',
    icon: Database,
    color: 'from-cyan-400 to-emerald-400',
  },
  {
    title: 'Patient Health Records',
    desc: 'Securely manage medical history, prescriptions, and test reports in one place.',
    icon: FileChart,
    color: 'from-fuchsia-400 to-purple-400',
  },
  {
    title: 'Smart Appointments',
    desc: 'Schedule visits with the right specialist using intelligent matching.',
    icon: CalendarCheck,
    color: 'from-purple-400 to-cyan-400',
  },
  {
    title: 'Doctor Dashboard',
    desc: 'Track patients, diagnose conditions, and issue prescriptions with ease.',
    icon: Stethoscope,
    color: 'from-amber-400 to-pink-400',
  },
  {
    title: 'AI Chat Assistant',
    desc: 'Ask health questions and get instant guidance from an integrated AI chatbox.',
    icon: BrainCircuit,
    color: 'from-blue-400 to-fuchsia-400',
  },
];

const FeatureGrid = () => {
  return (
    <section id="features" className="relative py-20 bg-gradient-to-b from-black to-neutral-950 text-white">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-500/10 via-cyan-500/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Core Features for Modern Healthcare
          </h2>
          <p className="mt-3 text-neutral-300 max-w-2xl mx-auto">
            Designed for patients, doctors, and admins to collaborate seamlessly in a secure environment.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ title, desc, icon: Icon, color }) => (
            <div key={title} className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur hover:border-white/20 transition">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${color} text-black font-bold shadow-lg shadow-fuchsia-500/20`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-neutral-300">{desc}</p>
              <div className="absolute inset-0 -z-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-fuchsia-500/10 via-cyan-500/10 to-emerald-500/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;

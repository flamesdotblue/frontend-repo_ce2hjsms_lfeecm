import React from 'react';
import Spline from '@splinetool/react-spline';
import { Sparkles, Shield, Activity } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[88vh] lg:h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/D17NpA0ni2BTjUzp/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Neon gradient overlay for extra vibrance, doesn't block Spline interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-24 lg:pt-36">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-6">
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span className="text-xs tracking-wide uppercase">QUADXTITAN presents</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-emerald-300">
            HEALNEX
          </span>{' '}
          — Your Neon Gateway to Next‑Gen Health Tech
        </h1>
        <p className="mt-5 max-w-2xl text-neutral-200 leading-relaxed">
          A futuristic platform for patients, doctors, and admins. Manage medical records, discover diseases, schedule appointments, and collaborate — all wrapped in a vibrant, 3D‑powered experience.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#auth" className="px-5 py-3 rounded-lg font-semibold bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white shadow-lg shadow-fuchsia-500/30 hover:opacity-90 transition">
            Get Started
          </a>
          <a href="#features" className="px-5 py-3 rounded-lg font-semibold border border-white/20 hover:border-white/40 bg-white/5 backdrop-blur">
            Explore Features
          </a>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <Shield className="w-5 h-5 text-emerald-300" />
            <span className="text-sm text-neutral-200">Secure role-based access</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <Activity className="w-5 h-5 text-cyan-300" />
            <span className="text-sm text-neutral-200">AI-assisted workflows</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <Sparkles className="w-5 h-5 text-fuchsia-300" />
            <span className="text-sm text-neutral-200">Immersive 3D experience</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

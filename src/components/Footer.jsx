import React from 'react';
import { HeartPulse, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 bg-black text-white">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-fuchsia-500/10 via-transparent to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-cyan-500 flex items-center justify-center">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <p className="text-lg font-bold">HEALNEX</p>
            <p className="text-sm text-neutral-300">by QUADXTITAN • Futuristic Neon Health Tech</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-neutral-300">
          <a href="#" className="hover:text-white flex items-center gap-2">
            <Github className="w-4 h-4" />
            <span className="text-sm">GitHub</span>
          </a>
          <a href="#" className="hover:text-white flex items-center gap-2">
            <Twitter className="w-4 h-4" />
            <span className="text-sm">Twitter</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

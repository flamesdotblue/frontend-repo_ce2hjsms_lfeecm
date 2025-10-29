import React from 'react';
import { HeartPulse, MessageCircle, Upload, User, Stethoscope, LayoutDashboard } from 'lucide-react';

const Header = ({ user, onLogout, onNavigate }) => {
  return (
    <header className="w-full sticky top-0 backdrop-blur bg-black/30 border-b border-white/10 z-20">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-cyan-400 flex items-center justify-center shadow-[0_0_30px_-5px_rgba(168,85,247,0.7)]">
            <HeartPulse className="h-5 w-5 text-white" />
          </div>
          <span className="text-white font-semibold tracking-wide">HEALNEX</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <button onClick={() => onNavigate('auth')} className="hover:text-white transition inline-flex items-center gap-2">
            <User className="h-4 w-4" /> Account
          </button>
          <button onClick={() => onNavigate('upload')} className="hover:text-white transition inline-flex items-center gap-2">
            <Upload className="h-4 w-4" /> Upload
          </button>
          <button onClick={() => onNavigate('ai')} className="hover:text-white transition inline-flex items-center gap-2">
            <MessageCircle className="h-4 w-4" /> AI Chat
          </button>
          <button onClick={() => onNavigate('care')} className="hover:text-white transition inline-flex items-center gap-2">
            <Stethoscope className="h-4 w-4" /> Care
          </button>
          {user && (
            <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition inline-flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </button>
          )}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs md:text-sm text-white/80">{user.email} · {user.role}</span>
              <button
                onClick={onLogout}
                className="px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/10"
              >
                Logout
              </button>
            </div>
          ) : (
            <span className="text-xs md:text-sm text-white/60">Guest</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

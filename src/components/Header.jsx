import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative w-full z-10">
      <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-fuchsia-500 via-cyan-400 to-emerald-400 p-[2px]">
            <div className="h-full w-full rounded-[10px] bg-black/80 grid place-items-center">
              <Sparkles className="h-5 w-5 text-cyan-300" />
            </div>
          </div>
          <div>
            <p className="text-cyan-300 font-semibold tracking-wide">HEALNEX</p>
            <p className="text-xs text-fuchsia-300/80">Neon Health Intelligence</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-sm">
          <a href="#auth" className="text-cyan-200/90 hover:text-white transition">Account</a>
          <a href="#upload" className="text-cyan-200/90 hover:text-white transition">Reports</a>
          <a href="#ai" className="text-cyan-200/90 hover:text-white transition">AI Chat</a>
        </div>
      </div>
    </header>
  );
}

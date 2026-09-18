import { useApp } from '../../context/AppProvider.jsx';

export default function TopBar() {
  const { sfxEnabled, toggleSfx, setSearchOpen, playClick } = useApp();

  return (
    <div className="bg-[#14161A] border-b border-[#23262B] text-xs font-mono py-1.5 px-4 flex justify-between items-center z-50 relative">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-bold">SYSTEM ACTIVE</span>
        </span>
        <span className="hidden sm:inline text-[#8B9099]">JVM v21.0.4 // GCC & FAANG INTERVIEW TRANSMISSION PIPELINE</span>
      </div>
      <div className="flex items-center gap-4 text-[#8B9099]">
        <button onClick={toggleSfx} className="hover:text-[#3DDAD7] transition flex items-center gap-1">
          <span>{sfxEnabled ? '🔊' : '🔇'}</span> <span className="hidden md:inline">SFX: {sfxEnabled ? 'ON' : 'OFF'}</span>
        </button>
        <button
          onClick={() => { playClick(); setSearchOpen(true); }}
          className="hover:text-[#3DDAD7] transition flex items-center gap-1 bg-[#1B1E23] px-2 py-0.5 rounded border border-[#23262B]"
        >
          <span>⌘K Search</span>
        </button>
        <span className="hidden lg:inline text-xs text-[#3DDAD7]">Arvind Kumar Singh</span>
      </div>
    </div>
  );
}

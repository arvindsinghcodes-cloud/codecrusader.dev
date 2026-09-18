import { useApp } from '../../context/AppProvider.jsx';

const NAV_LINKS = [
  { href: '#videos', label: 'Watch' },
  { href: '#courses', label: 'Courses' },
  { href: '#practice', label: 'Practice' },
  { href: '#ide', label: 'AI IDE' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#campaigns', label: 'Campaigns' },
  { href: '#notes', label: 'Notes' },
];

export default function Navbar() {
  const { playClick, user, setAuthOpen } = useApp();

  return (
    <nav className="sticky top-0 z-40 bg-[#0A0B0D]/90 backdrop-blur-md border-b border-[#23262B] px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <a href="#hero" className="flex items-center gap-3 group" onClick={playClick}>
          <div className="relative w-10 h-10 rounded-lg bg-[#14161A] border border-[#23262B] group-hover:border-[#3DDAD7] flex items-center justify-center p-1 transition-all group-hover:shadow-[0_0_15px_rgba(61,218,215,0.3)]">
            <img src="/assets/images/logo.webp" alt="Code Crusader" className="w-full h-full object-contain filter drop-shadow" />
          </div>
          <div>
            <div className="font-display font-bold text-lg tracking-wider text-white flex items-center gap-1.5">
              <span>CODE CRUSADER</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-red-500/20 text-[#FF1A1A] border border-red-500/30">PRO</span>
            </div>
            <div className="text-[10px] font-mono text-[#8B9099] -mt-0.5">KNIGHTS CODE // ZERO FLUFF</div>
          </div>
        </a>

        <div className="hidden xl:flex items-center gap-6 text-sm font-medium text-[#8B9099]">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-[#E9EAEC] transition hover:text-glow-cyan py-1" onClick={playClick}>
              {link.label}
            </a>
          ))}
          <a href="#memory-sim" className="text-[#3DDAD7] hover:text-white transition flex items-center gap-1 py-1" onClick={playClick}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3DDAD7] animate-pulse"></span>
            <span>JMM Sim</span>
          </a>
          <a href="#iron-eclipse" className="hover:text-[#FF1A1A] transition py-1" onClick={playClick}>Iron Eclipse</a>
          <a href="#connect" className="hover:text-[#E9EAEC] transition py-1" onClick={playClick}>Connect</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { playClick(); setAuthOpen(true); }}
            className="hidden sm:inline-flex text-xs font-mono px-3 py-2 rounded border border-[#23262B] text-[#8B9099] hover:text-[#E9EAEC] hover:border-[#3DDAD7] transition"
          >
            {user ? `👤 ${user.name} (${user.role})` : 'Sign In'}
          </button>
          <a
            href="#videos"
            onClick={playClick}
            className="inline-flex items-center gap-2 bg-[#FF1A1A] hover:bg-[#ff3333] text-[#0A0B0D] font-display font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded transition transform hover:scale-105 shadow-[0_0_15px_rgba(255,26,26,0.3)]"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M6 4l14 8-14 8V4z" /></svg>
            <span>Watch Lectures</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

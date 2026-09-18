import { useApp } from '../../context/AppProvider.jsx';

const STATS = [
  { value: '42+', label: 'Deep Dive Modules', color: 'text-white' },
  { value: '100%', label: 'Bytecode Grounded', color: 'text-[#3DDAD7]' },
  { value: '0%', label: 'Surface Fluff', color: 'text-[#FF1A1A]' },
  { value: '98.4%', label: 'Interview Clearance', color: 'text-white' },
];

export default function Hero() {
  const { playClick } = useApp();

  return (
    <section id="hero" className="relative cyber-grid min-h-[85vh] flex items-center justify-center pt-8 pb-16 px-4 lg:px-8 overflow-hidden border-b border-[#23262B]">
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#FF1A1A]/15 rounded-full blur-3xl pointer-events-none pulse-glow"></div>
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-[#3DDAD7]/15 rounded-full blur-3xl pointer-events-none pulse-glow" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#14161A] border border-[#23262B] text-xs font-mono text-[#3DDAD7]">
            <span className="w-2 h-2 rounded-full bg-[#3DDAD7] animate-ping"></span>
            <span>ENTERPRISE & GCC INTERVIEW MASTERY</span>
            <span className="text-[#8B9099]">|</span>
            <span className="text-white">JAVA 21+ READY</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
            Conquer the topics that <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF1A1A] via-rose-400 to-[#3DDAD7] filter drop-shadow-[0_0_20px_rgba(255,26,26,0.3)]">
              break interviews.
            </span>
          </h1>

          <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/40 to-[#14161A] border-l-4 border-[#FF1A1A] border-y border-r border-[#23262B] relative">
            <p className="font-display text-lg sm:text-xl italic font-semibold text-rose-200">
              "Har tough topic ek jung hai, aur main hoon uska Crusader."
            </p>
            <div className="text-xs font-mono text-[#8B9099] mt-1 flex items-center gap-2">
              <span className="text-[#FF1A1A]">▶</span> Arvind Kumar Singh — Creator of Code Crusader
            </div>
          </div>

          <p className="text-[#8B9099] text-base sm:text-lg leading-relaxed max-w-2xl">
            Deep, interview-grade breakdowns of the Java internals product companies, GCC engineering teams, and Tier-1 BFSI panels actually test — Java Memory Model, Lock Contention, Thread Pool Sizing, and Spring Boot AutoConfiguration internals.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a href="#videos" onClick={playClick} className="inline-flex items-center gap-3 bg-[#FF1A1A] hover:bg-[#ff3333] text-[#0A0B0D] font-display font-bold text-sm sm:text-base px-7 py-3.5 rounded-lg transition transform hover:scale-105 shadow-[0_0_25px_rgba(255,26,26,0.4)]">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M6 4l14 8-14 8V4z" /></svg>
              <span>Start Watching Free</span>
            </a>
            <a href="#memory-sim" onClick={playClick} className="inline-flex items-center gap-2.5 bg-[#14161A] hover:bg-[#1B1E23] text-[#3DDAD7] border border-[#3DDAD7]/40 hover:border-[#3DDAD7] font-display font-semibold text-sm sm:text-base px-6 py-3.5 rounded-lg transition transform hover:scale-105 shadow-[0_0_20px_rgba(61,218,215,0.15)]">
              <span>⚡ Interactive JMM Simulator</span>
            </a>
            <a href="https://www.youtube.com/@codecrusader-dev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-[#8B9099] hover:text-white px-3 py-2">
              <span>YouTube Channel ↗</span>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#23262B]">
            {STATS.map((s) => (
              <div key={s.label} className="p-3 rounded-lg bg-[#14161A]/80 border border-[#23262B]">
                <div className={`font-display font-bold text-xl sm:text-2xl ${s.color}`}>{s.value}</div>
                <div className="text-[11px] font-mono text-[#8B9099]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center relative">
          <div className="relative w-full max-w-md aspect-[3/4] flex items-center justify-center">
            <div className="absolute inset-0 border border-[#3DDAD7]/20 rounded-2xl pointer-events-none"></div>
            <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-[#3DDAD7]"></div>
            <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-[#FF1A1A]"></div>
            <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-[#FF1A1A]"></div>
            <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-[#3DDAD7]"></div>

            <div className="absolute w-72 h-72 rounded-full border border-[#3DDAD7]/15 flex items-center justify-center">
              <div className="w-52 h-52 rounded-full border border-dashed border-[#FF1A1A]/20"></div>
            </div>

            <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
              <img
                src="/assets/images/hero-warrior.webp"
                alt="Code Crusader Hero Warrior with glowing visor and twin blades"
                className="max-h-full w-auto object-contain filter drop-shadow-[0_0_35px_rgba(61,218,215,0.4)] drop-shadow-[0_0_55px_rgba(255,26,26,0.35)] transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="absolute top-16 left-4 z-20 group cursor-pointer">
              <div className="w-4 h-4 rounded-full bg-red-500/40 border border-red-500 flex items-center justify-center animate-ping"></div>
              <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-[9px] font-mono text-white">01</div>
              <div className="hidden group-hover:block absolute left-8 top-0 w-44 p-2 bg-[#14161A] border border-[#FF1A1A] rounded text-[11px] font-mono text-gray-300 shadow-xl z-30">
                <span className="text-[#FF1A1A] font-bold">VISOR TELEMETRY:</span> Tracks real-time thread contention & latency spikes.
              </div>
            </div>

            <div className="absolute bottom-28 right-4 z-20 group cursor-pointer">
              <div className="w-4 h-4 rounded-full bg-[#3DDAD7]/40 border border-[#3DDAD7] flex items-center justify-center animate-ping"></div>
              <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-[#3DDAD7]/20 border border-[#3DDAD7] flex items-center justify-center text-[9px] font-mono text-white">02</div>
              <div className="hidden group-hover:block absolute right-8 bottom-0 w-48 p-2 bg-[#14161A] border border-[#3DDAD7] rounded text-[11px] font-mono text-gray-300 shadow-xl z-30">
                <span className="text-[#3DDAD7] font-bold">ARC REACTOR:</span> JIT Compiler HotSpot optimization engine.
              </div>
            </div>

            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#14161A] border border-[#23262B] px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg z-20 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="font-mono text-xs text-[#E9EAEC]">CODE CRUSADER // MK-IV</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

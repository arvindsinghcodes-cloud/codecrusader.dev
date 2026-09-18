import { useApp } from '../../context/AppProvider.jsx';

export default function IronEclipse() {
  const { showToast } = useApp();

  return (
    <section id="iron-eclipse" className="relative py-28 px-4 lg:px-8 overflow-hidden border-b border-[#23262B] bg-gradient-to-b from-[#0A0B0D] via-[#140b0e] to-[#0A0B0D]">
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF1A1A]/10 text-[#FF1A1A] border border-[#FF1A1A]/30 text-xs font-mono">
            <span>SCI-FI ENTERTAINMENT UNIVERSE</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-wider text-white">IRON ECLIPSE</h2>
          <div className="w-16 h-1 bg-[#FF1A1A] rounded"></div>
          <p className="font-display text-xl sm:text-2xl italic font-semibold text-rose-200">The same armor. A different fight.</p>
          <p className="text-[#8B9099] text-base sm:text-lg leading-relaxed max-w-2xl">
            Code Crusader: Iron Eclipse is the channel's sci-fi narrative project, engineered on the same production pipeline — for viewers who want the warrior in an epic story instead of just a syllabus.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => showToast('Iron Eclipse Trailer Teaser Activated ⚡')}
              className="inline-flex items-center gap-2 bg-[#FF1A1A] hover:bg-[#ff3333] text-[#0A0B0D] font-display font-bold px-7 py-3.5 rounded-lg transition transform hover:scale-105 shadow-[0_0_25px_rgba(255,26,26,0.4)]"
            >
              <span>Explore Iron Eclipse</span>
            </button>
            <span className="inline-flex items-center font-mono text-xs text-[#8B9099] px-3 py-2">
              In Production — Same Universe as the Channel
            </span>
          </div>
        </div>

        <div className="lg:col-span-4 flex justify-center">
          <div className="p-6 rounded-2xl bg-[#14161A]/80 border border-[#FF1A1A]/40 backdrop-blur-md shadow-[0_0_35px_rgba(255,26,26,0.2)] text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-red-950/60 border border-[#FF1A1A] flex items-center justify-center text-3xl">⚔️</div>
            <div className="font-display font-bold text-xl text-white">ORIGIN CLASSIFIED</div>
            <p className="text-xs font-mono text-gray-400">
              A high-stakes cinematic saga set in the cyber-wastelands of a distributed grid failure. Coming 2026.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

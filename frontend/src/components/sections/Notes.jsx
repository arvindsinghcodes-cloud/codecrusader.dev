import { useApp } from '../../context/AppProvider.jsx';
import { notes } from '../../data/notes.js';

const ACCENTS = {
  cyan: { hoverBorder: 'hover:border-[#3DDAD7]', text: 'group-hover:text-[#3DDAD7]', link: 'text-[#3DDAD7]' },
  red: { hoverBorder: 'hover:border-[#FF1A1A]', text: 'group-hover:text-[#FF1A1A]', link: 'text-[#FF1A1A]' },
};

export default function Notes() {
  const { playClick, showToast } = useApp();

  const download = (title) => {
    playClick();
    showToast(`Downloading ${title} (PDF)...`);
  };

  return (
    <section id="notes" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-b border-[#23262B]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="text-xs font-mono text-[#3DDAD7] tracking-wider uppercase mb-1">// CHEAT SHEETS & SPECS</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Interview Notes Vault</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#3DDAD7] to-[#FF1A1A] rounded mt-2"></div>
          <p className="text-[#8B9099] text-sm sm:text-base mt-2">Downloadable notes for each campaign, tagged by difficulty — high signal, zero generic definitions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((n) => {
          const a = ACCENTS[n.accent];
          return (
            <div key={n.title} className={`p-6 rounded-xl bg-[#14161A] border border-[#23262B] ${a.hoverBorder} transition flex flex-col justify-between group`}>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#3DDAD7] bg-[#3DDAD7]/10 px-2 py-0.5 rounded border border-[#3DDAD7]/20">{n.campaignTag}</span>
                  <span className={`px-2 py-0.5 rounded border ${n.levelTag === 'Advanced' ? 'text-[#FF1A1A] border-red-500/40' : 'text-gray-400 border-gray-700'}`}>{n.levelTag}</span>
                </div>
                <h3 className={`font-display font-bold text-lg text-white ${a.text} transition`}>{n.title}</h3>
                <p className="text-xs text-[#8B9099] leading-relaxed">{n.description}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#23262B] flex items-center justify-between text-xs font-mono">
                <span className="text-[#8B9099]">PDF • {n.pages} Pages</span>
                <button onClick={() => download(n.title)} className={`${a.link} hover:underline font-semibold`}>Download ↓</button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

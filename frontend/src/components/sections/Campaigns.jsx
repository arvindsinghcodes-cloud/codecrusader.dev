import { campaigns } from '../../data/campaigns.js';

const SEGMENT_STATUS = {
  published: { border: 'border-[#3DDAD7]/40', text: 'text-white', badge: <span className="text-emerald-400">✓ Published</span> },
  'in-progress': { border: 'border-[#FF1A1A]/40', text: 'text-gray-300', badge: <span className="text-[#FF1A1A] animate-pulse">In Progress</span> },
  upcoming: { border: 'border-[#23262B]', text: 'text-gray-500', badge: <span className="text-gray-500">Coming Soon</span> },
};

export default function Campaigns() {
  return (
    <section id="campaigns" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-b border-[#23262B]">
      <div className="mb-12">
        <div className="text-xs font-mono text-[#3DDAD7] tracking-wider uppercase mb-1">// SEQUENCED ROADMAPS</div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Campaigns</h2>
        <div className="w-12 h-1 bg-gradient-to-r from-[#3DDAD7] to-[#FF1A1A] rounded mt-2"></div>
        <p className="text-[#8B9099] text-sm sm:text-base mt-2">Each campaign is a sequenced battle plan, not a random playlist — segments build on each other the way complex architectures do.</p>
      </div>

      <div className="space-y-12">
        {campaigns.map((c) => (
          <div key={c.title} className="p-6 sm:p-8 rounded-2xl bg-[#14161A] border border-[#23262B]">
            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4 pb-4 border-b border-[#23262B]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xl font-bold" style={{ color: c.accent }}>{c.number}</span>
                <h3 className="font-display text-2xl font-bold text-white">{c.title}</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#8B9099]">{c.published} / {c.total} SEGMENTS PUBLISHED</span>
                <div className="w-24 h-2 bg-[#23262B] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${Math.round((c.published / c.total) * 100)}%`, backgroundColor: c.accent }}></div>
                </div>
              </div>
            </div>

            <p className="text-sm text-[#8B9099] max-w-3xl mb-6">{c.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
              {c.segments.map((s) => {
                const st = SEGMENT_STATUS[s.status];
                return (
                  <div key={s.n} className={`p-3 rounded-lg bg-[#0A0B0D] border ${st.border} flex items-center justify-between`}>
                    <span className={st.text}><strong style={{ color: s.status === 'upcoming' ? undefined : c.accent }}>{s.n}</strong> {s.title}</span>
                    {st.badge}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

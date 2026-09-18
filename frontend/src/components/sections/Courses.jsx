import { useMemo, useState } from 'react';
import { useApp } from '../../context/AppProvider.jsx';
import { courses } from '../../data/courses.js';

const ACCENTS = {
  cyan: { chip: 'bg-[#3DDAD7]/10 text-[#3DDAD7] border-[#3DDAD7]/30', hoverBorder: 'hover:border-[#3DDAD7]', hoverShadow: 'hover:shadow-[0_10px_25px_rgba(61,218,215,0.15)]', bar: 'bg-[#3DDAD7]', text: 'group-hover:text-[#3DDAD7]', link: 'text-[#3DDAD7]' },
  red: { chip: 'bg-[#FF1A1A]/10 text-[#FF1A1A] border-[#FF1A1A]/30', hoverBorder: 'hover:border-[#FF1A1A]', hoverShadow: 'hover:shadow-[0_10px_25px_rgba(255,26,26,0.15)]', bar: 'bg-[#FF1A1A]', text: 'group-hover:text-[#FF1A1A]', link: 'text-[#FF1A1A]' },
  emerald: { chip: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', hoverBorder: 'hover:border-emerald-400', hoverShadow: '', bar: 'bg-emerald-400', text: 'group-hover:text-emerald-400', link: 'text-emerald-400' },
};

export default function Courses() {
  const { playClick, showToast } = useApp();
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(
    () => (filter === 'all' ? courses : courses.filter((c) => c.type === filter)),
    [filter],
  );

  const applyFilter = (type) => {
    playClick();
    setFilter(type);
    showToast('Filtered courses: ' + type.toUpperCase());
  };

  return (
    <section id="courses" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-b border-[#23262B]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="text-xs font-mono text-[#3DDAD7] tracking-wider uppercase mb-1">// SYLLABUS TRACKS</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Courses</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#3DDAD7] to-[#FF1A1A] rounded mt-2"></div>
          <p className="text-[#8B9099] text-sm sm:text-base mt-2">Structured engineering curriculums per language, framework, and distributed tool.</p>
        </div>
        <div className="flex items-center gap-1.5 bg-[#14161A] p-1 rounded-lg border border-[#23262B] text-xs font-mono">
          <button onClick={() => applyFilter('all')} className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-[#1B1E23] text-white' : 'text-[#8B9099] hover:text-white'}`}>All ({courses.length})</button>
          <button onClick={() => applyFilter('lang')} className={`px-3 py-1 rounded ${filter === 'lang' ? 'bg-[#1B1E23] text-white' : 'text-[#8B9099] hover:text-white'}`}>Languages</button>
          <button onClick={() => applyFilter('fw')} className={`px-3 py-1 rounded ${filter === 'fw' ? 'bg-[#1B1E23] text-white' : 'text-[#8B9099] hover:text-white'}`}>Frameworks</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((c) => {
          const a = ACCENTS[c.color];
          return (
            <div key={c.title} className={`p-5 rounded-xl bg-[#14161A] border border-[#23262B] ${a.hoverBorder} transition transform hover:-translate-y-1 ${a.hoverShadow} flex flex-col justify-between group`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-lg font-display font-bold text-sm flex items-center justify-center border ${a.chip}`}>{c.code}</div>
                  <span className={`text-xs font-mono ${c.progressColor}`}>{c.progressLabel}</span>
                </div>
                <div>
                  <h3 className={`font-display font-bold text-lg text-white ${a.text} transition`}>{c.title}</h3>
                  <div className="text-xs font-mono text-[#8B9099]">{c.category} • {c.modules} modules</div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-1.5 w-full bg-[#23262B] rounded-full overflow-hidden">
                  <div className={`h-full ${a.bar} rounded-full`} style={{ width: `${c.progress}%` }}></div>
                </div>
                {c.completed ? (
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); playClick(); showToast('Course completed! Certificate available.'); }}
                    className={`block text-right text-xs font-mono ${a.link} hover:underline pt-1`}
                  >
                    {c.cta}
                  </a>
                ) : (
                  <a href={c.ctaHref} className={`block text-right text-xs font-mono ${a.link} hover:underline pt-1`}>{c.cta}</a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppProvider.jsx';

const RESULTS = [
  { href: '#videos', label: '01. Heap vs Stack Memory Layout (JMM)', kind: 'Video', kindColor: 'text-[#3DDAD7]' },
  { href: '#memory-sim', label: 'JVM Object Layout & Alignment Simulator', kind: 'Tool', kindColor: 'text-[#3DDAD7]' },
  { href: '#notes', label: 'GC Algorithms Compared (G1 vs ZGC)', kind: 'PDF', kindColor: 'text-[#FF1A1A]' },
];

export default function SearchModal() {
  const { searchOpen, setSearchOpen } = useApp();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!searchOpen) setQuery('');
  }, [searchOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [setSearchOpen]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4">
      <div className="bg-[#14161A] border border-[#23262B] w-full max-w-xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        <div className="p-3 border-b border-[#23262B] flex items-center gap-3">
          <span className="text-gray-400">🔍</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lectures, JMM topics, algorithms, notes..."
            className="w-full bg-transparent text-sm text-white focus:outline-none font-mono"
          />
          <button onClick={() => setSearchOpen(false)} className="text-xs font-mono text-gray-500 hover:text-white px-2 py-1 bg-[#1B1E23] rounded">ESC</button>
        </div>
        <div className="p-2 max-h-72 overflow-y-auto space-y-1 font-mono text-xs">
          {!query.trim() ? (
            <div className="p-2 text-gray-500">Type to search across all 42 modules and cheat sheets...</div>
          ) : (
            RESULTS.map((r) => (
              <a
                key={r.label}
                href={r.href}
                onClick={() => setSearchOpen(false)}
                className="block p-2 hover:bg-[#1B1E23] rounded text-white flex justify-between"
              >
                <span>{r.label}</span>
                <span className={r.kindColor}>{r.kind}</span>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

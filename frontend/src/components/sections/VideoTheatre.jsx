import { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppProvider.jsx';
import { videos, chapterMarkers } from '../../data/videos.js';

const TOTAL_SECONDS = 18 * 60 + 42;

function formatTime(progressPct) {
  const curSec = Math.floor((progressPct / 100) * TOTAL_SECONDS);
  const m = Math.floor(curSec / 60);
  const s = curSec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} / 18:42`;
}

export default function VideoTheatre() {
  const { playClick, showToast } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);
  const [tab, setTab] = useState('queue');
  const intervalRef = useRef(null);

  const video = videos[currentIdx];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0.5 : p + 0.5));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  const togglePlay = () => {
    playClick();
    setIsPlaying((p) => !p);
  };

  const selectVideo = (idx) => {
    playClick();
    setCurrentIdx(idx);
    setProgress(5);
    setIsPlaying(true);
    showToast('Loaded video: ' + videos[idx].title);
  };

  const seekToPercent = (pct, label) => {
    playClick();
    setProgress(pct);
    setIsPlaying(true);
    showToast('Jumped to ' + label);
  };

  const seekVideo = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    setProgress(Math.max(0, Math.min(100, (clickX / rect.width) * 100)));
    playClick();
  };

  const changeSpeed = (val) => {
    playClick();
    showToast('Playback speed: ' + val + 'x');
  };

  const copyLectureLink = () => {
    playClick();
    navigator.clipboard?.writeText(window.location.href);
    showToast('Lecture link copied to clipboard!');
  };

  const downloadActiveNote = () => {
    playClick();
    showToast('Downloading Complete PDF Summary...');
  };

  const campaignLabel = video.tag === 'JMM' ? 'JAVA MEMORY MODEL' : 'MULTITHREADING';

  return (
    <section id="videos" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-b border-[#23262B]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="text-xs font-mono text-[#3DDAD7] tracking-wider uppercase mb-1">// LECTURE THEATRE</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white flex items-center gap-3">
            <span>Watch</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#FF1A1A]/20 text-[#FF1A1A] border border-[#FF1A1A]/30">4K 60FPS</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#FF1A1A] to-[#3DDAD7] rounded mt-2"></div>
          <p className="text-[#8B9099] text-sm sm:text-base mt-2">Full interview-grade lecture playback with synchronized chapter markers and notes.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#8B9099]">ACTIVE CAMPAIGN:</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#14161A] text-[#3DDAD7] border border-[#23262B]">Java Memory Model</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="relative aspect-video bg-[#0E1013] border border-[#23262B] rounded-xl overflow-hidden shadow-2xl group flex flex-col justify-between">
            <div className="absolute inset-0 scanlines opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none"></div>

            <div className="relative z-10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                <span className="font-mono text-xs text-[#3DDAD7] bg-[#14161A]/80 px-2 py-0.5 rounded border border-[#23262B]">{video.tag}</span>
                <span className="font-display text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">{video.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-black/60 text-emerald-400 border border-emerald-500/30">1080p HD</span>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center p-6 cursor-pointer" onClick={togglePlay}>
              <div className="w-20 h-20 rounded-full bg-[#3DDAD7]/20 border-2 border-[#3DDAD7] flex items-center justify-center text-[#3DDAD7] transition transform group-hover:scale-110 shadow-[0_0_30px_rgba(61,218,215,0.4)]">
                <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24">
                  {isPlaying ? <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /> : <path d="M6 4l14 8-14 8V4z" />}
                </svg>
              </div>
              <div className="text-xs font-mono text-[#8B9099] mt-3 bg-black/70 px-3 py-1 rounded-full border border-[#23262B]">
                {isPlaying ? 'Now Playing // 60 FPS' : 'Click to Play / Pause Segment'}
              </div>
              <div className={`${isPlaying ? 'flex' : 'hidden'} items-end gap-1.5 h-5 mt-2`}>
                <span className="w-1 bg-[#3DDAD7] rounded-full eq-bar-1"></span>
                <span className="w-1 bg-[#FF1A1A] rounded-full eq-bar-2"></span>
                <span className="w-1 bg-[#3DDAD7] rounded-full eq-bar-3"></span>
                <span className="w-1 bg-[#FF1A1A] rounded-full eq-bar-1"></span>
                <span className="w-1 bg-[#3DDAD7] rounded-full eq-bar-2"></span>
              </div>
            </div>

            <div className="relative z-10 p-4 bg-gradient-to-t from-black/90 to-transparent space-y-2">
              <div className="relative w-full h-1.5 bg-gray-700/60 rounded cursor-pointer group/scrub" onClick={seekVideo}>
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FF1A1A] to-[#3DDAD7] rounded transition-all" style={{ width: `${progress}%` }}></div>
                <div className="absolute top-0 left-[0%] w-1.5 h-full bg-white rounded-full" title="Intro"></div>
                <div className="absolute top-0 left-[20%] w-1.5 h-full bg-[#3DDAD7] rounded-full" title="Stack Mechanics"></div>
                <div className="absolute top-0 left-[45%] w-1.5 h-full bg-[#3DDAD7] rounded-full" title="Escape Analysis"></div>
                <div className="absolute top-0 left-[70%] w-1.5 h-full bg-[#FF1A1A] rounded-full" title="Interview Traps"></div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-[#8B9099]">
                <div className="flex items-center gap-3">
                  <button onClick={togglePlay} className="text-white hover:text-[#3DDAD7] transition">
                    <span>{isPlaying ? '⏸ Pause' : '▶ Play'}</span>
                  </button>
                  <span className="text-[#E9EAEC]">{formatTime(progress)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span>Speed:</span>
                    <select onChange={(e) => changeSpeed(e.target.value)} defaultValue="1.25" className="bg-[#14161A] text-[#3DDAD7] border border-[#23262B] rounded px-1 py-0.5 text-xs">
                      <option value="1.0">1.0x</option>
                      <option value="1.25">1.25x</option>
                      <option value="1.5">1.5x</option>
                      <option value="2.0">2.0x</option>
                    </select>
                  </div>
                  <button onClick={() => showToast('Fullscreen toggled')} className="hover:text-white">⛶</button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#14161A] border border-[#23262B] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-bold text-white">{video.title}</h3>
                <div className="flex items-center gap-3 text-xs font-mono text-[#8B9099] mt-1">
                  <span className="text-[#3DDAD7]">CAMPAIGN: {campaignLabel}</span>
                  <span>•</span>
                  <span>{video.duration} MINS</span>
                  <span>•</span>
                  <span className="text-emerald-400">PUBLISHED</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={copyLectureLink} className="px-3 py-1.5 rounded bg-[#1B1E23] hover:bg-[#23262B] text-xs font-mono text-[#8B9099] hover:text-white border border-[#23262B] transition">
                  🔗 Share
                </button>
                <a href="#notes" className="px-3 py-1.5 rounded bg-[#3DDAD7]/10 hover:bg-[#3DDAD7]/20 text-xs font-mono text-[#3DDAD7] border border-[#3DDAD7]/30 transition">
                  📄 Download PDF Notes
                </a>
              </div>
            </div>

            <p className="text-[#8B9099] text-sm leading-relaxed">{video.desc}</p>

            <div>
              <div className="text-xs font-mono text-[#8B9099] uppercase tracking-wider mb-2">CHAPTER TIMESTAMP MARKERS:</div>
              <div className="flex flex-wrap gap-2">
                {chapterMarkers.map((c) => (
                  <button
                    key={c.label}
                    onClick={() => seekToPercent(c.pct, c.label)}
                    className={`px-2.5 py-1 rounded bg-[#0A0B0D] border border-[#23262B] text-xs font-mono transition ${c.label === 'Interview Traps' ? 'hover:border-[#FF1A1A] text-rose-300' : 'hover:border-[#3DDAD7] text-gray-300'}`}
                  >
                    {c.time} {c.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex rounded-lg bg-[#14161A] p-1 border border-[#23262B] text-xs font-mono">
            <button
              onClick={() => { playClick(); setTab('queue'); }}
              className={`flex-1 py-1.5 text-center rounded transition ${tab === 'queue' ? 'bg-[#1B1E23] text-[#3DDAD7] font-semibold' : 'text-[#8B9099] hover:text-white'}`}
            >
              Up Next (5)
            </button>
            <button
              onClick={() => { playClick(); setTab('notes'); }}
              className={`flex-1 py-1.5 text-center rounded transition ${tab === 'notes' ? 'bg-[#1B1E23] text-[#3DDAD7] font-semibold' : 'text-[#8B9099] hover:text-white'}`}
            >
              Lecture Cheat Sheet
            </button>
          </div>

          {tab === 'queue' ? (
            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {videos.map((v, i) => (
                <div
                  key={v.title}
                  onClick={() => selectVideo(i)}
                  className={`p-3 rounded-lg cursor-pointer transition transform hover:translate-x-1 flex gap-3 items-center group ${i === currentIdx ? 'bg-[#1B1E23] border border-[#3DDAD7]' : 'bg-[#14161A] border border-[#23262B] hover:border-gray-600'}`}
                >
                  <div className={`w-10 h-10 rounded flex items-center justify-center flex-shrink-0 ${i === currentIdx ? 'bg-black/60 border border-[#3DDAD7]/40 text-[#3DDAD7]' : 'bg-black/40 border border-[#23262B] text-[#8B9099]'}`}>
                    <span className="font-mono text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`text-sm font-semibold truncate ${i === currentIdx ? 'text-white group-hover:text-[#3DDAD7]' : 'text-gray-300 group-hover:text-white'}`}>{v.title}</div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#8B9099]">
                      <span className={v.tag === 'JMM' ? 'text-[#3DDAD7]' : 'text-[#FF1A1A]'}>{v.tag}</span>
                      <span>•</span>
                      <span>{v.duration}</span>
                      <span className={`ml-auto ${i === currentIdx ? 'text-emerald-400 text-[10px]' : 'text-xs text-gray-500'}`}>
                        {i === currentIdx ? 'NOW PLAYING' : 'Queue'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#14161A] border border-[#23262B] space-y-3 font-mono text-xs max-h-[600px] overflow-y-auto">
              <div className="text-[#3DDAD7] font-bold pb-2 border-b border-[#23262B]">KEY INTERVIEW TAKEAWAYS (JMM)</div>
              <div className="space-y-2 text-gray-300">
                <p><span className="text-[#FF1A1A]">1. Stack vs Heap:</span> Primitive locals live in the thread's stack frame (L1 cache friendly, O(1) allocation/deallocation). Objects live in Heap memory.</p>
                <p><span className="text-[#3DDAD7]">2. Escape Analysis:</span> If the JIT compiler detects an object doesn't escape the method, it performs <em>Scalar Replacement</em>: allocating primitives directly on the stack without GC overhead!</p>
                <p><span className="text-[#FF1A1A]">3. Compressed OOPs:</span> Under 32GB Heap, Java uses 32-bit pointers for 64-bit address spaces via 8-byte aligned shifts.</p>
              </div>
              <div className="pt-3 border-t border-[#23262B] text-center">
                <button onClick={downloadActiveNote} className="w-full py-2 bg-[#1B1E23] hover:bg-[#23262B] text-[#3DDAD7] rounded border border-[#23262B] transition">
                  Download Complete PDF Summary (5 Pages)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

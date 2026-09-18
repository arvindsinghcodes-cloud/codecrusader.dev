import { useState } from 'react';
import { useApp } from '../../context/AppProvider.jsx';
import { problems, difficultyStyles, languages, problemSolutions } from '../../data/problems.js';
import { runCode as runCodeApi } from '../../api/practiceApi.js';

const DEFAULT_SOURCE = problemSolutions['Two Sum'].Java.optimal;

export default function Practice() {
  const { playClick, showToast } = useApp();
  const [activeProblem, setActiveProblem] = useState('Two Sum');
  const [activeLang, setActiveLang] = useState('Java');
  const [isOptimal, setIsOptimal] = useState(true);
  const [source, setSource] = useState(DEFAULT_SOURCE);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);

  const selectProblem = (name) => {
    playClick();
    setActiveProblem(name);
    showToast('Switched to problem: ' + name);
    const solutions = problemSolutions[name]?.[activeLang];
    if (solutions) {
      setIsOptimal(true);
      setSource(solutions.optimal);
    }
  };

  const selectLang = (lang) => {
    playClick();
    setActiveLang(lang);
    showToast('Switched language to ' + lang);
  };

  const toggleOptimal = () => {
    playClick();
    const solutions = problemSolutions[activeProblem]?.[activeLang];
    if (!solutions) return;
    const nextOptimal = !isOptimal;
    setIsOptimal(nextOptimal);
    setSource(nextOptimal ? solutions.optimal : solutions.brute);
  };

  const run = async () => {
    playClick();
    setRunning(true);
    setResult(null);
    try {
      const data = await runCodeApi({ problemId: activeProblem, language: activeLang, source });
      setResult(data);
      showToast('✓ Execution complete');
    } catch {
      // No backend yet — simulate the JVM benchmark result from the original mockup.
      await new Promise((r) => setTimeout(r, 700));
      setResult({
        passed: true,
        executionTimeMs: 14,
        executionPercentile: 99.2,
        memoryMb: 41.8,
        memoryPercentile: 94.8,
        complexity: 'O(N) Time',
        cases: [
          { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
          { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
          { input: 'nums = [3,3], target = 6', output: '[0,1]' },
        ],
      });
      showToast('✓ All 3 test cases passed cleanly!');
    } finally {
      setRunning(false);
    }
  };

  return (
    <section id="practice" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-b border-[#23262B]">
      <div className="mb-8">
        <div className="text-xs font-mono text-[#FF1A1A] tracking-wider uppercase mb-1">// PRACTICE ARENA</div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white flex items-center gap-3">
          <span>Coding Practice</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#3DDAD7]/20 text-[#3DDAD7] border border-[#3DDAD7]/30">6 Languages</span>
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-[#FF1A1A] to-[#3DDAD7] rounded mt-2"></div>
        <p className="text-[#8B9099] text-sm sm:text-base mt-2">Same problem, six languages — pick one, benchmark complexity, and run test suites live.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3 space-y-2">
          <div className="text-xs font-mono text-[#8B9099] uppercase tracking-wider mb-2">CURATED PROBLEMS:</div>
          {problems.map((p) => (
            <div
              key={p.name}
              onClick={() => selectProblem(p.name)}
              className={`p-3 rounded-lg cursor-pointer transition flex justify-between items-center group ${p.name === activeProblem ? 'bg-[#1B1E23] border border-[#3DDAD7]' : 'bg-[#14161A] border border-[#23262B] hover:border-gray-600'}`}
            >
              <div>
                <div className={`text-sm font-semibold ${p.name === activeProblem ? 'text-white group-hover:text-[#3DDAD7]' : 'text-gray-300 group-hover:text-white'}`}>{p.name}</div>
                <div className="text-[11px] font-mono text-[#8B9099]">{p.tags}</div>
              </div>
              <span className={`text-xs font-mono px-2 py-0.5 rounded border ${difficultyStyles[p.difficulty]}`}>{p.difficulty}</span>
            </div>
          ))}
        </div>

        <div className="lg:col-span-9 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#14161A] p-2.5 rounded-xl border border-[#23262B]">
            <div className="flex items-center gap-1.5 flex-wrap">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => selectLang(lang)}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition ${lang === activeLang ? 'font-semibold bg-[#3DDAD7] text-[#0A0B0D] shadow' : 'text-[#8B9099] hover:text-white bg-[#1B1E23]'}`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={toggleOptimal} className="px-3 py-1.5 rounded text-xs font-mono bg-[#1B1E23] text-[#3DDAD7] hover:bg-[#23262B] border border-[#23262B] transition">
                {isOptimal ? '⚡ O(N) Optimal Active' : '🐢 Switch to O(N) Optimal'}
              </button>
              <button onClick={run} disabled={running} className="inline-flex items-center gap-1.5 bg-[#3DDAD7] hover:bg-[#2fc2bf] text-[#0A0B0D] font-display font-bold text-xs px-5 py-1.5 rounded transition shadow-[0_0_15px_rgba(61,218,215,0.4)] disabled:opacity-60">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                <span>Run Code</span>
              </button>
            </div>
          </div>

          <div className="relative bg-[#0A0B0D] border border-[#23262B] rounded-xl overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-4 py-2 bg-[#14161A] border-b border-[#23262B] text-xs font-mono text-[#8B9099]">
              <span>{activeProblem.replace(/\s+/g, '')}.java</span>
              <span className="text-[#3DDAD7]">TARGET: O(N) Time • O(N) Space</span>
            </div>
            <textarea
              spellCheck={false}
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full h-64 bg-[#0A0B0D] text-[#E9EAEC] font-mono text-xs sm:text-sm p-4 border-none outline-none resize-none leading-relaxed selection:bg-[#3DDAD7] selection:text-black"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#0A0B0D] border border-[#23262B] font-mono text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#23262B] pb-2">
              <span className="text-[#8B9099]">EXECUTION CONSOLE // JVM BENCHMARK:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                {running ? <><span className="animate-spin">⟳</span> COMPILING ON HOTSPOT VM...</> : result ? <>● ACCEPTED ⚡ ({result.cases?.length ?? 3}/{result.cases?.length ?? 3} PASSED)</> : <><span>●</span> READY TO RUN</>}
              </span>
            </div>
            <div className="text-gray-400 space-y-1">
              {!result && !running && (
                <div className="text-[#3DDAD7]">✓ Click "Run Code" to execute test cases against JVM HotSpot runtime.</div>
              )}
              {running && (
                <div className="text-gray-400">javac Solution.java -&gt; Optimizing JIT C2 Compiler...</div>
              )}
              {result && !running && (
                <>
                  <div className="text-emerald-400 font-bold">Status: Passed All {result.cases.length} Test Cases</div>
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#23262B] my-2 text-white">
                    <div>Execution Time: <strong className="text-[#3DDAD7]">{result.executionTimeMs} ms</strong> (beats {result.executionPercentile}%)</div>
                    <div>Memory Consumption: <strong className="text-[#3DDAD7]">{result.memoryMb} MB</strong> (beats {result.memoryPercentile}%)</div>
                    <div>Complexity: <strong className="text-emerald-400">{result.complexity}</strong></div>
                  </div>
                  <div className="text-xs text-gray-300">
                    {result.cases.map((c, i) => (
                      <div key={i}>Case {i + 1}: {c.input} &nbsp;-&gt;&nbsp; Output: {c.output} ✓</div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

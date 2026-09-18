import { useState } from 'react';
import { useApp } from '../../context/AppProvider.jsx';
import { ideFileTree, ideFiles } from '../../data/ideFiles.js';
import { sendIdeChatMessage } from '../../api/ideApi.js';

const INITIAL_MESSAGES = [
  {
    role: 'ai',
    text: (
      <>I've analyzed <code className="text-white">Main.java</code>. The current nested loop runs in <span className="text-[#FF1A1A]">O(n²)</span>. In an interview, the panel will ask you to swap this for a <code className="text-white">HashMap</code> to hit <span className="text-[#3DDAD7]">O(n)</span> single-pass.</>
    ),
  },
];

const QUICK_PROMPTS = [
  { text: 'Explain O(N) Hash-Map trade-off', label: '⚡ Explain O(N) trade-off', color: 'text-[#3DDAD7]' },
  { text: 'Show JVM Bytecode translation', label: '🔍 Show Bytecode', color: 'text-purple-300' },
  { text: 'What edge cases will interviewers test?', label: '💣 Interview Edge Cases', color: 'text-rose-300' },
];

function simulateReply(text) {
  const lower = text.toLowerCase();
  if (lower.includes('bytecode')) {
    return "javap -c output: Notice opcode invokevirtual vs invokespecial. The loops generate if_icmpge jumps. Replacing with HashMap replaces jumps with O(1) table lookups.";
  }
  if (lower.includes('edge')) {
    return 'Key interview traps for Two Sum: 1) Negative integers in array, 2) Repeated elements summing to target, 3) Integer overflow when target is near Integer.MAX_VALUE.';
  }
  return 'Looking at Main.java — the nested loops make this O(n²). Swap the inner loop for a HashMap<Integer, Integer> to get O(n) in one pass.';
}

export default function AiIde() {
  const { playClick } = useApp();
  const [activeFile, setActiveFile] = useState('Main.java');
  const [source, setSource] = useState(ideFiles['Main.java']);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');

  const switchFile = (name) => {
    playClick();
    setActiveFile(name);
    setSource(ideFiles[name] || '');
  };

  const send = async (rawText) => {
    const text = (rawText ?? input).trim();
    if (!text) return;
    playClick();
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');

    try {
      const { reply } = await sendIdeChatMessage({ activeFile, source, message: text });
      setMessages((m) => [...m, { role: 'ai', text: reply }]);
    } catch {
      // No AI backend wired up yet — fall back to the canned mockup responses.
      await new Promise((r) => setTimeout(r, 500));
      setMessages((m) => [...m, { role: 'ai', text: simulateReply(text) }]);
    }
  };

  return (
    <section id="ide" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-b border-[#23262B]">
      <div className="mb-8">
        <div className="text-xs font-mono text-[#3DDAD7] tracking-wider uppercase mb-1">// CRUSADER WORKSPACE</div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white flex items-center gap-3">
          <span>AI IDE & Code Review Assistant</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-500/20 text-[#FF1A1A] border border-red-500/30">AGENT ACTIVE</span>
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-[#3DDAD7] to-[#FF1A1A] rounded mt-2"></div>
        <p className="text-[#8B9099] text-sm sm:text-base mt-2">One workspace for course projects: active files, compiler inspections, and an AI mentor loaded with JVM internals context.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#14161A] border border-[#23262B] rounded-2xl overflow-hidden shadow-2xl min-h-[500px]">
        <div className="lg:col-span-2 bg-[#101215] p-3 border-r border-[#23262B] space-y-3">
          <div className="text-[11px] font-mono text-[#8B9099] uppercase tracking-wider px-2">PROJECT FILES</div>
          <div className="space-y-1 font-mono text-xs">
            {ideFileTree.map((f) => (
              <div
                key={f.key}
                onClick={() => switchFile(f.key)}
                className={`px-2.5 py-1.5 rounded cursor-pointer flex items-center gap-2 ${f.key === activeFile ? 'bg-[#1B1E23] text-[#3DDAD7]' : 'text-gray-400 hover:text-white hover:bg-[#1B1E23]'}`}
              >
                <span>{f.icon}</span> <span>{f.key}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col bg-[#0A0B0D] border-r border-[#23262B]">
          <div className="flex items-center justify-between px-4 py-2 bg-[#14161A] border-b border-[#23262B] font-mono text-xs text-[#8B9099]">
            <span>{activeFile}</span>
            <span className="text-xs text-emerald-400">● Synced</span>
          </div>
          <textarea
            spellCheck={false}
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="flex-1 w-full p-4 bg-transparent text-[#E9EAEC] font-mono text-xs sm:text-sm border-none outline-none resize-none leading-relaxed"
          />
        </div>

        <div className="lg:col-span-4 flex flex-col bg-[#14161A] justify-between">
          <div className="p-3 bg-[#1B1E23] border-b border-[#23262B] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3DDAD7] animate-pulse"></span>
              <span className="font-display font-bold text-xs text-white uppercase tracking-wider">Crusader AI Copilot</span>
            </div>
            <span className="text-[10px] font-mono text-[#3DDAD7] bg-[#3DDAD7]/10 px-1.5 py-0.5 rounded">GPT-4o + JVM Docs</span>
          </div>

          <div className="p-3 space-y-3 overflow-y-auto max-h-80 text-xs font-mono flex-1">
            {messages.map((m, i) => (
              m.role === 'ai' ? (
                <div key={i} className="p-3 rounded-lg bg-[#1B1E23] text-gray-300 border border-[#23262B]">
                  <span className="text-[#3DDAD7] font-bold">CRUSADER AI:</span> {m.text}
                </div>
              ) : (
                <div key={i} className="p-2.5 rounded-lg bg-[#0A0B0D] text-white border border-[#23262B] text-right">
                  <span className="text-gray-400">YOU:</span> {m.text}
                </div>
              )
            ))}
          </div>

          <div className="px-3 pt-2 flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.map((q) => (
              <button
                key={q.text}
                onClick={() => send(q.text)}
                className={`text-[10px] font-mono px-2 py-1 rounded bg-[#101215] hover:bg-[#1B1E23] border border-[#23262B] transition ${q.color}`}
              >
                {q.label}
              </button>
            ))}
          </div>

          <div className="p-3 border-t border-[#23262B] flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
              placeholder="Ask about approach, complexity, JIT..."
              className="flex-1 bg-[#0A0B0D] border border-[#23262B] rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#3DDAD7]"
            />
            <button onClick={() => send()} className="bg-[#3DDAD7] hover:bg-[#2ec5c2] text-[#0A0B0D] font-bold px-3 py-2 rounded text-xs transition">
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

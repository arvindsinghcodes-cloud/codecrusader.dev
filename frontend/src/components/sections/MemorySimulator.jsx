import { useMemo, useState } from 'react';
import { useApp } from '../../context/AppProvider.jsx';

const FIELD_TYPES = [
  { type: 'boolean', size: 1, label: '+ boolean (1B)', style: 'text-emerald-400 border-emerald-500/30' },
  { type: 'byte', size: 1, label: '+ byte (1B)', style: 'text-teal-400 border-teal-500/30' },
  { type: 'int', size: 4, label: '+ int (4B)', style: 'text-[#3DDAD7] border-[#3DDAD7]/30' },
  { type: 'long', size: 8, label: '+ long (8B)', style: 'text-purple-400 border-purple-500/30' },
  { type: 'Object ref', size: 4, label: '+ Ref (4B)', style: 'text-rose-400 border-rose-500/30' },
];

const COLOR_BY_SIZE = {
  8: 'bg-purple-500/20 border-purple-500 text-purple-300',
  4: 'bg-cyan-500/20 border-[#3DDAD7] text-cyan-300',
  1: 'bg-emerald-500/20 border-emerald-500 text-emerald-300',
};

const INITIAL_FIELDS = [
  { name: 'id', type: 'int', size: 4, color: 'bg-cyan-500/20 border-cyan-500 text-cyan-300' },
  { name: 'timestamp', type: 'long', size: 8, color: 'bg-purple-500/20 border-purple-500 text-purple-300' },
  { name: 'isActive', type: 'boolean', size: 1, color: 'bg-emerald-500/20 border-emerald-500 text-emerald-300' },
];

export default function MemorySimulator() {
  const { playClick } = useApp();
  const [compressedOops, setCompressedOops] = useState(true);
  const [fields, setFields] = useState(INITIAL_FIELDS);

  const addField = (type, size) => {
    playClick();
    const name = type.substring(0, 3) + '_' + (fields.length + 1);
    const color = COLOR_BY_SIZE[size] || 'bg-gray-500/20 border-gray-500 text-gray-300';
    setFields((f) => [...f, { name, type, size, color }]);
  };

  const removeField = (i) => {
    playClick();
    setFields((f) => f.filter((_, idx) => idx !== i));
  };

  const resetFields = () => {
    playClick();
    setFields([]);
  };

  const layout = useMemo(() => {
    const markWordSize = 8;
    const klassWordSize = compressedOops ? 4 : 8;
    const fieldsSize = fields.reduce((acc, f) => acc + f.size, 0);
    const rawTotal = markWordSize + klassWordSize + fieldsSize;
    const padding = (8 - (rawTotal % 8)) % 8;
    const totalBytes = rawTotal + padding;
    return { markWordSize, klassWordSize, fieldsSize, rawTotal, padding, totalBytes };
  }, [compressedOops, fields]);

  return (
    <section id="memory-sim" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-b border-[#23262B]">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#3DDAD7]/10 text-[#3DDAD7] border border-[#3DDAD7]/30 text-xs font-mono uppercase mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3DDAD7] animate-pulse"></span>
          <span>EXCLUSIVE INTERACTIVE LAB</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white flex items-center gap-3">
          JVM Object Layout & Memory Alignment Simulator
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-[#3DDAD7] to-[#FF1A1A] rounded mt-2"></div>
        <p className="text-[#8B9099] text-sm sm:text-base mt-2">
          Interviewers love asking: <em className="text-gray-300">"How many bytes does this Java object consume in memory?"</em> Build a class below and see the 8-byte boundary alignment and Mark Word padding calculate live.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#14161A] border border-[#23262B] rounded-2xl p-6 lg:p-8">
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-2">1. JVM Configuration</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-[#0A0B0D] border border-[#23262B]">
                <div className="text-[11px] font-mono text-[#8B9099]">JVM ARCHITECTURE</div>
                <div className="font-mono text-sm font-semibold text-white mt-0.5">64-bit HotSpot</div>
              </div>
              <div className="p-3 rounded-lg bg-[#0A0B0D] border border-[#23262B]">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-mono text-[#8B9099]">COMPRESSED OOPS</span>
                  <input
                    type="checkbox"
                    checked={compressedOops}
                    onChange={() => { playClick(); setCompressedOops((v) => !v); }}
                    className="accent-[#3DDAD7]"
                  />
                </div>
                <div className="font-mono text-xs text-[#3DDAD7] mt-0.5">-XX:+UseCompressedOops</div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-display text-lg font-bold text-white">2. Class Field Definition</h3>
              <button onClick={resetFields} className="text-xs font-mono text-[#FF1A1A] hover:underline">Reset</button>
            </div>
            <div className="text-xs font-mono text-[#8B9099] mb-3">Add instance fields to simulate memory layout:</div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {FIELD_TYPES.map((f) => (
                <button
                  key={f.type}
                  onClick={() => addField(f.type, f.size)}
                  className={`px-2.5 py-2 rounded bg-[#1B1E23] hover:bg-[#23262B] text-xs font-mono border transition text-center ${f.style}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0B0D] border border-[#23262B] space-y-2">
            <div className="text-xs font-mono text-[#8B9099] flex justify-between">
              <span>CURRENT FIELDS:</span>
              <span>{fields.length} fields</span>
            </div>
            <div className="space-y-1 max-h-36 overflow-y-auto text-xs font-mono">
              {fields.map((f, i) => (
                <div key={f.name + i} className="flex justify-between items-center bg-[#14161A] p-1.5 px-2 rounded border border-[#23262B]">
                  <span>{f.type} <strong className="text-white">{f.name}</strong> ({f.size}B)</span>
                  <button onClick={() => removeField(i)} className="text-red-400 hover:text-red-200">×</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-display text-lg font-bold text-white">3. Object Memory Footprint Breakdown</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#8B9099]">TOTAL HEAP SIZE:</span>
                <span className="font-mono text-lg font-bold text-[#3DDAD7] bg-[#0A0B0D] px-2.5 py-0.5 rounded border border-[#3DDAD7]/40">{layout.totalBytes} Bytes</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0A0B0D] border border-[#23262B] space-y-4">
              <div className="text-xs font-mono text-[#8B9099]">BYTE OFFSET MAP (8-BYTE BOUNDARY ALIGNED):</div>

              <div className="flex flex-wrap gap-1.5 p-2 rounded bg-[#14161A] border border-[#23262B] min-h-[60px] items-center">
                <div className="flex-1 min-w-[70px] p-2 bg-blue-500/20 border border-blue-500 rounded text-center">
                  <div className="font-bold text-blue-300">Mark Word</div>
                  <div className="text-[10px] text-gray-400">8 Bytes</div>
                </div>
                <div className="flex-1 min-w-[65px] p-2 bg-cyan-500/20 border border-[#3DDAD7] rounded text-center">
                  <div className="font-bold text-[#3DDAD7]">Klass Word</div>
                  <div className="text-[10px] text-gray-400">{layout.klassWordSize} Bytes</div>
                </div>
                {fields.map((f, i) => (
                  <div key={f.name + i} className={`flex-1 min-w-[55px] p-2 ${f.color} border rounded text-center`}>
                    <div className="font-bold truncate">{f.name}</div>
                    <div className="text-[10px] text-gray-400">{f.size}B ({f.type})</div>
                  </div>
                ))}
                {layout.padding > 0 && (
                  <div className="flex-1 min-w-[60px] p-2 bg-red-500/20 border border-[#FF1A1A] rounded text-center">
                    <div className="font-bold text-[#FF1A1A]">Padding</div>
                    <div className="text-[10px] text-red-300">{layout.padding} Bytes</div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-[#8B9099] pt-2 border-t border-[#23262B]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-blue-500/40 border border-blue-500"></span>
                  <span>Mark Word (8B)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-cyan-500/40 border border-[#3DDAD7]"></span>
                  <span>Klass Word</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-500/40 border border-emerald-500"></span>
                  <span>Instance Data</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-red-500/40 border border-[#FF1A1A]"></span>
                  <span>Alignment Padding</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-[#1B1E23] to-[#14161A] border border-[#23262B] space-y-2">
            <div className="text-xs font-mono text-[#3DDAD7] font-bold flex items-center gap-2">
              <span>⚡ JVM OPTIMIZATION INSIGHT:</span>
            </div>
            <p className="text-xs font-mono text-gray-300 leading-relaxed">
              Mark Word (8B) + Klass Word ({layout.klassWordSize}B {compressedOops ? 'compressed' : 'uncompressed'}) + Fields ({layout.fieldsSize}B) = {layout.rawTotal}B.{' '}
              {layout.padding > 0 ? (
                <strong className="text-[#FF1A1A]">{layout.padding} bytes of Alignment Padding</strong>
              ) : (
                <strong className="text-[#3DDAD7]">0 bytes wasted</strong>
              )}
              {layout.padding > 0 ? ' added to hit 8-byte boundary.' : '! Perfectly aligned to 8-byte boundary.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

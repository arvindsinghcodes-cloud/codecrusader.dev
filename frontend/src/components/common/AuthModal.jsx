import { useState } from 'react';
import { useApp } from '../../context/AppProvider.jsx';

export default function AuthModal() {
  const { authOpen, setAuthOpen, login } = useApp();
  const [email, setEmail] = useState('student@codecrusader.dev');
  const [password, setPassword] = useState('supersecret');

  if (!authOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#14161A] border border-[#23262B] w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="font-display font-bold text-lg text-white">Sign In to Code Crusader</div>
          <button onClick={() => setAuthOpen(false)} className="text-gray-400 hover:text-white font-mono">✕</button>
        </div>
        <p className="text-xs text-[#8B9099]">Access saved lecture bookmarks, progress tracking, and personalized interview simulators.</p>
        <div className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full bg-[#0A0B0D] border border-[#23262B] rounded px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#3DDAD7]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-[#0A0B0D] border border-[#23262B] rounded px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#3DDAD7]"
          />
          <button
            onClick={() => login(email, password)}
            className="w-full py-2.5 bg-[#FF1A1A] hover:bg-[#ff3333] text-[#0A0B0D] font-display font-bold rounded text-sm transition"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

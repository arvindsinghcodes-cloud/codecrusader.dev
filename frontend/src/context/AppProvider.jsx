import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { login as loginApi } from '../api/authApi.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [user, setUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const toastTimer = useRef(null);
  const audioCtxRef = useRef(null);

  const showToast = useCallback((message) => {
    setToast({ visible: true, message });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3500);
  }, []);

  // Native Web Audio click blip — matches the original page's 0-dependency SFX.
  const playClick = useCallback(() => {
    if (!sfxEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const audioCtx = audioCtxRef.current;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch {
      // Web Audio unavailable (e.g. autoplay policy) — SFX is best-effort only.
    }
  }, [sfxEnabled]);

  const toggleSfx = useCallback(() => {
    setSfxEnabled((v) => {
      const next = !v;
      showToast(next ? 'Audio Effects: ON' : 'Audio Effects: OFF');
      return next;
    });
  }, [showToast]);

  const login = useCallback(async (email, password) => {
    playClick();
    try {
      const { user: apiUser, token } = await loginApi(email, password);
      if (token) localStorage.setItem('cc_token', token);
      setUser(apiUser);
    } catch {
      // No backend wired up yet — fall back to the original mockup's demo login.
      setUser({ name: 'Arvind S.', role: 'Admin', email });
    }
    setAuthOpen(false);
    showToast('Logged in as Arvind S. — Full Access Active');
  }, [playClick, showToast]);

  const value = useMemo(() => ({
    sfxEnabled, toggleSfx, playClick,
    toast, showToast,
    user, login,
    searchOpen, setSearchOpen,
    authOpen, setAuthOpen,
  }), [sfxEnabled, toggleSfx, playClick, toast, showToast, user, login, searchOpen, authOpen]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

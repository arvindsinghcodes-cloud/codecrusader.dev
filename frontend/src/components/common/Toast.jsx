import { useApp } from '../../context/AppProvider.jsx';

export default function Toast() {
  const { toast } = useApp();

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 bg-[#14161A] border border-[#3DDAD7] text-white px-4 py-3 rounded-lg shadow-2xl font-mono text-xs flex items-center gap-2 transform transition duration-300 ${toast.visible ? '' : 'hidden'}`}
    >
      <span className="text-[#3DDAD7]">⚡</span>
      <span>{toast.message}</span>
    </div>
  );
}

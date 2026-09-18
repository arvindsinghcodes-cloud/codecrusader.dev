export default function Footer() {
  return (
    <footer className="bg-[#14161A] border-t border-[#23262B] py-12 px-4 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <img src="/assets/images/logo.webp" alt="Code Crusader Logo" className="w-8 h-8 object-contain" />
          <div>
            <span className="font-display font-bold text-sm tracking-wider text-white">CODE CRUSADER</span>
            <p className="text-[11px] font-mono text-[#8B9099]">Interview-grade Java. One campaign at a time.</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-[#8B9099]">
          <a href="https://www.youtube.com/@codecrusader-dev" target="_blank" rel="noreferrer" className="hover:text-[#3DDAD7]">YouTube</a>
          <a href="#" className="hover:text-[#3DDAD7]">WhatsApp Channel</a>
          <a href="#" className="hover:text-[#3DDAD7]">Instagram</a>
          <a href="#" className="hover:text-[#3DDAD7]">Telegram Community</a>
        </div>

        <div className="text-xs font-mono text-[#8B9099]">
          © 2026 codecrusader.dev • Built by Arvind Kumar Singh
        </div>
      </div>
    </footer>
  );
}

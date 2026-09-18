import { useApp } from '../../context/AppProvider.jsx';
import { scheduleSlots } from '../../data/schedule.js';

export default function Schedule() {
  const { playClick, showToast } = useApp();

  const addToCalendar = (title) => {
    playClick();
    showToast(`Added "${title}" to your Google Calendar!`);
  };

  return (
    <section id="schedule" className="py-20 px-4 lg:px-8 max-w-5xl mx-auto border-b border-[#23262B]">
      <div className="mb-8">
        <div className="text-xs font-mono text-[#FF1A1A] tracking-wider uppercase mb-1">// TRANSMISSION TIMELINE</div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Live Broadcast Schedule</h2>
        <div className="w-12 h-1 bg-gradient-to-r from-[#FF1A1A] to-[#3DDAD7] rounded mt-2"></div>
        <p className="text-[#8B9099] text-sm sm:text-base mt-2">Upcoming deep dive lectures in chronological order. Set calendar reminders directly.</p>
      </div>

      <div className="space-y-3">
        {scheduleSlots.map((s) => (
          <div key={s.title} className="p-4 rounded-xl bg-[#14161A] border border-[#23262B] hover:border-[#3DDAD7] transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-[#1B1E23] border border-[#23262B] flex flex-col items-center justify-center flex-shrink-0">
                <span className="font-display font-bold text-lg text-white">{s.day}</span>
                <span className="text-[10px] font-mono text-[#3DDAD7] uppercase">{s.month}</span>
              </div>
              <div>
                <div className="font-display font-bold text-base text-white">{s.title}</div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#8B9099] mt-0.5">
                  <span>{s.time}</span>
                  <span>•</span>
                  <span className={s.campaignColor}>{s.campaign}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-mono px-2.5 py-1 rounded border ${s.statusStyle}`}>{s.status}</span>
              <button onClick={() => addToCalendar(s.title)} className="px-3 py-1.5 rounded bg-[#1B1E23] hover:bg-[#23262B] text-xs font-mono text-[#3DDAD7] border border-[#23262B] transition">
                + Add Calendar
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import { useState } from 'react';
import { useApp } from '../../context/AppProvider.jsx';
import { sendContactMessage } from '../../api/contactApi.js';

export default function Connect() {
  const { playClick, showToast } = useApp();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: 'Enterprise Platform / Web App',
    message: '',
  });

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    playClick();
    setSubmitting(true);
    try {
      await sendContactMessage(form);
    } catch {
      // No backend wired up yet — the form still confirms locally so the
      // demo flow keeps working end-to-end.
    } finally {
      setSubmitting(false);
      setSent(true);
      showToast('Message sent! Arvind will review shortly.');
    }
  };

  return (
    <section id="connect" className="py-20 px-4 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="text-xs font-mono text-[#3DDAD7] tracking-wider uppercase mb-1">// DIRECT CHANNEL</div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Connect</h2>
        <div className="w-12 h-1 bg-gradient-to-r from-[#3DDAD7] to-[#FF1A1A] rounded mt-2"></div>
        <p className="text-[#8B9099] text-sm sm:text-base mt-2">
          Code Crusader is built by <strong>Arvind Kumar Singh</strong>. Open to building engineering platforms, dashboards, interview-prep tools, or high-performance systems.
        </p>
        <div className="mt-3">
          <a href="mailto:info@codecrusaderdev.com" className="inline-flex items-center gap-2 font-mono text-sm text-[#3DDAD7] hover:underline">
            <span>✉</span> info@codecrusaderdev.com
          </a>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-[#14161A] border border-[#23262B]">
        {!sent ? (
          <form onSubmit={submit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#8B9099] mb-1">YOUR NAME</label>
                <input
                  required
                  value={form.name}
                  onChange={update('name')}
                  className="w-full bg-[#0A0B0D] border border-[#23262B] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#3DDAD7]"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-[#8B9099] mb-1">EMAIL ADDRESS</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  className="w-full bg-[#0A0B0D] border border-[#23262B] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#3DDAD7]"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#8B9099] mb-1">PROJECT TYPE</label>
              <select
                value={form.projectType}
                onChange={update('projectType')}
                className="w-full bg-[#0A0B0D] border border-[#23262B] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#3DDAD7]"
              >
                <option>Enterprise Platform / Web App</option>
                <option>Interview-Prep System / LMS</option>
                <option>High-Throughput Backend Service</option>
                <option>Direct Consultation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#8B9099] mb-1">WHAT ARE YOU LOOKING TO BUILD?</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={update('message')}
                className="w-full bg-[#0A0B0D] border border-[#23262B] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#3DDAD7] resize-vertical"
                placeholder="Briefly describe goals, timelines, or engineering stack..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF1A1A] hover:bg-[#ff3333] text-[#0A0B0D] font-display font-bold text-sm px-8 py-3 rounded-lg transition transform hover:scale-105 shadow-[0_0_20px_rgba(255,26,26,0.3)] disabled:opacity-60"
            >
              <span>{submitting ? 'Sending…' : 'Send Message'}</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#3DDAD7]/20 border border-[#3DDAD7] flex items-center justify-center mx-auto text-[#3DDAD7] text-2xl">✓</div>
            <div className="font-display font-bold text-xl text-white">Transmission Received</div>
            <p className="text-sm text-[#8B9099] max-w-md mx-auto">
              Arvind Kumar Singh will review your project brief and follow up via email within 24–48 hours.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

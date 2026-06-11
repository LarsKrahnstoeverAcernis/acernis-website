"use client";
import { useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

function Eyebrow({ children, color = "#07644D" }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-4" style={{ color }}>
      <span className="w-4 h-px inline-block" style={{ backgroundColor: color }} />
      {children}
    </p>
  );
}

export default function ContactPage() {
  const { t } = useLanguage();
  const c = t.contact;
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) { setSent(true); setFormData({ name: "", company: "", email: "", message: "" }); }
    } finally {
      setSending(false);
    }
  }


  return (
    <main className="pt-32">
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden" style={{ borderBottom: "1px solid #E5E7EB" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(7,100,77,0.06) 0%, transparent 60%)" }} />
        <div className="relative max-w-2xl mx-auto text-center">
          <Eyebrow>{c.hero.eyebrow}</Eyebrow>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: "#0A0A0A" }}>{c.hero.title}</h1>
          <p className="text-lg" style={{ color: "#4B5563" }}>{c.hero.subtitle}</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Send Message form */}
          <div className="rounded-2xl p-8 flex flex-col" style={{ backgroundColor: "#0D130D", border: "1px solid #1C2C1C" }}>
            <h2 className="text-xl font-semibold mb-8" style={{ color: "#F0FDF4" }}>{c.form.title}</h2>
            {sent ? (
              <div className="text-center py-12 flex-1 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#0A3020" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10L8 14L16 6" stroke="#07644D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="font-semibold mb-2" style={{ color: "#F0FDF4" }}>{c.sentTitle}</p>
                <p className="text-sm" style={{ color: "#B0BBBF" }}>{c.sentBody}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
                {[
                  { key: "name" as const, label: c.form.name, type: "text", placeholder: c.form.namePlaceholder },
                  { key: "company" as const, label: c.form.company, type: "text", placeholder: c.form.companyPlaceholder },
                  { key: "email" as const, label: c.form.email, type: "email", placeholder: c.form.emailPlaceholder },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-medium mb-2" style={{ color: "#B0BBBF" }}>{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.key !== "company"}
                      value={formData[field.key]}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                      style={{ backgroundColor: "#131F13", border: "1px solid #1C2C1C", color: "#F0FDF4" }}
                      onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "#07644D"; }}
                      onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "#1C2C1C"; }}
                    />
                  </div>
                ))}
                <div className="flex-1 flex flex-col">
                  <label className="block text-xs font-medium mb-2" style={{ color: "#B0BBBF" }}>{c.form.message}</label>
                  <textarea
                    placeholder={c.form.messagePlaceholder}
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all resize-none flex-1"
                    style={{ backgroundColor: "#131F13", border: "1px solid #1C2C1C", color: "#F0FDF4" }}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "#07644D"; }}
                    onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "#1C2C1C"; }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 text-sm font-semibold rounded-lg transition-all mt-auto"
                  style={{ backgroundColor: "#07644D", color: "#F0FDF4", opacity: sending ? 0.7 : 1 }}
                  onMouseEnter={(e) => { if (!sending) (e.currentTarget as HTMLElement).style.backgroundColor = "#055035"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#07644D"; }}
                >
                  {sending ? "Sending…" : c.form.send}
                </button>
              </form>
            )}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">

            {/* Sign up to Test the App */}
            <div className="rounded-2xl p-8 flex flex-col" style={{ backgroundColor: "#0D130D", border: "1px solid rgba(7,100,77,0.25)" }}>
              <Eyebrow color="#F0FDF4">{c.tryPlatformEyebrow}</Eyebrow>
              <h2 className="text-xl font-semibold mb-3" style={{ color: "#F0FDF4" }}>{c.tryPlatformTitle}</h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "#B0BBBF" }}>
                {c.tryPlatformBody}
              </p>
              <a
                href="https://app.acernis.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 text-sm font-semibold rounded-lg transition-all text-center flex items-center justify-center gap-2 mt-auto"
                style={{ backgroundColor: "#07644D", color: "#F0FDF4" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#055035"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#07644D"; }}
              >
                Open app.acernis.fr <ExternalLink size={14} />
              </a>
            </div>


            {/* Founder card */}
            <div className="rounded-xl p-6 flex flex-col gap-4" style={{ backgroundColor: "#0D130D", border: "1px solid #1C2C1C" }}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: "#0A3020", color: "#07644D" }}>
                  CR
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#F0FDF4" }}>Charles Ricke</p>
                  <p className="text-xs" style={{ color: "#8A9EA0" }}>Founder &amp; CEO</p>
                </div>
              </div>
              <a
                href="#"
                className="w-full py-2.5 text-sm font-medium rounded-lg transition-all text-center flex items-center justify-center gap-2"
                style={{ backgroundColor: "#131F13", border: "1px solid rgba(7,100,77,0.3)", color: "#0FA876" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#0A3020"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#131F13"; }}
              >
                Directly book a meeting
              </a>
            </div>

            {/* Address */}
            <div className="rounded-xl p-6 flex-1" style={{ backgroundColor: "#0D130D", border: "1px solid #1C2C1C" }}>
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={14} style={{ color: "#F0FDF4", flexShrink: 0 }} />
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#F0FDF4" }}>{c.officeLbl}</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#B0BBBF" }}>
                40 Rue la Tour d&apos;Auvergne<br />
                44200 Nantes, France
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

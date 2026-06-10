"use client";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#07644D" }}>
      <span className="w-4 h-px inline-block" style={{ backgroundColor: "#07644D" }} />
      {children}
    </p>
  );
}

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <main className="pt-32">
      {/* Hero */}
      <section className="relative py-28 px-6 overflow-hidden" style={{ borderBottom: "1px solid #E5E7EB" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(7,100,77,0.06) 0%, transparent 60%)" }} />
        <div className="relative max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Eyebrow>{a.hero.eyebrow}</Eyebrow>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: "#0A0A0A" }}>{a.hero.title}</h1>
          </div>
          <div className="flex flex-col gap-5">
            {a.hero.paragraphs.map((p: string, i: number) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: "#4B5563" }}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6" style={{ borderBottom: "1px solid #E5E7EB" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Eyebrow>{a.team.eyebrow}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#0A0A0A" }}>{a.team.title}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {a.team.members.map((member: { name: string; role: string }, i: number) => (
              <div key={i} className="rounded-xl p-6 text-center" style={{ backgroundColor: "#0D0D0D", border: "1px solid #1F2937" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mb-4 mx-auto" style={{ backgroundColor: "#0A3020", color: "#0FA876" }}>
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="text-sm font-semibold mb-1" style={{ color: "#F0FDF4" }}>{member.name}</h3>
                <p className="text-xs" style={{ color: "#9CA3AF" }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA – dark */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: "#0D0D0D" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(7,100,77,0.07) 0%, transparent 70%)" }} />
        <div className="relative max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "#F0FDF4" }}>{t.home.cta.title}</h2>
          <Link
            href="/contact"
            className="btn-press inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all"
            style={{ backgroundColor: "#07644D", color: "#F0FDF4" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#055035"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#07644D"; }}
          >
            {t.home.cta.cta1} <MoveRight size={12} />
          </Link>
        </div>
      </section>
    </main>
  );
}

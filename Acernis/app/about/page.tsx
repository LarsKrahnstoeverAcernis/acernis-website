"use client";
import Link from "next/link";
import Image from "next/image";
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
            {a.team.members.map((member: { name: string; role: string; photo?: string; linkedin?: string }, i: number) => (
              <div key={i} className="rounded-xl p-6 text-center" style={{ backgroundColor: "#0D0D0D", border: "1px solid #1F2937" }}>
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden" style={{ border: "1px solid #1F2937" }}>
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        width={64}
                        height={64}
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", filter: "grayscale(100%)" }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: "#0A3020", color: "#0FA876" }}>
                        {member.name.split(" ").map((n: string) => n[0]).join("")}
                      </div>
                    )}
                  </div>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded flex items-center justify-center transition-opacity hover:opacity-80"
                      style={{ backgroundColor: "#0A66C2" }}
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
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

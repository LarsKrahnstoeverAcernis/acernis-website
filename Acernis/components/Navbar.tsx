"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowRight, MoveRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const ANNOUNCEMENT = {
  badge: "New",
  text: "AI-Driven Autonomous Networks – co-published with BearingPoint",
  href: "/case-study",
  cta: "Read the whitepaper",
};

export default function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(false);

  const links = [
    { href: "/about", label: t.nav.about },
    { href: "/", label: t.nav.platform },
    { href: "/case-study", label: t.nav.caseStudy },
    { href: "/contact", label: t.nav.contact },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* Announcement bar – slightly lighter dark so it visually separates from nav */}
      {announcementVisible && (
        <div
          className="relative flex items-center justify-center px-10"
          style={{ backgroundColor: "#1C1C1E", height: 36, borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline" style={{ color: "#8A8A8E", fontSize: 12 }}>News</span>
            <span className="hidden sm:inline" style={{ color: "#3A3A3E", fontSize: 12 }}>|</span>
            <span className="hidden sm:inline" style={{ color: "#D1D1D6", fontSize: 12 }}>{ANNOUNCEMENT.text}</span>
            <Link
              href={ANNOUNCEMENT.href}
              className="inline-flex items-center gap-1 transition-colors"
              style={{ color: "#8A8A8E", fontSize: 12 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8A8A8E"; }}
            >
              {ANNOUNCEMENT.cta} <ArrowRight size={10} />
            </Link>
          </div>
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 transition-colors"
            style={{ color: "#6B6B70" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6B6B70"; }}
            aria-label="Dismiss"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Main nav */}
      <div style={{ backgroundColor: "rgba(9,9,11,0.96)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <nav
        className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14"
      >
        <Link href="/" onClick={() => setOpen(false)} className="flex-shrink-0">
          <Image
            src="/acernis-logo-white.png"
            alt="Acernis"
            width={96}
            height={24}
            style={{ height: 22, width: "auto", objectFit: "contain" }}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className="px-3.5 py-2 rounded-md transition-colors"
                style={{
                  fontSize: 13,
                  color: active ? "#FFFFFF" : "#6B7280",
                  fontWeight: active ? 500 : 400,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "#6B7280"; }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://app.acernis.fr/login?next=%2Fprojects"
            className="px-3 py-1.5 text-xs rounded-md transition-colors"
            style={{ color: "#6B7280" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#D1D1D6"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6B7280"; }}
          >
            Log in
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all"
            style={{ backgroundColor: "#07644D", color: "#F0FDF4" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#055035"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#07644D"; }}
          >
            {t.nav.bookDemo} <MoveRight size={12} />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2" style={{ color: "#6B7280" }} onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-2"
          style={{ backgroundColor: "rgba(9,9,11,0.98)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm"
              style={{ color: isActive(l.href) ? "#FFFFFF" : "#6B7280" }}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-3">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm font-medium rounded-lg"
              style={{ backgroundColor: "#07644D", color: "#F0FDF4" }}
            >
              {t.nav.bookDemo}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

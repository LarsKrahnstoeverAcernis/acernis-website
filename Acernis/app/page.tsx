"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, MoveRight, Check, Database, Zap, Brain, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";


const INVESTORS_BASE = [
  { name: "Gerhard Mack",       role: "Former CTO, Vodafone Germany",                    photo: "/picture_Gerhard Mack.jpg" },
  { name: "Arndt Rautenberg",   role: "Founder, Rautenberg & Co – TelCo M&A",            photo: "/picture_Arndt Rautenberg.png" },
  { name: "Dido Blankenburg",   role: "Former SVP Corp. Development, Deutsche Telekom",  photo: "/picture_Dido Blankenburg.png" },
  { name: "Niek Jan Van Damme", role: "Former Executive Board Member, Deutsche Telekom", photo: "/picture_Niek Jan Van Damme.png" },
  { name: "Nicolas Drouet",     role: "Former Head of Presales, Ericsson", photo: "/picture_Nicolas Drouet.png" },
];

function InvestorCard({ name, role, photo, quote }: typeof INVESTORS[0]) {
  return (
    <div
      style={{
        width: 300,
        flexShrink: 0,
        borderRadius: 16,
        padding: "24px",
        backgroundColor: "#111111",
        border: "1px solid #1F2937",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "1px solid #1F2937" }}>
          <Image
            src={photo}
            alt={name}
            width={52}
            height={52}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", filter: "grayscale(100%)" }}
          />
        </div>
        <div>
          <p style={{ color: "#F0FDF4", fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{name}</p>
          <p style={{ color: "#0FA876", fontSize: 11, lineHeight: 1.45 }}>{role}</p>
        </div>
      </div>
      <p style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.7, fontStyle: "italic" }}>
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  );
}

const LOGOS_OPERATORS = [
  { src: "/Vodafone_logo_grey.png",      alt: "Vodafone",        w: 140, h: 60 },
  { src: "/VirginMediaO2_logo_grey.png", alt: "Virgin Media O2", w: 140, h: 60 },
];

const LOGOS_ECOSYSTEM = [
  { src: "/GFTD_logo_grey.png",       alt: "GfTD",   w: 110, h: 44 },
  { src: "/EKS_logo_grey.png",        alt: "EKS",    w: 72,  h: 32 },
  { src: "/Cablex_Logo.svg_grey.png", alt: "Cablex", w: 110, h: 44 },
  { src: "/insyte_logo_grey.png",     alt: "Insyte", w: 110, h: 44 },
  { src: "/SPIE_logo.svg_grey.png",   alt: "SPIE",   w: 72,  h: 32 },
  { src: "/Animo_logo_grey.png",      alt: "Animo",  w: 110, h: 44 },
];

function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodeCount = 48;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: 1.5 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.018 + Math.random() * 0.025,
    }));

    const packets = Array.from({ length: 10 }, () => ({
      from: Math.floor(Math.random() * nodeCount),
      to: Math.floor(Math.random() * nodeCount),
      t: Math.random(),
      spd: 0.003 + Math.random() * 0.004,
    }));

    let animId: number;

    function draw() {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 155) {
            ctx.strokeStyle = `rgba(7,100,77,${(1 - d / 155) * 0.18})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      packets.forEach((p) => {
        const fn = nodes[p.from], tn = nodes[p.to];
        const px = fn.x + (tn.x - fn.x) * p.t;
        const py = fn.y + (tn.y - fn.y) * p.t;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(7,100,77,0.5)";
        ctx.fillStyle = "rgba(7,100,77,0.55)";
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        p.t += p.spd;
        if (p.t >= 1) { p.from = p.to; p.to = Math.floor(Math.random() * nodeCount); p.t = 0; }
      });

      nodes.forEach((n) => {
        n.phase += n.speed;
        const glow = 0.18 + Math.sin(n.phase) * 0.12;
        ctx.shadowBlur = 3;
        ctx.shadowColor = `rgba(7,100,77,${glow})`;
        ctx.fillStyle = `rgba(7,100,77,${glow + 0.08})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0) { n.x = 0; n.vx = Math.abs(n.vx); }
        if (n.x > w) { n.x = w; n.vx = -Math.abs(n.vx); }
        if (n.y < 0) { n.y = 0; n.vy = Math.abs(n.vy); }
        if (n.y > h) { n.y = h; n.vy = -Math.abs(n.vy); }
      });

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}

function AntennaIcon() {
  return (
    <motion.div className="mb-7 flex-shrink-0"
      animate={{
        filter: [
          "drop-shadow(0 0 2px rgba(7,100,77,0.2))",
          "drop-shadow(0 0 12px rgba(7,100,77,0.75))",
          "drop-shadow(0 0 2px rgba(7,100,77,0.2))",
        ],
        scale: [1, 1.06, 1],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <Database size={52} style={{ color: "#0FA876" }} />
    </motion.div>
  );
}

function ChecklistIcon() {
  return (
    <motion.div className="mb-7 flex-shrink-0"
      animate={{
        filter: [
          "drop-shadow(0 0 0px rgba(7,100,77,0))",
          "drop-shadow(0 0 18px rgba(7,100,77,0.95))",
          "drop-shadow(0 0 6px rgba(7,100,77,0.4))",
          "drop-shadow(0 0 0px rgba(7,100,77,0))",
        ],
        scale: [1, 1.14, 1.04, 1],
      }}
      transition={{ duration: 4, repeat: Infinity, times: [0, 0.12, 0.28, 1], ease: "easeOut" }}
    >
      <Zap size={52} style={{ color: "#0FA876" }} />
    </motion.div>
  );
}

function BrainIcon() {
  return (
    <motion.div className="mb-7 flex-shrink-0"
      animate={{
        filter: [
          "drop-shadow(0 0 3px rgba(7,100,77,0.25))",
          "drop-shadow(0 0 14px rgba(7,100,77,0.85))",
          "drop-shadow(0 0 3px rgba(7,100,77,0.25))",
        ],
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <Brain size={52} style={{ color: "#0FA876" }} />
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#07644D" }}>
      <span className="w-4 h-px inline-block" style={{ backgroundColor: "#07644D" }} />
      {children}
    </p>
  );
}

export default function HomePage() {
  const { t } = useLanguage();
  const h = t.home;
  const [expandedUC, setExpandedUC] = useState<number | null>(null);
  const [videoClicked, setVideoClicked] = useState(false);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const CYCLING_WORDS = ["AI-powered", "up-to-date", "accurate", "accessible"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % CYCLING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let targetTime = 0;
    let ticking = false;

    const applyTime = () => {
      const video = bgVideoRef.current;
      if (video && video.readyState >= 2) {
        if (typeof (video as any).fastSeek === "function") {
          (video as any).fastSeek(targetTime);
        } else {
          video.currentTime = targetTime;
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      const video = bgVideoRef.current;
      const section = heroRef.current;
      if (!video || !section || !video.duration) return;
      const maxScroll = section.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const scrolled = window.scrollY - section.offsetTop;
      targetTime = Math.min(video.duration, Math.max(0, (scrolled / maxScroll) * video.duration));
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyTime);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{ height: "450vh", position: "relative" }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          {/* Background video – scroll-linked */}
          <video
            ref={bgVideoRef}
            src="/Acernis%20Video%20ZoomOut_v3.mp4"
            poster="/Pictire_Backup%20Start%20Screen.png"
            muted
            playsInline
            autoPlay
            preload="auto"
            onPlay={(e) => { e.currentTarget.pause(); }}
            onLoadedMetadata={() => {
              const v = bgVideoRef.current;
              if (!v) return;
              v.play().catch(() => { v.currentTime = 0.001; });
            }}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Gradient overlay for text readability */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.65) 100%)",
              zIndex: 1,
            }}
          />

          {/* Text content */}
          <div
            className="relative flex flex-col items-center justify-center text-center px-6"
            style={{ height: "100%", zIndex: 10 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold leading-none mb-8"
              style={{
                letterSpacing: "-0.04em",
                fontSize: "clamp(2rem, 4.2vw, 3.5rem)",
                color: "#F0FDF4",
                maxWidth: "900px",
              }}
            >
              The{" "}
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                    style={{ color: "#0FA876", display: "inline-block" }}
                  >
                    {CYCLING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>{" "}telecom<br />
              infrastructure platform
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg max-w-lg leading-relaxed mb-10 mx-auto"
              style={{ color: "#C0CAD0" }}
            >
              Cut rollout delays. Control your costs.<br />Turn network strategy into field-ready execution, instantly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center"
            >
              <Link
                href="/contact"
                className="btn-press inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all"
                style={{ backgroundColor: "#07644D", color: "#F0FDF4" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#055035"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#07644D"; }}
              >
                Request Access <MoveRight size={12} />
              </Link>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
            style={{ zIndex: 10, opacity: 0.45 }}
          >
            <span style={{ fontSize: 10, color: "#FFFFFF", letterSpacing: "0.12em", textTransform: "uppercase" }}>Scroll</span>
            <ChevronDown size={14} style={{ color: "#FFFFFF" }} />
          </div>
        </div>
      </section>

      {/* ── LOGO SECTIONS ── */}
      <section style={{ backgroundColor: "#F8FAF8", borderTop: "1px solid #E5E7EB" }}>
        {/* Operators */}
        <div className="px-6 py-14" style={{ borderBottom: "1px solid #E5E7EB" }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest mb-10" style={{ color: "#9CA3AF" }}>
              Trusted by Europe's Leading Operators
            </p>
            <div className="flex items-center justify-center gap-16 flex-wrap">
              {LOGOS_OPERATORS.map((logo) => (
                <Image
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.w}
                  height={logo.h}
                  style={{ height: "auto", maxWidth: `${logo.w}px`, width: "auto" }}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Ecosystem */}
        <div className="px-6 py-10" style={{ borderBottom: "1px solid #E5E7EB" }}>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: "#9CA3AF" }}>
              Integrated across the deployment ecosystem
            </p>
            <div className="flex items-center justify-center gap-10 flex-wrap">
              {LOGOS_ECOSYSTEM.map((logo) => (
                <Image
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.w}
                  height={logo.h}
                  style={{ height: "auto", maxWidth: `${logo.w}px`, width: "auto", opacity: 0.75 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="py-28 px-6" style={{ borderTop: "1px solid #E5E7EB" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Eyebrow>{h.solution.eyebrow}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#0A0A0A", textWrap: "balance" } as React.CSSProperties}>{h.solution.title}</h2>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="card-glow rounded-2xl p-8 flex-1 flex flex-col items-center text-center" style={{ backgroundColor: "#0D0D0D", border: "1px solid #1F2937" }}>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-8" style={{ backgroundColor: "#0A3020", color: "#0FA876", border: "1px solid rgba(7,100,77,0.3)" }}>{h.solution.card1Badge}</span>
              <AntennaIcon />
              <h3 className="text-lg font-bold mb-3" style={{ color: "#F0FDF4" }}>{h.solution.card1Title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>{h.solution.card1Body}</p>
            </div>

            <div className="flex items-center justify-center self-center flex-shrink-0 py-6 md:py-0 md:px-4">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs italic font-medium" style={{ color: "#0A0A0A" }}>{h.solution.arrow1Label}</span>
                <svg className="hidden md:block" width="36" height="14" viewBox="0 0 36 14" fill="none">
                  <line x1="0" y1="7" x2="28" y2="7" stroke="#07644D" strokeWidth="2" />
                  <polyline points="24,3 32,7 24,11" fill="none" stroke="#07644D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg className="md:hidden" width="14" height="32" viewBox="0 0 14 32" fill="none">
                  <line x1="7" y1="0" x2="7" y2="24" stroke="#07644D" strokeWidth="2" />
                  <polyline points="3,20 7,28 11,20" fill="none" stroke="#07644D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div className="card-glow rounded-2xl p-8 flex-1 flex flex-col items-center text-center" style={{ backgroundColor: "#0D0D0D", border: "1px solid #1F2937" }}>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-8" style={{ backgroundColor: "#0A3020", color: "#0FA876", border: "1px solid rgba(7,100,77,0.3)" }}>{h.solution.card2Badge}</span>
              <ChecklistIcon />
              <h3 className="text-lg font-bold mb-3" style={{ color: "#F0FDF4" }}>{h.solution.card2Title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>{h.solution.card2Body}</p>
            </div>

            <div className="flex items-center justify-center self-center flex-shrink-0 py-6 md:py-0 md:px-4">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs italic font-medium" style={{ color: "#0A0A0A" }}>{h.solution.arrow2Label}</span>
                <svg className="hidden md:block" width="36" height="14" viewBox="0 0 36 14" fill="none">
                  <line x1="0" y1="7" x2="28" y2="7" stroke="#07644D" strokeWidth="2" />
                  <polyline points="24,3 32,7 24,11" fill="none" stroke="#07644D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg className="md:hidden" width="14" height="32" viewBox="0 0 14 32" fill="none">
                  <line x1="7" y1="0" x2="7" y2="24" stroke="#07644D" strokeWidth="2" />
                  <polyline points="3,20 7,28 11,20" fill="none" stroke="#07644D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div className="card-glow rounded-2xl p-8 flex-1 flex flex-col items-center text-center" style={{ backgroundColor: "#0D0D0D", border: "1px solid rgba(7,100,77,0.25)", borderTop: "1px solid rgba(7,100,77,0.4)" }}>
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-8" style={{ backgroundColor: "#1F2937", color: "#6B7280", border: "1px solid rgba(107,114,128,0.2)" }}>{h.solution.card3Badge}</span>
              <BrainIcon />
              <h3 className="text-lg font-bold mb-3" style={{ color: "#F0FDF4" }}>{h.solution.card3Title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>{h.solution.card3Body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLATFORM INTRO ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0A0A0A", minHeight: "480px" }}>
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-28">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-stretch">
            <div className="md:col-span-3 flex flex-col justify-center">
              <Eyebrow>{h.platformIntro.eyebrow}</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color: "#F0FDF4", textWrap: "balance" } as React.CSSProperties}>{h.platformIntro.title}</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#9CA3AF" }}>{h.platformIntro.body}</p>
              <p className="text-sm font-semibold leading-relaxed" style={{ color: "#0FA876" }}>{h.platformIntro.closing}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="py-28 px-6" style={{ backgroundColor: "#F5F7F5", borderTop: "1px solid #E5E7EB" }}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-14">
            <Eyebrow>{h.useCasesSection.eyebrow}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#0A0A0A" }}>{h.useCasesSection.title}</h2>
          </div>

          <div className="flex flex-col gap-3">
            {t.useCases.cases.map((uc_item, i) => {
              const isOpen = expandedUC === i;
              return (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden"
                  style={{ backgroundColor: "#0D0D0D", border: `1px solid ${isOpen ? "rgba(7,100,77,0.4)" : "#1F2937"}`, transition: "border-color 0.2s" }}
                >
                  <button
                    className="w-full flex items-center gap-4 p-6 text-left"
                    onClick={() => setExpandedUC(isOpen ? null : i)}
                  >
                    <span className="text-base font-mono font-bold w-10 flex-shrink-0" style={{ color: "#0FA876" }}>{uc_item.number}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-base font-semibold" style={{ color: "#F0FDF4" }}>{uc_item.title}</p>
                        {uc_item.status && (
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0"
                            style={uc_item.status === "Live"
                              ? { backgroundColor: "#0A3020", color: "#0FA876", border: "1px solid rgba(7,100,77,0.3)" }
                              : { backgroundColor: "#1F2937", color: "#6B7280", border: "1px solid rgba(107,114,128,0.2)" }
                            }
                          >
                            {uc_item.status}
                          </span>
                        )}
                      </div>
                      <p className="text-sm" style={{ color: "#9CA3AF" }}>{uc_item.short}</p>
                    </div>
                    {isOpen
                      ? <ChevronUp size={18} style={{ color: "#07644D", flexShrink: 0 }} />
                      : <ChevronDown size={18} style={{ color: "#6B7280", flexShrink: 0 }} />
                    }
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6" style={{ borderTop: "1px solid #1F2937" }}>
                      <p className="text-sm leading-relaxed mt-4 mb-5" style={{ color: "#B0BBBF" }}>{uc_item.body}</p>
                      <div className="flex flex-col gap-2.5">
                        {uc_item.points.map((point, j) => (
                          <div key={j} className="flex gap-3 items-start">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "#0A3020" }}>
                              <Check size={11} style={{ color: "#F0FDF4" }} />
                            </div>
                            <p className="text-sm" style={{ color: "#B0BBBF" }}>{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VIDEO ── */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid #E5E7EB" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>{h.videoSection.eyebrow}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ color: "#0A0A0A", textWrap: "balance" } as React.CSSProperties}>{h.videoSection.title}</h2>
            <p className="text-base" style={{ color: "#4B5563" }}>{h.videoSection.subtitle}</p>
          </div>

          <div>
            <div
              className="w-full overflow-hidden"
              style={{
                borderRadius: "12px",
                border: "1px solid #1F2937",
                boxShadow: "0 24px 60px rgba(0,0,0,0.10), 0 0 80px rgba(7,100,77,0.04)",
              }}
            >
              <div className="flex items-center gap-1.5 px-4 py-3" style={{ backgroundColor: "#111111", borderBottom: "1px solid #1F2937" }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FFBD2E" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28CA41" }} />
                <div className="ml-3 h-4 rounded" style={{ backgroundColor: "#1A1A1A", width: "160px" }} />
              </div>

              <div
                className="relative w-full cursor-pointer"
                style={{ aspectRatio: "16/9", backgroundColor: "#0A0A0A" }}
                onClick={() => setVideoClicked(true)}
              >
                <div className="absolute inset-0" style={{
                  backgroundImage: "linear-gradient(rgba(7,100,77,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(7,100,77,0.05) 1px, transparent 1px)",
                  backgroundSize: "64px 64px",
                }} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {!videoClicked ? (
                    <>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        className="flex items-center justify-center rounded-full mb-5"
                        style={{ width: 80, height: 80, backgroundColor: "rgba(7,100,77,0.92)", boxShadow: "0 0 48px rgba(7,100,77,0.5), 0 0 0 1px rgba(7,100,77,0.3)" }}
                      >
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="#F0FDF4" style={{ marginLeft: "4px" }}>
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                      </motion.div>
                      <p className="text-sm" style={{ color: "#8A9EA0" }}>{h.videoSection.placeholder}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-base font-semibold" style={{ color: "#B0BBBF" }}>{h.videoSection.comingSoon}</p>
                      <a
                        href="https://app.acernis.fr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition-colors"
                        style={{ color: "#0FA876" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#07644D"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#0FA876"; }}
                      >
                        Try it on app.acernis.fr
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KPIs ── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#0A0A0A" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest" style={{ color: "#6B7280" }}>
              <span className="w-4 h-px inline-block" style={{ backgroundColor: "#6B7280" }} />
              SUCCESS KPIs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {h.kpis.items.map((item, i) => (
              <div key={i} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 28, filter: "blur(14px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.95, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center px-8 py-10"
                >
                  <span
                    className="block text-6xl md:text-7xl font-bold mb-5 leading-none tracking-tight"
                    style={{ color: "#0FA876" }}
                  >
                    {item.value}
                  </span>
                  <p className="text-sm leading-relaxed max-w-[180px]" style={{ color: "#9CA3AF" }}>
                    {item.label}
                  </p>
                </motion.div>
                {i < h.kpis.items.length - 1 && (
                  <>
                    <div className="md:hidden h-px w-3/4 mx-auto" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
                    <div className="hidden md:block absolute right-0 inset-y-12 w-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 relative overflow-hidden" style={{ borderTop: "1px solid #E5E7EB" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(7,100,77,0.06) 0%, transparent 70%)" }} />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight" style={{ color: "#0A0A0A", textWrap: "balance" } as React.CSSProperties}>{h.cta.title}</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-press inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all"
              style={{ backgroundColor: "#07644D", color: "#F0FDF4" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#055035"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#07644D"; }}
            >
              {h.cta.cta1} <MoveRight size={12} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

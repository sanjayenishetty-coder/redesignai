// ThankYouPage.tsx
import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Calendar, CheckCircle, Sparkles } from "lucide-react";
import { useNavigate } from 'react-router';

// ── Types ──────────────────────────────────────────────────────────────────
interface ConfettiDot {
  id: number;
  size: number;
  left: number;
  color: string;
  duration: number;
  delay: number;
}

interface StatItem {
  value: string;
  label: string;
}

interface PromptTag {
  label: string;
  colorClass: string;
}

interface ThankYouPageProps {
  onFeedback?: () => void;
}

// ── Constants ──────────────────────────────────────────────────────────────
const CONFETTI_COLORS: string[] = [
  "#2C8C7E",
  "#E8654A",
  "#C9963A",
  "#3AAFA0",
  "rgba(255,255,255,0.4)",
];

const STATS: StatItem[] = [
  { value: "1st", label: "SME Summit" },
  { value: "ISB", label: "Hyderabad"  },
  { value: "21st", label: "Feb 2026"  },
];

const PROMPT_TAGS: PromptTag[] = [
  {
    label: "✦ What worked?",
    colorClass:
      "border-teal-500/40 text-teal-300 bg-teal-500/10",
  },
  {
    label: "✦ What resonated?",
    colorClass:
      "border-orange-400/40 text-orange-300 bg-orange-500/10",
  },
  {
    label: "✦ What to build next?",
    colorClass:
      "border-amber-400/40 text-amber-300 bg-amber-500/10",
  },
];

// ── Confetti Dot ───────────────────────────────────────────────────────────
const ConfettiLayer: React.FC<{ dots: ConfettiDot[] }> = ({ dots }) => (
  <>
    {dots.map((d) => (
      <div
        key={d.id}
        className="fixed rounded-full pointer-events-none opacity-0"
        style={{
          width: d.size,
          height: d.size,
          left: `${d.left}vw`,
          bottom: 0,
          background: d.color,
          animation: `floatUp ${d.duration}s linear ${d.delay}s infinite`,
        }}
      />
    ))}
  </>
);

// ── Stat Item ──────────────────────────────────────────────────────────────
const Stat: React.FC<{ item: StatItem; showDivider: boolean }> = ({ item, showDivider }) => (
  <div
    className={`flex-1 text-center px-3 ${
      showDivider ? "border-l border-white/10" : ""
    }`}
  >
    <p
      className="text-xl font-bold text-white mb-1"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {item.value}
    </p>
    <p className="text-[10px] uppercase tracking-widest text-white/30">{item.label}</p>
  </div>
);

// ── Main ThankYouPage Component ────────────────────────────────────────────
const ThankYouPage: React.FC<ThankYouPageProps> = () => {
  const [dots, setDots] = useState<ConfettiDot[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setDots(
      Array.from({ length: 18 }, (_, i) => ({
        id:       i,
        size:     Math.random() * 5 + 3,
        left:     Math.random() * 100,
        color:    CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        duration: Math.random() * 14 + 10,
        delay:    Math.random() * 10,
      }))
    );
  }, []);

  return (
    <>
      <div
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-14 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0D1B33 0%, #1B2A4A 45%, #162638 100%)",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        {/* Grid overlay */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient orbs */}
        <div className="fixed -top-28 -left-24 w-[480px] h-[480px] rounded-full blur-[90px] pointer-events-none opacity-35"
          style={{ background: "radial-gradient(circle, #2C8C7E, transparent 70%)" }} />
        <div className="fixed -bottom-20 -right-20 w-[380px] h-[380px] rounded-full blur-[90px] pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, #E8654A, transparent 70%)" }} />
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full blur-[90px] pointer-events-none opacity-10"
          style={{ background: "radial-gradient(circle, #C9963A, transparent 70%)" }} />

        {/* Confetti */}
        <ConfettiLayer dots={dots} />

        {/* ── Brand ── */}
        <div className="anim-fade-down relative z-10 flex items-center gap-2.5 mb-12">
          <div
            className="w-[100px] h-[20px] md:w-[195px] md:h-[38px] flex-shrink-0"
          >
            <img src="https://d2z9497xp8xb12.cloudfront.net/prod-images/789549c1770378555007logo_scrolled.png"  alt="Logo"
                className="w-full h-full object-contain" />
          </div>
        </div>

        {/* ── Card ── */}
        <div
          className="anim-fade-up relative z-10 w-full max-w-[580px] rounded-3xl text-center overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
            backdropFilter: "blur(24px)",
            padding: "clamp(32px, 5vw, 52px) clamp(24px, 6vw, 52px)",
          }}
        >
          {/* Shimmer top border */}
          <div className="shimmer-line absolute top-0 left-[10%] right-[10%] h-px" />

          {/* Check icon */}
          <div
            className="anim-pulse-ring w-20 h-20 rounded-full mx-auto mb-7 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(44,140,126,0.2), rgba(44,140,126,0.04))",
              border: "1px solid rgba(44,140,126,0.3)",
            }}
          >
            <CheckCircle className="w-9 h-9 text-teal-400" strokeWidth={1.5} />
          </div>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-1.5 mb-4">
            <Sparkles className="w-3 h-3 text-teal-400" />
            <p className="text-[14px] font-bold uppercase tracking-[3px] text-teal-400">
              SME Growth Summit '26
            </p>
            <Sparkles className="w-3 h-3 text-teal-400" />
          </div>

          {/* Heading */}
          <h1
            className="text-[clamp(26px,5vw,36px)] font-bold text-white leading-snug mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Thank You for Being<br />
            Part of{" "}
            <em className="not-italic" style={{ color: "#C9963A" }}>ScaleMe</em>
          </h1>

          {/* Event pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/25 bg-amber-500/10 text-amber-300 text-xs font-medium mb-7">
            <MapPin className="w-3 h-3" />
            ISB Hyderabad
            <span className="opacity-40">·</span>
            <Calendar className="w-3 h-3" />
            21st February 2026
          </div>

          {/* Body copy */}
          <p className="text-[15px] leading-[1.8] text-white/55 mb-8 max-w-[440px] mx-auto">
            It was incredible to have you with us. We'd love to hear from you {" "}
            <span className="text-white/85 font-semibold">what worked, what resonated,</span>{" "}
            and most importantly,{" "}
            <span className="text-white/85 font-semibold">
              what you want ScaleMe to build next.
            </span>
            <br /><br />
            Please take a few minutes to share your feedback. Every response shapes the next chapter.
          </p>

          {/* Prompt tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {PROMPT_TAGS.map((t) => (
              <span
                key={t.label}
                className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium border ${t.colorClass}`}
              >
                {t.label}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            className="cta-btn inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl text-white text-[15px] font-bold border-none cursor-pointer transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #2C8C7E, #1F6B5E)",
              boxShadow: "0 6px 28px rgba(44,140,126,0.35)",
            }}
            onClick={() => {navigate('/feedback')}}
          >
            Share Your Feedback
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-[12px] text-white/25 mt-3">Takes less than 3 minutes</p>

          {/* Divider */}
          <div className="h-px bg-white/[0.07] my-8" />

          {/* Stats */}
          <div className="flex justify-center">
            {STATS.map((s, i) => (
              <Stat key={s.label} item={s} showDivider={i > 0} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="anim-fade-up-lg relative z-10 mt-9 text-[12px] text-white/20 text-center">
          © 2026 ScaleMe &nbsp;·&nbsp; Building India's SME Growth Ecosystem
        </p>
      </div>
    </>
  );
};

export default ThankYouPage;
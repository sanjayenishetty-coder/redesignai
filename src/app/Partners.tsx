import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "./components/Footer";
import {
  Menu,
  X,
  CheckCircle2,
  MapPin,
  Calendar,
  Users,
  Building2,
  TrendingUp,
  ChevronRight,
  Mail,
  Phone,
  Star,
  Award,
  BarChart3,
  Globe,
  Briefcase,
  Scale,
  Landmark,
  Cpu,
  Megaphone,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";

const BRAND_TEAL = "#007787";
const BRAND_TEAL_LIGHT = "#499CA6";
const BRAND_ORANGE = "#F15A2B";

const FONT = "Montserrat, sans-serif";

/* ─────────────────────────── DATA ─────────────────────────── */

const stats = [
  { value: "357", label: "SME Operators Attended", icon: Users },
  { value: "314+", label: "Unique Companies", icon: Building2 },
  { value: "24", label: "Industries Represented", icon: BarChart3 },
  { value: "69%", label: "Founders & Promoters", icon: TrendingUp },
];

const industries = [
  { name: "Technology / SaaS / IT", count: 114, pct: 100 },
  { name: "Manufacturing / Industrial", count: 28, pct: 25 },
  { name: "Retail / D2C / Consumer", count: 26, pct: 23 },
  { name: "Investment / VC / PE", count: 25, pct: 22 },
  { name: "Consulting / Advisory", count: 22, pct: 19 },
  { name: "Healthcare / Pharma", count: 20, pct: 18 },
  { name: "Media / Entertainment", count: 18, pct: 16 },
  { name: "Real Estate / Construction", count: 14, pct: 12 },
  { name: "Food & Beverage / Agri", count: 12, pct: 11 },
  { name: "Banking / Corporate", count: 11, pct: 10 },
  { name: "Fintech / Financial Svc", count: 9, pct: 8 },
  { name: "Education / EdTech", count: 8, pct: 7 },
];

const cities = [
  {
    name: "Hyderabad",
    date: "Feb 21, 2026",
    venue: "ISB Campus",
    attendees: "357",
    status: "completed",
    industries: "IT, Pharma, Manufacturing",
  },
  {
    name: "Chennai",
    date: "May 30, 2026",
    venue: "TBA",
    attendees: "300–500",
    status: "confirmed",
    industries: "Auto Ancillary, Textiles, Healthcare",
  },
  {
    name: "Indore",
    date: "Jun–Jul 2026",
    venue: "TBA",
    attendees: "300+",
    status: "upcoming",
    industries: "FMCG, Textiles, Pharma",
  },
  {
    name: "Mangalore",
    date: "Jul–Aug 2026",
    venue: "TBA",
    attendees: "300+",
    status: "upcoming",
    industries: "Retail, Logistics, Healthcare",
  },
  {
    name: "Chandigarh",
    date: "Aug–Sep 2026",
    venue: "TBA",
    attendees: "300+",
    status: "upcoming",
    industries: "Agri, Real Estate, Pharma",
  },
  {
    name: "Patna",
    date: "Sep–Oct 2026",
    venue: "TBA",
    attendees: "300+",
    status: "upcoming",
    industries: "Agri, FMCG, Education",
  },
  {
    name: "+ 3 More Cities",
    date: "Oct–Dec 2026",
    venue: "TBA",
    attendees: "300+",
    status: "planned",
    industries: "Pan-India SME Hubs",
  },
];

const sessionFormats = [
  {
    title: "Keynote Address",
    desc: "Marquee industry leader shares their ₹25 Cr → ₹1,000+ Cr scaling journey",
    icon: "🎤",
  },
  {
    title: "Panel Discussion",
    desc: "3–4 high-growth founders who crossed the ₹500 Cr barrier — Leadership, capital, scale-up",
    icon: "💬",
  },
  {
    title: "Fireside Chat",
    desc: "Intimate conversation with PE investor or IPO-listed founder on what makes SMEs investable",
    icon: "🔥",
  },
  {
    title: "Expert Session",
    desc: "Thought leadership on critical scaling — Financial resilience, Tech stack, GTM",
    icon: "📊",
  },
  {
    title: "Structured Networking",
    desc: "Curated sit-down lunch/dinner with pre-assigned seating — SME leaders, speakers & guests",
    icon: "🤝",
  },
];

const partnerCategories = [
  {
    icon: Landmark,
    category: "Banking & Working Capital",
    for: "Banks, NBFCs, Debt Funds",
    price: "₹7–10L / city",
    why: "Every attendee is actively seeking working capital. Be the first name they associate with growth finance.",
    perks: [
      "Exclusive category — no competing banks",
      "10-min session slot on capital access",
      "Curated intro to 20+ high-intent promoters",
      "Logo on all event collateral",
      "Post-event attendee database (opt-in)",
    ],
    slots: "1 slot per city",
    highlight: true,
  },
  {
    icon: Scale,
    category: "Legal & Compliance",
    for: "Law Firms, CS Firms, Audit Firms",
    price: "₹5–7L / city",
    why: "SMEs scaling past ₹25 Cr need serious legal structuring. Position your firm as the go-to advisor.",
    perks: [
      "Exclusive legal category per city",
      "Panel participation (2 cities of choice)",
      "Brand intro during networking session",
      "Post-event offer: free legal health check",
      "Attendee database (filtered by relevance)",
    ],
    slots: "1 slot per city",
  },
  {
    icon: TrendingUp,
    category: "Equity & PE / VC Funding",
    for: "PE Funds, VC Funds, Angel Networks",
    price: "₹7–10L / city",
    why: "Direct access to 300–500 verified growth-stage promoters actively seeking equity capital.",
    perks: [
      "Exclusive capital partner slot",
      "Fireside chat co-hosting opportunity",
      "Pre-screened deal flow introductions",
      "VIP table at networking dinner",
      "Post-event investor connect report",
    ],
    slots: "1 slot per city",
    highlight: true,
  },
  {
    icon: Briefcase,
    category: "Debt Funding & Credit",
    for: "Debt Funds, Credit Companies, Fintechs",
    price: "₹7–10L / city",
    why: "SMEs at ₹25–100 Cr need ₹15 Lakh Crore in credit over the next 3 years. Be in the room when decisions are made.",
    perks: [
      "Exclusive debt category per city",
      "Session slot on working capital structures",
      "Direct connect with CFOs and promoters",
      "Brand in all pre-event email campaigns",
      "Attendee database access",
    ],
    slots: "1 slot per city",
  },
  {
    icon: Cpu,
    category: "Technology & AI Transformation",
    for: "ERP, SaaS, AI Tools, Tech Services",
    price: "₹5–7L / city",
    why: "Every operator is trying to tech-enable their scaling. Present your solution in the most credible room in the city.",
    perks: [
      "Exclusive tech category per city",
      "Demo/showcase opportunity during breaks",
      "Co-branded SME Tech Playbook",
      "Panel speaker slot (2 cities)",
      "Social media spotlights",
    ],
    slots: "1 slot per city",
  },
  {
    icon: BarChart3,
    category: "IPO Advisory & Capital Markets",
    for: "Merchant Bankers, Wealth Mgmt, Pre-IPO Funds",
    price: "₹7–10L / city",
    why: "These promoters are 3–5 years from a listing event. Be the advisor they remember from the conclave.",
    perks: [
      "Exclusive IPO advisory slot",
      "Fireside chat eligibility",
      "Pre-screened CEO introductions",
      "Co-branded capital readiness content",
      "Alumni network access",
    ],
    slots: "1 slot per city",
  },
  {
    icon: Megaphone,
    category: "Marketing & Brand Growth",
    for: "Agencies, Martech, D2C Enablers",
    price: "₹5–7L / city",
    why: "Operators scaling from ₹25 Cr to ₹100 Cr need brand and GTM help. Show up where they make those decisions.",
    perks: [
      "Exclusive marketing category per city",
      "Session slot on GTM strategies",
      "Co-branded SME Growth Toolkit",
      "3 VIP passes per city",
      "Post-event newsletter feature",
    ],
    slots: "1 slot per city",
  },
  {
    icon: ShieldCheck,
    category: "HR, Talent & Leadership",
    for: "HRMS, Staffing, Leadership Hiring",
    price: "₹5–7L / city",
    why: "The #1 bottleneck for scaling SMEs is talent and leadership. Be the solution in the room.",
    perks: [
      "Exclusive HR/talent category per city",
      "Session on building professional leadership",
      "Curated introductions to scaling promoters",
      "Brand on all session collateral",
      "Opt-in attendee database",
    ],
    slots: "1 slot per city",
  },
  {
    icon: GraduationCap,
    category: "Accounting, CFO & Compliance",
    for: "CA Firms, Outsourced CFO, ERP Accounting",
    price: "₹5–7L / city",
    why: "Financial governance is the first thing that breaks when SMEs try to scale. Be the expert they call.",
    perks: [
      "Exclusive accounting/CFO category",
      "Session on financial resilience for growth",
      "Free consultation offer to all attendees",
      "Brand on event badges & collateral",
      "Post-event attendee connect",
    ],
    slots: "1 slot per city",
  },
];

const brandTouchpoints = [
  "All pre-event email campaigns (4–6 waves per city)",
  "Stage backdrop at every summit",
  "ScaleMe website — 6-month logo display",
  "Event landing page & registration portal",
  "Name badges and event collateral",
  "Post-event report (10,000+ SME database)",
  "LinkedIn/Instagram sponsored posts",
  "25–30 post-event video clips for social media",
  "Speaker quote graphics with your brand",
  "PR press releases in regional business media",
];

const advisors = [
  {
    name: "Prof. Rajendra Srivastava",
    title: "Executive Director, ISB Centre for Business Innovation",
    desc: "India's most cited marketing scholar — 25,000+ Google citations. Thought leader in Business Innovation and Organisational Transformation.",
    logo: "https://d2z9497xp8xb12.cloudfront.net/prod-images/isb-cbi-logo.png",
    img: "/assets/34e0109e40c51a1472a6c20ccd69b6d9b02318af.png",
  },
  {
    name: "Raj Narayanam",
    title: "Founder & Executive Chairman, Zaggle",
    desc: "Built and scaled Zaggle (IPO 2023) and eYantra. Invested in 47+ startups. Champions India's startup and SME ecosystem.",
    logo: "/assets/zaggle-logo.png",
    img: "",
  },
  {
    name: "Murali Bukkapatnam",
    title: "Chairman, Global Board of Trustees, TiE",
    desc: "Enabling cross-border mentorship and capital through TiE's global chapters. Supports founders at every stage of their journey.",
    logo: "",
    img: "",
  },
];

const photos = [
  { src: "/assets/summit-audience.jpg", alt: "357 SME operators at ISB Hyderabad" },
  { src: "/assets/summit-podium.jpg", alt: "Prof. Rajendra Srivastava at ISB podium" },
  { src: "/assets/summit-panel.jpg", alt: "Panel discussion with speakers" },
  { src: "/assets/summit-speaker.jpg", alt: "Keynote session in full swing" },
  { src: "/assets/summit-networking.jpg", alt: "Operators connecting at the summit" },
  { src: "/assets/summit-felicitation.jpg", alt: "Speaker felicitation at ISB" },
];

/* ─────────────────────────── COMPONENT ─────────────────────────── */

export default function Partners() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countersStarted, setCountersStarted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
      if (window.scrollY > 200) setCountersStarted(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-white overflow-x-hidden" style={{ fontFamily: FONT }}>

      {/* ── STICKY HEADER ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md border-b border-gray-100" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex-shrink-0">
            <img
              src="https://d2z9497xp8xb12.cloudfront.net/prod-images/789549c1770378555007logo_scrolled.png"
              alt="ScaleMe Network"
              className="h-8 w-auto"
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
            <a href="#proof" className="hover:text-[#007787] transition-colors">Past Summit</a>
            <a href="#cities" className="hover:text-[#007787] transition-colors">Cities</a>
            <a href="#packages" className="hover:text-[#007787] transition-colors">Partner Packages</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/919010155595?text=Hi%20Sanjay%2C%20I'm%20interested%20in%20partnering%20with%20ScaleMe%20Summit"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: BRAND_ORANGE }}
            >
              Talk to Sanjay
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" style={{ color: BRAND_TEAL }} /> : <Menu className="w-6 h-6" style={{ color: BRAND_TEAL }} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
            <nav className="flex flex-col gap-3 py-3 text-sm font-semibold text-gray-700">
              <a href="#proof" onClick={() => setMobileMenuOpen(false)} className="py-1">Past Summit</a>
              <a href="#cities" onClick={() => setMobileMenuOpen(false)} className="py-1">Cities</a>
              <a href="#packages" onClick={() => setMobileMenuOpen(false)} className="py-1">Partner Packages</a>
            </nav>
            <a
              href="https://wa.me/919010155595?text=Hi%20Sanjay%2C%20I'm%20interested%20in%20partnering%20with%20ScaleMe%20Summit"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center px-5 py-3 rounded-lg text-sm font-bold text-white mt-2"
              style={{ backgroundColor: BRAND_ORANGE }}
            >
              Talk to Sanjay on WhatsApp
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="pt-28 pb-20 md:pt-36 md:pb-28 px-4 md:px-8 bg-gradient-to-br from-[#f0fafa] via-white to-[#f0fafa]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#007787]/10 border border-[#007787]/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#007787] animate-pulse" />
              <span className="text-[#007787] text-xs font-bold uppercase tracking-widest">Partnership Opportunities · Summit 2026</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Not Just Sponsorship.{" "}
              <span style={{ color: BRAND_TEAL }}>Strategic Market Entry.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
              ScaleMe Summit is India's only curated conclave for growth-stage SME operators —
              verified ₹25–100 Crore founders making real decisions on capital, tech, and scale.
              Your brand in this room is not visibility. It's access.
            </p>

            {/* Key stats row */}
            <div className="flex flex-wrap gap-6 mb-10 text-sm font-semibold text-gray-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: BRAND_TEAL }} />
                <span>7+ Cities · Feb – Dec 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" style={{ color: BRAND_TEAL }} />
                <span>1,500+ Vetted Promoters</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" style={{ color: BRAND_TEAL }} />
                <span>In Collaboration with ISB Centre for Business Innovation & NSE Emerge</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/919010155595?text=Hi%20Sanjay%2C%20I'm%20interested%20in%20partnering%20with%20ScaleMe%20Summit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-lg"
                style={{ backgroundColor: BRAND_ORANGE }}
              >
                <Phone className="w-5 h-5" />
                Talk to Sanjay on WhatsApp
              </a>
              <a
                href="mailto:sanjay@scaleme.in?subject=ScaleMe Summit Partnership Enquiry"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold border-2 transition-all hover:bg-[#007787] hover:text-white"
                style={{ borderColor: BRAND_TEAL, color: BRAND_TEAL }}
              >
                <Mail className="w-5 h-5" />
                Email Sanjay
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── OPPORTUNITY ── */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#007787]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#a8dde3] text-xs font-bold uppercase tracking-widest mb-3">The Market Context</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              The ₹50 Lakh Crore Room<br />
              <span className="text-[#7dd3d8]">You Haven't Accessed Yet</span>
            </h2>
            <p className="text-[#c5e8eb] text-lg max-w-2xl mx-auto">
              India's "Missing Middle" — SMEs in the ₹25–100 Cr bracket — are the most
              underserved and fastest-growing segment in the economy.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
            {[
              { value: "63M", label: "SMEs in India" },
              { value: "30%", label: "of India's GDP" },
              { value: "45%", label: "of all exports" },
              { value: "₹15L Cr", label: "Capital need in 3 years" },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{s.value}</div>
                <div className="text-[#a8dde3] text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8">
            <p className="text-white font-semibold mb-2 text-sm uppercase tracking-wider">The Sweet Spot — ₹25–100 Cr Revenue SMEs</p>
            <div className="grid md:grid-cols-3 gap-6 text-white">
              <div><span className="text-2xl font-bold text-[#7dd3d8]">48,000+</span><p className="text-sm text-[#c5e8eb] mt-1">Companies in this revenue bracket (NSSO data)</p></div>
              <div><span className="text-2xl font-bold text-[#7dd3d8]">18–25%</span><p className="text-sm text-[#c5e8eb] mt-1">Average CAGR of this segment</p></div>
              <div><span className="text-2xl font-bold text-[#7dd3d8]">₹50+ Lakh Cr</span><p className="text-sm text-[#c5e8eb] mt-1">Combined annual revenue of this segment</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROOF — ISB HYDERABAD ── */}
      <section id="proof" className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#007787] text-xs font-bold uppercase tracking-widest mb-3">Summit Edition 1 · Feb 21, 2026</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              We Launched at <span style={{ color: BRAND_TEAL }}>ISB Hyderabad.</span><br />
              357 Operators Showed Up.
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The inaugural ScaleMe Summit was held at one of India's premier business school campuses.
              Every seat was filled. Watch the after-movie.
            </p>
          </div>

          {/* YouTube embed */}
          <div className="rounded-2xl overflow-hidden shadow-2xl mb-12 aspect-video max-w-5xl mx-auto">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/IfXpJbKagNo?si=zgnypu50mADnqLdj"
              title="ScaleMe Summit After Movie"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            {stats.map((s, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-[#f8fafa] p-6 text-center shadow-sm">
                <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: BRAND_TEAL }}>{s.value}</div>
                <div className="text-gray-500 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {photos.map((p, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden shadow-md ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
                style={{ aspectRatio: i === 0 ? "16/10" : "4/3" }}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ATTENDEE PROFILE ── */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#f8fafa]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <div>
              <p className="text-[#007787] text-xs font-bold uppercase tracking-widest mb-3">Who's In The Room</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Strictly Curated.<br />
                <span style={{ color: BRAND_TEAL }}>Every Attendee Is a Decision-Maker.</span>
              </h2>
              <div className="space-y-3 mb-8">
                {[
                  "Verified ₹10 Cr+ annual revenue (checked via GST / financials)",
                  "CEO / MD / Promoter only — not delegates or managers",
                  "Growth-stage companies actively investing in capital, tech & advisory",
                  "69% are Founders or Promoters — the actual decision-makers",
                  "26 Investors & VCs in the room (7.3% of attendees)",
                ].map((pt, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: BRAND_TEAL }} />
                    <span className="text-gray-700 text-sm leading-relaxed">{pt}</span>
                  </div>
                ))}
              </div>

              {/* Compare table */}
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase text-gray-500 px-4 py-3">
                  <div>Event Type</div>
                  <div>Audience</div>
                  <div>Your Access</div>
                </div>
                {[
                  ["Startup Conference", "70% sub-₹5Cr", "Booth, no database"],
                  ["Trade Show", "Mixed vendors & students", "Cold contacts"],
                  ["Corporate Conclave", "₹1,000Cr+ (not buying)", "Panel, no follow-up"],
                ].map(([type, audience, access], i) => (
                  <div key={i} className="grid grid-cols-3 px-4 py-3 border-b border-gray-100 text-sm text-gray-600">
                    <div>{type}</div>
                    <div>{audience}</div>
                    <div>{access}</div>
                  </div>
                ))}
                <div className="grid grid-cols-3 px-4 py-3 text-sm font-bold" style={{ backgroundColor: "#f0fafa", color: BRAND_TEAL }}>
                  <div>ScaleMe Summit</div>
                  <div>100% ₹10–100Cr Promoters</div>
                  <div>Session + Dinner + Database</div>
                </div>
              </div>
            </div>

            {/* Right — Industry breakdown */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-1">Industry Breakdown</h3>
              <p className="text-gray-500 text-xs mb-5">ISB Hyderabad · 357 Participants · 24 Industries</p>
              <div className="space-y-3">
                {industries.map((ind, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                      <span>{ind.name}</span>
                      <span className="font-bold" style={{ color: BRAND_TEAL }}>{ind.count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${ind.pct}%`, backgroundColor: i === 0 ? BRAND_TEAL : BRAND_TEAL_LIGHT, opacity: 1 - i * 0.06 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE NATIONAL CARAVAN ── */}
      <section id="cities" className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#007787] text-xs font-bold uppercase tracking-widest mb-3">The National Growth Caravan</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              One Partnership.<br />
              <span style={{ color: BRAND_TEAL }}>7+ Industrial Hubs.</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              ScaleMe Summit travels to India's most important SME markets through Feb–Dec 2026.
              A single city partnership puts your brand in the room. A multi-city partnership
              makes you part of a national story.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cities.map((city, i) => (
              <div
                key={i}
                className={`rounded-2xl p-5 border transition-all ${
                  city.status === "completed"
                    ? "bg-[#007787] border-[#007787] text-white"
                    : city.status === "confirmed"
                    ? "bg-[#f0fafa] border-[#007787] border-2"
                    : city.status === "planned"
                    ? "bg-gray-50 border-dashed border-gray-300"
                    : "bg-[#f8fafa] border-gray-100"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className={`font-bold text-lg ${city.status === "completed" ? "text-white" : "text-gray-900"}`}>
                      {city.name}
                    </h3>
                    {city.status === "completed" && (
                      <span className="text-xs font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">Completed ✓</span>
                    )}
                    {city.status === "confirmed" && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: BRAND_TEAL, color: "white" }}>Confirmed · Open</span>
                    )}
                    {city.status === "upcoming" && (
                      <span className="text-xs font-bold bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Upcoming</span>
                    )}
                    {city.status === "planned" && (
                      <span className="text-xs font-bold bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Planning</span>
                    )}
                  </div>
                </div>

                <div className={`space-y-1.5 text-xs ${city.status === "completed" ? "text-white/80" : "text-gray-500"}`}>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{city.date}</span>
                  </div>
                  {city.venue !== "TBA" && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{city.venue}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>{city.attendees} Operators</span>
                  </div>
                </div>

                <div className={`mt-3 pt-3 border-t text-xs font-medium ${
                  city.status === "completed" ? "border-white/20 text-white/70" : "border-gray-200 text-gray-500"
                }`}>
                  {city.industries}
                </div>
              </div>
            ))}
          </div>

          {/* Multi-city bundle */}
          <div className="mt-10 rounded-2xl p-6 md:p-8 border-2 text-center" style={{ borderColor: BRAND_TEAL, backgroundColor: "#f0fafa" }}>
            <h3 className="text-xl font-bold mb-2" style={{ color: BRAND_TEAL }}>Multi-City Bundle Pricing</h3>
            <p className="text-gray-600 mb-6">Partners who commit to multiple cities get preferential pricing and first-mover advantage in each market.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { cities: "1 City", discount: "Standard Rate", desc: "Single city partnership" },
                { cities: "3 Cities", discount: "20% Off", desc: "Regional presence across SME hubs" },
                { cities: "5+ Cities", discount: "30% Off", desc: "National partner — first right of refusal" },
              ].map((b, i) => (
                <div key={i} className={`rounded-xl p-5 ${i === 2 ? "text-white" : "bg-white border border-gray-200"}`} style={i === 2 ? { backgroundColor: BRAND_TEAL } : {}}>
                  <div className={`text-2xl font-bold mb-1 ${i === 2 ? "text-white" : ""}`} style={i !== 2 ? { color: BRAND_TEAL } : {}}>{b.discount}</div>
                  <div className={`font-semibold text-sm mb-1 ${i === 2 ? "text-white/90" : "text-gray-900"}`}>{b.cities}</div>
                  <div className={`text-xs ${i === 2 ? "text-white/70" : "text-gray-500"}`}>{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SUMMIT FORMAT ── */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-[#f8fafa]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#007787] text-xs font-bold uppercase tracking-widest mb-3">Summit Format</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Not a Conference. <span style={{ color: BRAND_TEAL }}>A High-Impact Conclave.</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">4 hours. Every minute is structured for operator-level insight and curated connection.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {sessionFormats.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-sm text-gray-900 mb-2">{s.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOUR BRAND GETS ── */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#007787] text-xs font-bold uppercase tracking-widest mb-3">Brand Reach</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your Brand Appears<br />
                <span style={{ color: BRAND_TEAL }}>Far Beyond the Event Hall.</span>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Every partnership includes a full-stack brand presence — pre-event, during, and post-summit.
                Projected reach: <strong>2 Million+ impressions</strong> per city cycle.
              </p>

              <div className="grid grid-cols-1 gap-2">
                {brandTouchpoints.map((pt, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: BRAND_TEAL }} />
                    <span className="text-sm text-gray-700">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Globe, label: "1,00,000+", sub: "SME leaders in outreach database" },
                { icon: Users, label: "10,000+", sub: "ISB alumni network reached" },
                { icon: BarChart3, label: "2M+", sub: "Projected brand impressions" },
                { icon: Award, label: "6 months", sub: "Ongoing brand association" },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl border border-gray-100 bg-[#f8fafa] p-5 text-center">
                  <s.icon className="w-7 h-7 mx-auto mb-3" style={{ color: BRAND_TEAL }} />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{s.label}</div>
                  <div className="text-xs text-gray-500">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIP PACKAGES ── */}
      <section id="packages" className="py-16 md:py-24 px-4 md:px-8 bg-[#f0fafa]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#007787] text-xs font-bold uppercase tracking-widest mb-3">Partnership Packages</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Strategic Access,<br />
              <span style={{ color: BRAND_TEAL }}>Not Just Visibility.</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Each category is exclusive — one partner per city. No competing brands.
              Choose the category that aligns with your business and own that conversation
              with India's fastest-growing SME operators.
            </p>
          </div>

          {/* Highlight badge */}
          <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
            <span className="flex items-center gap-2 bg-[#007787] text-white text-xs font-bold px-4 py-2 rounded-full">
              <Star className="w-3.5 h-3.5" /> 1 Partner Per Category Per City
            </span>
            <span className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded-full">
              ₹5–10 Lakhs per city
            </span>
            <span className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded-full">
              Multi-city bundles available
            </span>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {partnerCategories.map((pkg, i) => (
              <div
                key={i}
                className={`rounded-2xl border p-6 flex flex-col transition-all hover:shadow-lg ${
                  pkg.highlight
                    ? "border-[#007787] bg-white shadow-md ring-1 ring-[#007787]/20"
                    : "border-gray-200 bg-white"
                }`}
              >
                {pkg.highlight && (
                  <div className="mb-3">
                    <span className="text-xs font-bold text-white px-3 py-1 rounded-full" style={{ backgroundColor: BRAND_ORANGE }}>
                      High Demand
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#f0fafa" }}>
                    <pkg.icon className="w-5 h-5" style={{ color: BRAND_TEAL }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm leading-snug">{pkg.category}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{pkg.for}</p>
                  </div>
                </div>

                <div className="text-2xl font-bold mb-1" style={{ color: BRAND_TEAL }}>{pkg.price}</div>
                <div className="text-xs text-gray-500 mb-4">{pkg.slots}</div>

                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{pkg.why}</p>

                <div className="space-y-1.5 mb-5">
                  {pkg.perks.map((perk, j) => (
                    <div key={j} className="flex items-start gap-2 text-xs text-gray-600">
                      <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: BRAND_TEAL }} />
                      {perk}
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/919010155595?text=Hi%20Sanjay%2C%20I'm%20interested%20in%20the%20${encodeURIComponent(pkg.category)}%20partnership%20at%20ScaleMe%20Summit`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-2.5 rounded-xl text-sm font-bold border-2 transition-all hover:text-white"
                  style={{
                    borderColor: BRAND_TEAL,
                    color: BRAND_TEAL,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = BRAND_TEAL;
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLElement).style.color = BRAND_TEAL;
                  }}
                >
                  Enquire about this package
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm mb-4">Don't see your category? We'll create a custom package for you.</p>
            <a
              href="mailto:sanjay@scaleme.in?subject=Custom ScaleMe Summit Partnership"
              className="inline-flex items-center gap-2 text-sm font-bold hover:underline"
              style={{ color: BRAND_TEAL }}
            >
              <Mail className="w-4 h-4" />
              Write to sanjay@scaleme.in
            </a>
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ── */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#007787] text-xs font-bold uppercase tracking-widest mb-3">The Long Game</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Summit Is Just<br />
            <span style={{ color: BRAND_TEAL }}>The Entry Point.</span>
          </h2>
          <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Partners who join ScaleMe Summit get embedded in a growing ecosystem that extends
            well beyond event day. Your brand stays with these operators as they scale.
          </p>

          <div className="grid md:grid-cols-3 gap-4 text-left">
            {[
              {
                phase: "Phase 1",
                title: "Summit",
                desc: "4-hour high-intensity executive conclave. 300–500 vetted SME operators per city. Your brand front and centre.",
                color: BRAND_TEAL,
              },
              {
                phase: "Phase 2",
                title: "Accelerator",
                desc: "6-month ISB-CBI backed program. 40–50 summit attendees join an intensive scaling cohort. Partners get ongoing cohort access.",
                color: BRAND_TEAL_LIGHT,
              },
              {
                phase: "Phase 3",
                title: "Alumni Network",
                desc: "1,500+ summit attendees become a lifelong peer community. Quarterly meetups, annual reunion, monthly newsletter. Your brand stays embedded.",
                color: "#1a7a7a",
              },
            ].map((p, i) => (
              <div key={i} className="rounded-2xl p-6 text-white" style={{ backgroundColor: p.color }}>
                <div className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">{p.phase}</div>
                <div className="text-2xl font-bold mb-3">{p.title}</div>
                <p className="text-sm opacity-90 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDIBILITY ── */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#f8fafa]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#007787] text-xs font-bold uppercase tracking-widest mb-3">Who's Behind It</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Built by Operators. Backed by Institution.<br />
              <span style={{ color: BRAND_TEAL }}>Trusted by India's Growth Leaders.</span>
            </h2>
          </div>

          {/* Founder */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-6 grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BRAND_TEAL }}>Founded By</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Sanjay Enishetty</h3>
              <p className="text-gray-500 text-sm font-semibold mb-4">Ex-CEO, Naturals — India's Largest Retail Salon Chain · 20 years in SME Ecosystem</p>
              <blockquote className="border-l-4 pl-4 text-gray-700 italic text-base leading-relaxed" style={{ borderColor: BRAND_TEAL }}>
                "I've lived the ₹50–100 Crore struggle firsthand. ScaleMe exists because I wish
                this forum existed when I was an operator."
              </blockquote>
              <div className="flex gap-4 mt-5">
                <a href="https://wa.me/919010155595" target="_blank" rel="noopener noreferrer"
                  className="text-xs font-bold flex items-center gap-1.5 hover:underline" style={{ color: BRAND_TEAL }}>
                  <Phone className="w-3.5 h-3.5" /> +91 90101 55595
                </a>
                <a href="mailto:sanjay@scaleme.in"
                  className="text-xs font-bold flex items-center gap-1.5 hover:underline" style={{ color: BRAND_TEAL }}>
                  <Mail className="w-3.5 h-3.5" /> sanjay@scaleme.in
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/assets/sanjay_ennisetty.png"
                alt="Sanjay Enishetty"
                className="w-40 h-40 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>

          {/* Advisors */}
          <div className="grid md:grid-cols-3 gap-4">
            {advisors.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="mb-3">
                  {a.img && (
                    <img src={a.img} alt={a.name} className="w-14 h-14 object-cover rounded-xl mb-3" />
                  )}
                  <h4 className="font-bold text-gray-900 text-sm">{a.name}</h4>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: BRAND_TEAL }}>{a.title}</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>

          {/* Partners badge */}
          <div className="mt-8 flex items-center justify-center gap-6 flex-wrap">
            <span className="text-sm text-gray-500 font-semibold">In Collaboration With</span>
            <img src="/assets/isb-logo.png" alt="ISB Centre for Business Innovation" className="h-10 w-auto" />
            <div className="w-px h-8 bg-gray-200 hidden sm:block" />
            <img src="/assets/nse-emerge-logo.png" alt="NSE Emerge" className="h-10 w-auto" />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-[#007787]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Let's Scale Together.
          </h2>
          <p className="text-[#c5e8eb] text-lg mb-4 leading-relaxed">
            We're not building an event. We're building the platform that scales India's next
            1,000 companies from ₹25 Crore to ₹500 Crore.
          </p>
          <p className="text-[#a8dde3] text-base mb-10">
            Your brand can be part of this story — or watch from the sideline.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919010155595?text=Hi%20Sanjay%2C%20I'm%20interested%20in%20partnering%20with%20ScaleMe%20Summit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all hover:opacity-90 shadow-lg"
              style={{ backgroundColor: BRAND_ORANGE }}
            >
              <Phone className="w-5 h-5" />
              Talk to Sanjay on WhatsApp
            </a>
            <a
              href="mailto:sanjay@scaleme.in?subject=ScaleMe Summit Partnership Enquiry"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold bg-white/10 border-2 border-white text-white hover:bg-white hover:text-[#007787] transition-all"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </a>
          </div>

          <div className="mt-10 pt-8 border-t border-white/20 flex flex-col sm:flex-row gap-4 justify-center text-sm text-[#a8dde3]">
            <span className="flex items-center gap-1.5 justify-center"><Phone className="w-3.5 h-3.5" /> +91 90101 55595</span>
            <span className="flex items-center gap-1.5 justify-center"><Mail className="w-3.5 h-3.5" /> sanjay@scaleme.in</span>
            <span className="flex items-center gap-1.5 justify-center"><Globe className="w-3.5 h-3.5" /> www.scaleme.in</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

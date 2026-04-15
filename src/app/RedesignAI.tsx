import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/redesign-ai.css";

const RAZORPAY_LINK = "https://rzp.io/rzp/ce6486z";
const RAZORPAY_DUO_LINK = "https://rzp.io/rzp/dOZVhZL";

const industries = [
  {
    id: "retail", icon: "🛒", name: "Retail & E-commerce",
    subtitle: "From kirana stores to D2C brands — margins are thin and competition is fierce. AI helps you sell smarter, stock better, and serve faster.",
    useCases: [
      { title: "AI-Powered Inventory & Demand Forecasting", desc: "Stop overstocking or running out. Build an AI system that predicts demand based on seasons, trends, and past sales — so you order exactly what you need." },
      { title: "Automated Customer Engagement", desc: "Deploy AI chatbots that handle product queries, recommend items, and recover abandoned carts on WhatsApp and your website — 24/7, without hiring staff." },
      { title: "Smart Pricing & Promotions", desc: "Let AI analyse competitor pricing, customer behaviour, and margins to suggest optimal pricing and personalised offers that boost conversion." },
    ],
    idealFor: "Retail chain owners, D2C founders, e-commerce managers, store operators",
  },
  {
    id: "manufacturing", icon: "🏭", name: "Manufacturing",
    subtitle: "Production delays, quality issues, and rising costs eat into your margins daily. AI brings predictability and precision to your shop floor.",
    useCases: [
      { title: "Predictive Maintenance & Downtime Prevention", desc: "Build AI models that monitor machine health data and alert you before breakdowns happen — reducing unplanned downtime by up to 40%." },
      { title: "AI Quality Inspection", desc: "Use AI-powered visual inspection to catch defects in real-time on the production line — faster and more consistent than manual QC checks." },
      { title: "Production Planning & Scheduling", desc: "Optimise production schedules using AI that factors in order priorities, machine availability, and raw material stock — maximising throughput." },
    ],
    idealFor: "Factory owners, production managers, quality heads, plant supervisors",
  },
  {
    id: "distribution", icon: "🚚", name: "Distribution & Logistics",
    subtitle: "Managing channels, vendors, and logistics manually is costing you margin. AI fixes the invisible inefficiencies across your supply chain.",
    useCases: [
      { title: "AI-Driven Route & Fleet Optimisation", desc: "Automate delivery route planning using AI that factors in traffic, fuel costs, and delivery windows — cutting logistics costs by 15-25%." },
      { title: "Automated Order & Vendor Management", desc: "Build AI agents that handle order tracking, vendor communications, and demand forecasting — eliminating manual data entry across distribution ops." },
      { title: "Warehouse Intelligence", desc: "Deploy AI for smart warehouse management — from automated stock counting to pick-path optimisation — reducing errors and speeding up fulfilment." },
    ],
    idealFor: "Distributors, logistics company owners, supply chain managers, warehouse operators",
  },
  {
    id: "consulting", icon: "📋", name: "Consulting & Professional Services",
    subtitle: "CA, CS, legal, and advisory firms — your clients expect faster, smarter delivery. AI lets you scale expertise without scaling headcount.",
    useCases: [
      { title: "Automated Client Onboarding & Compliance", desc: "Build AI workflows that handle document collection, KYC verification, and compliance checklists — cutting onboarding time from days to hours." },
      { title: "AI Research & Report Generation", desc: "Deploy AI agents that draft research reports, analyse financial data, and prepare client presentations — so your team focuses on advisory, not grunt work." },
      { title: "Intelligent Document Review", desc: "Use AI to review contracts, legal filings, and regulatory documents in minutes — flagging risks and inconsistencies that take humans hours to find." },
    ],
    idealFor: "CA/CS firms, legal practices, management consultants, advisory firms, tax professionals",
  },
  {
    id: "healthcare", icon: "🏥", name: "Healthcare & Pharma",
    subtitle: "Patient volume is rising, admin is drowning your staff, and compliance is non-negotiable. AI handles the repetitive so your team handles the critical.",
    useCases: [
      { title: "AI-Powered Patient Scheduling & Follow-ups", desc: "Automate appointment booking, reminders, and post-visit follow-ups using AI agents — reducing no-shows and freeing up front-desk staff." },
      { title: "Medical Records & Documentation", desc: "Build AI workflows that transcribe consultations, update patient records, and generate discharge summaries — saving doctors 2+ hours daily." },
      { title: "Pharma Supply Chain & Expiry Management", desc: "Deploy AI to track inventory across locations, flag near-expiry stock, and automate reordering — reducing waste and stockouts in your pharmacy." },
    ],
    idealFor: "Clinic owners, hospital administrators, pharma distributors, diagnostic lab managers",
  },
  {
    id: "realestate", icon: "🏗️", name: "Real Estate & Construction",
    subtitle: "Long sales cycles, project delays, and scattered data across sites. AI helps you close faster, build smarter, and track everything in real time.",
    useCases: [
      { title: "AI Lead Qualification & Nurturing", desc: "Build AI agents that qualify incoming leads, respond instantly on WhatsApp, and nurture prospects with personalised follow-ups — converting more site visits to bookings." },
      { title: "Project Progress & Cost Tracking", desc: "Use AI to consolidate progress reports from multiple sites, flag budget overruns, and predict completion timelines — giving you a real-time dashboard of all projects." },
      { title: "Document & Agreement Automation", desc: "Automate generation of sale agreements, NOCs, and compliance documents using AI — reducing legal back-and-forth and speeding up closures." },
    ],
    idealFor: "Builders, developers, real estate agents, construction project managers, property managers",
  },
  {
    id: "education", icon: "🎓", name: "Education & Training",
    subtitle: "Every student learns differently, but most institutions teach the same way. AI enables personalised learning at scale — without burning out your faculty.",
    useCases: [
      { title: "AI-Powered Personalised Learning", desc: "Build AI tutors that adapt to each student's pace, identify knowledge gaps, and recommend targeted practice — improving outcomes without increasing staff." },
      { title: "Automated Assessment & Feedback", desc: "Deploy AI to grade assignments, generate detailed feedback, and create question banks — freeing up faculty time for high-impact teaching moments." },
      { title: "Student Engagement & Retention", desc: "Use AI to identify at-risk students early, automate parent communications, and optimise course schedules — improving retention and satisfaction scores." },
    ],
    idealFor: "Institute owners, training companies, edtech founders, academic administrators, coaching centres",
  },
];

export default function RedesignAI() {
  const navigate = useNavigate();
  const [navScrolled, setNavScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<"day1" | "day2">("day1");
  const [activeIndustry, setActiveIndustry] = useState("retail");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const seatFillRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Google Analytics for RedesignAI page
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-F2K5RGZ14E";
    document.head.appendChild(script1);
    const script2 = document.createElement("script");
    script2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-F2K5RGZ14E');`;
    document.head.appendChild(script2);
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  // Scroll progress & nav background
  useEffect(() => {
    const onScroll = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setScrollProgress(pct);
      setNavScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fade-in observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    const els = containerRef.current?.querySelectorAll(".fade-up");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Seat progress animation
  useEffect(() => {
    if (!seatFillRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && seatFillRef.current) {
            setTimeout(() => {
              seatFillRef.current!.style.width = "60%";
            }, 400);
          }
        });
      },
      { threshold: 0.3 }
    );
    const wrap = seatFillRef.current.closest(".seat-progress-wrap");
    if (wrap) observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  const toggleFaq = useCallback((index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="redesign-page" ref={containerRef}>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"
        rel="stylesheet"
      />

      {/* Scroll Progress */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Nav */}
      <nav className={navScrolled ? "scrolled" : ""}>
        <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          REDESIGN
          <span>Build &middot; Automate &middot; Scale</span>
        </a>
        <div className="nav-center">
          <div className="date-chip">📅 18–19 April 2026, Hyderabad</div>
          <div className="dot" />
          <span>ISB-CBI Hyderabad</span>
          <div className="dot" />
          <span>50 Seats Only</span>
        </div>
        <button className="nav-cta" onClick={() => navigate("/redesign-ai/intake")}>
          Apply for Your Seat →
        </button>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-glow-2" />
        <div className="hero-content">
          <div className="hero-eyebrow fade-up">
            <span className="badge">18–19 April 2026, Hyderabad</span>
            A 2-Day Hands-On AI Workshop for Indian SMEs
          </div>

          <h1 className="fade-up delay-1">
            Stop Reading<br />About <em>AI.</em><br />Start Building With It.
          </h1>

          <p className="hero-sub fade-up delay-2">
            AI theory won't grow your business. Implementation will.<br />
            In 2 days, you walk out with live systems, not notes.
          </p>

          <div className="hero-meta fade-up delay-3">
            <div className="hero-meta-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              18th &amp; 19th April 2026
            </div>
            <div className="hero-meta-divider" />
            <div className="hero-meta-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              ISB-CBI Campus, Gachibowli
            </div>
            <div className="hero-meta-divider" />
            <div className="hero-meta-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              9:00 AM to 5:00 PM Both Days
            </div>
            <div className="hero-meta-divider" />
            <div className="hero-meta-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Limited to 50 Participants
            </div>
          </div>

          <div className="hero-ctas fade-up delay-3">
            <button className="btn-primary" onClick={() => navigate("/redesign-ai/intake")}>
              Apply for Your Seat →
            </button>
            <button className="btn-secondary" onClick={() => scrollToSection("curriculum")}>
              View the Curriculum
            </button>
          </div>

        </div>
      </section>

      {/* AI Opportunity Section */}
      <section className="section ai-landscape-section">
        <div className="section-inner">
          <span className="section-tag fade-up">The AI shift is here</span>
          <h2 className="section-h2 fade-up delay-1">AI isn't coming. It's already reshaping<br />how businesses compete.</h2>
          <p className="section-sub fade-up delay-2">The companies adopting AI today aren't just saving costs — they're pulling ahead permanently. Here's what the data says.</p>

          <div className="ai-stats-grid fade-up delay-3">
            {[
              { stat: "72%", label: "of Indian SMEs plan to adopt AI by 2027", sub: "But only 8% have started. The gap between intent and action is where opportunity lives." },
              { stat: "25–40%", label: "cost savings within 6 months", sub: "Companies using AI in operations report dramatic efficiency gains — from supply chain to customer support." },
              { stat: "₹2.5L Cr", label: "AI's projected impact on Indian GDP by 2030", sub: "Businesses that don't adopt AI workflows will lose market share to those that do. It's not a question of if — it's when." },
              { stat: "10x", label: "faster execution with AI agents", sub: "Tasks that took teams days — proposals, follow-ups, data analysis — now take minutes. Your competitors already know this." },
            ].map((item, i) => (
              <div className="ai-stat-card" key={i}>
                <div className="ai-stat-number">{item.stat}</div>
                <div className="ai-stat-label">{item.label}</div>
                <p className="ai-stat-sub">{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="ai-landscape-cta fade-up delay-4">
            <p>The question isn't whether AI will transform your industry.<br />It's whether you'll lead the change — or react to it.</p>
            <button className="btn-primary" onClick={() => navigate("/redesign-ai/intake")}>
              Start Building With AI →
            </button>
          </div>
        </div>
      </section>

      {/* Logo Strip */}
      <div className="logo-strip">
        <div className="logo-strip-inner">
          <div className="hosted-label-col">
            <span className="hosted-label">Hosted by</span>
          </div>
          <div className="logo-strip-divider" />
          <div className="logo-partner">
            <img src="/assets/scaleme-logo.png" alt="ScaleMe" className="logo-partner-img" />
            <div className="logo-partner-desc">India's leading community for SME founders and operators</div>
          </div>
          <div className="logo-strip-divider" />
          <div className="logo-partner">
            <img src="/assets/isb-logo.png" alt="ISB-CBI Centre for Business Innovation" className="logo-partner-img" />
            <div className="logo-partner-desc">Knowledge Partner</div>
          </div>
          <div className="logo-strip-divider" />
          <div className="logo-partner">
            <img src="/assets/osmapi-logo.png" alt="osmAPI" className="logo-partner-img" />
            <div className="logo-partner-desc">One Awesome API for everything AI — route to 14+ LLM providers</div>
          </div>
          <div className="logo-strip-divider" />
          <div className="logo-partner">
            <img src="/assets/aicoworkers-logo.png" alt="AICoworkers" className="logo-partner-img" />
            <div className="logo-partner-desc">No-code AI tools built specifically for Indian SME operators</div>
          </div>
        </div>
      </div>

      {/* Co-Partners */}
      <div className="logo-strip copartner-strip">
        <div className="logo-strip-inner">
          <div className="hosted-label-col">
            <span className="hosted-label">Co-Partners</span>
          </div>
          <div className="logo-strip-divider" />
          <div className="logo-partner">
            <img src="/assets/zaggle-logo.png" alt="Zaggle" className="logo-partner-img copartner-logo" />
          </div>
          <div className="logo-strip-divider" />
          <div className="logo-partner">
            <img src="/assets/alliance-pro-logo.png" alt="Alliance Pro" className="logo-partner-img copartner-logo" />
          </div>
          <div className="logo-strip-divider" />
          <div className="logo-partner">
            <img src="/assets/odwen-logo.svg" alt="ODWEN" className="logo-partner-img copartner-logo" />
          </div>
          <div className="logo-strip-divider" />
          <div className="logo-partner">
            <img src="/assets/finteract-logo.png" alt="Finteract AI" className="logo-partner-img copartner-logo" />
          </div>
        </div>
      </div>

      {/* Ecosystem Partners */}
      <div className="logo-strip copartner-strip">
        <div className="logo-strip-inner">
          <div className="hosted-label-col">
            <span className="hosted-label">Ecosystem Partners</span>
          </div>
          <div className="logo-strip-divider" />
          <div className="logo-partner">
            <img src="/assets/heh-logo.png" alt="Hyderabad Entrepreneur Hub" className="logo-partner-img copartner-logo" />
          </div>
          <div className="logo-strip-divider" />
          <div className="logo-partner">
            <img src="/assets/plugin-alliance-logo.png" alt="Plugin Alliance" className="logo-partner-img copartner-logo" />
          </div>
          <div className="logo-strip-divider" />
          <div className="logo-partner">
            <img src="/assets/nse-emerge-logo.png" alt="NSE Emerge" className="logo-partner-img copartner-logo" />
          </div>
          <div className="logo-strip-divider" />
          <div className="logo-partner">
            <img src="/assets/yi-logo.png" alt="Young Indians" className="logo-partner-img copartner-logo" />
          </div>
        </div>
      </div>

      {/* Problem / Solution */}
      <section className="section problem-section" id="about">
        <div className="section-inner">
          <div className="problem-grid">
            <div className="problem-left">
              <span className="section-tag fade-up">The problem</span>
              <h3 className="fade-up delay-1">Is your business actually using AI, or just talking about it?</h3>
              <div className="problem-items">
                {[
                  { title: "Academic lectures give you theories, not tools.", desc: "You leave with notes, not a working system. No one shows you how to wire it into your actual operations." },
                  { title: "Coding bootcamps are built for engineers, not operators.", desc: "You don't need to code. You need to execute. There's a difference, and most workshops miss it." },
                  { title: "Generic webinars sell dreams, not results.", desc: "No one maps AI to your P&L. No one shows you what it'll cost, save, or earn. You leave inspired and lost." },
                ].map((item, i) => (
                  <div className={`problem-item fade-up delay-${i + 1}`} key={i}>
                    <div className="x-icon">✕</div>
                    <div className="problem-item-text">
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="solution-card fade-up delay-2">
              <span className="solution-eyebrow">The fix</span>
              <h3>Enter REDESIGN.</h3>
              <p className="build-sprint">This isn't a seminar. It's a build sprint. In 2 days at ISB-CBI Hyderabad, you'll walk out with systems running, not slides to read later.</p>
              <div className="solution-items">
                {[
                  { title: "Live AI workflows tailored to your operations", desc: "Built during the workshop, for your specific industry context" },
                  { title: "Automation blueprints that cut costs immediately", desc: "From HR to finance to customer support, working systems not templates" },
                  { title: "Scalable AI agents deployable Monday morning", desc: "No coding required. No engineering team. Just you and the tools." },
                  { title: "P&L-focused frameworks for Indian SME realities", desc: "Built around Indian business constraints, not Silicon Valley assumptions" },
                ].map((item, i) => (
                  <div className="solution-item" key={i}>
                    <div className="check-icon">✓</div>
                    <div className="solution-item-text">
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="section benefits-section">
        <div className="section-inner">
          <div className="hero-pills fade-up">
            {[
              { icon: "🤝", title: "Hands-On Execution", desc: "Build real systems, not slides. Leave with working AI workflows." },
              { icon: "⚙️", title: "Automate Operations", desc: "Eliminate repetitive work in HR, finance, sales and ops." },
              { icon: "📈", title: "Scale Revenue", desc: "Deploy AI agents that drive sales while you sleep." },
              { icon: "📊", title: "Monday Morning ROI", desc: "Every session ends with something you can deploy the next business day." },
              { icon: "🌐", title: "AI Peer Network", desc: "Join 49 other SME operators building with AI. An ongoing community, not a one-day event." },
            ].map((pill, i) => (
              <div className="hero-pill" key={i}>
                <div className="hero-pill-icon">{pill.icon}</div>
                <div className="hero-pill-text">
                  <strong>{pill.title}</strong>
                  <span>{pill.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="who-section" id="who">
        <div className="section-inner">
          <span className="section-tag fade-up">Who this is for</span>
          <h2 className="section-h2 fade-up delay-1">Every industry has an AI advantage.<br />Find yours.</h2>
          <p className="section-sub fade-up delay-2">Whether you run a factory floor, manage a retail chain, or advise clients — AI can transform how you operate. This workshop gives you the tools to make it happen, tailored to your industry.</p>

          <div className="industry-tabs fade-up delay-2">
            {industries.map((ind) => (
              <button
                key={ind.id}
                className={`industry-tab${activeIndustry === ind.id ? " active" : ""}`}
                onClick={() => setActiveIndustry(ind.id)}
              >
                <span className="industry-tab-icon">{ind.icon}</span> {ind.name}
              </button>
            ))}
          </div>

          {industries.map((ind) => (
            <div key={ind.id} className={`industry-panel${activeIndustry === ind.id ? " active" : ""} fade-up delay-3`}>
              <div className="industry-panel-header">
                <div className="industry-panel-icon">{ind.icon}</div>
                <div>
                  <h3 className="industry-panel-title">{ind.name}</h3>
                  <p className="industry-panel-subtitle">{ind.subtitle}</p>
                </div>
              </div>
              <div className="industry-panel-grid">
                {ind.useCases.map((uc, j) => (
                  <div className="industry-usecase" key={j}>
                    <div className="industry-usecase-label">Use Case</div>
                    <div className="industry-usecase-title">{uc.title}</div>
                    <p className="industry-usecase-desc">{uc.desc}</p>
                  </div>
                ))}
              </div>
              <div className="industry-panel-cta">
                <span className="industry-panel-who">Ideal for:</span> {ind.idealFor}
              </div>
            </div>
          ))}

          <div className="industry-bottom fade-up">
            <p className="industry-bottom-text">Don't see your industry? This workshop teaches <strong>frameworks, not formulas</strong>. The AI skills you build here apply to any business. <a href="#" className="industry-bottom-link" onClick={(e) => { e.preventDefault(); navigate("/redesign-ai/intake"); }}>Apply for your seat →</a></p>
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="section pillars-section">
        <div className="section-inner">
          <span className="section-tag fade-up">The framework</span>
          <h2 className="section-h2 fade-up delay-1">Build AI into your business in 3 steps. No tech team needed.</h2>
          <p className="section-sub fade-up delay-2">The same operator playbook used by 200+ Indian SMEs across manufacturing, retail, services and distribution. Not theory, a repeatable system any business owner can run.</p>

          <div className="pillars-grid">
            {[
              { num: "01", icon: "🔧", title: "Build.", desc: "Create intelligent workflows specific to your industry. No cookie-cutter templates, just systems that actually match how your business runs, with no-code and low-code tools any operator can use.", stat: "⚡ Day 1 deliverable" },
              { num: "02", icon: "⚙️", title: "Automate.", desc: "Cut administrative overhead in operations, HR, and finance. Reclaim 20+ hours per week with intelligent automation of tasks you're currently doing manually every single day.", stat: "⏱️ 20+ hrs/week saved" },
              { num: "03", icon: "📈", title: "Scale.", desc: "Supercharge your marketing and sales pipeline with autonomous AI agents. Drive revenue while reducing manual effort, so growth doesn't require proportional headcount growth.", stat: "📊 Revenue while you sleep" },
            ].map((pillar, i) => (
              <div className={`pillar-card fade-up delay-${i + 1}`} key={i}>
                <div className="pillar-num">{pillar.num}</div>
                <div className="pillar-icon-wrap">{pillar.icon}</div>
                <div className="pillar-title">{pillar.title}</div>
                <div className="pillar-desc">{pillar.desc}</div>
                <div className="pillar-stat">{pillar.stat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="speaker-section" id="faculty">
        <div className="section-inner">
          <span className="section-tag fade-up">Faculty</span>
          <h2 className="section-h2 fade-up delay-1">Learn from practitioners, not from theorists.</h2>
          <p className="section-sub fade-up delay-2">3 to 4 faculty across ISB-CBI academia, AI implementation, and Indian SME operations. Theory in the morning, hands-on build sessions in the afternoon.</p>

          <div className="faculty-grid fade-up delay-2">
            <div className="faculty-card">
              <div className="faculty-avatar-wrap">
                <img src="/assets/shankar-prakash.jpg" alt="Prof. Shankar Prakash" className="faculty-avatar-img" />
              </div>
              <div className="faculty-info">
                <div className="faculty-name">Prof. Shankar Prakash</div>
                <div className="faculty-role">Visiting Faculty, ISB-CBI &amp; Adjunct Faculty, IIM Udaipur</div>
                <div className="faculty-bio">Opens the workshop with a strategic AI masterclass built for Indian business leaders. Brings deep academic rigour from ISB-CBI and IIM combined with a sharp focus on practical, implementation-ready frameworks that SME operators can act on immediately.</div>
                <div className="faculty-tags">
                  <span className="speaker-tag">AI Strategy</span>
                  <span className="speaker-tag">ISB-CBI Faculty</span>
                  <span className="speaker-tag">Emerging Markets</span>
                </div>
              </div>
            </div>

            <div className="faculty-card">
              <div className="faculty-avatar-wrap">
                <img src="/assets/venkatesh-rajendran.png" alt="Venkatesh Rajendran" className="faculty-avatar-img" />
              </div>
              <div className="faculty-info">
                <div className="faculty-name">Venkatesh Rajendran</div>
                <div className="faculty-role">Founder, osmAPI &amp; Simbli.ai | CEO, Dot Com Infoway | Co-Founder, Magzter</div>
                <div className="faculty-bio">Serial entrepreneur with 26+ years of global experience across 60+ countries. Founder of osmAPI, India's first unified LLM gateway, and Simbli.ai, an AI agentic platform for business automation. Brings deep expertise in turning AI from theory into practical, revenue-driving systems for operators.</div>
                <div className="faculty-tags">
                  <span className="speaker-tag">AI Infrastructure</span>
                  <span className="speaker-tag">Business Automation</span>
                  <span className="speaker-tag">Entrepreneurship</span>
                </div>
              </div>
            </div>

            <div className="faculty-card">
              <div className="faculty-avatar-wrap">
                <img src="/assets/ravi-tanneru.png" alt="Ravi Tanneru" className="faculty-avatar-img" />
              </div>
              <div className="faculty-info">
                <div className="faculty-name">Ravi Tanneru</div>
                <div className="faculty-role">Founder &amp; CEO, ProFinTech (FinteractAI) | Ex-Deutsche Bank, Bank of America, Citibank</div>
                <div className="faculty-bio">25+ years in banking and enterprise finance across Citibank, Deutsche Bank, Bank of America and Standard Chartered. Now building FinteractAI — the world's first Agentic-AI Co-Pilot for business leaders. Leads the module on building your AI CFO and how AI is transforming the future of work across finance, operations and strategic decision-making. 100+ enterprise customers across India and the US.</div>
                <div className="faculty-tags">
                  <span className="speaker-tag">AI for Finance</span>
                  <span className="speaker-tag">Enterprise AI</span>
                  <span className="speaker-tag">Future of Work</span>
                </div>
              </div>
            </div>

            <div className="faculty-card">
              <div className="faculty-avatar-wrap">
                <img src="/assets/abhishek-ekbote.png" alt="Abhishek Ekbote" className="faculty-avatar-img" />
              </div>
              <div className="faculty-info">
                <div className="faculty-name">Abhishek Ekbote</div>
                <div className="faculty-role">Co-Founder, Reclips AI | Serial Entrepreneur | Ex-Founder, VideoForm &amp; GreyMetrics (Acquired)</div>
                <div className="faculty-bio">Serial entrepreneur and marketer who's built multiple SaaS products from zero. Co-founder of Reclips AI, a platform for AI-powered content creation. Specialises in helping businesses create effective marketing content using AI tools — from product videos to social media at scale. All participants get access to the Reclips platform.</div>
                <div className="faculty-tags">
                  <span className="speaker-tag">AI Content Creation</span>
                  <span className="speaker-tag">Marketing</span>
                  <span className="speaker-tag">SaaS</span>
                </div>
              </div>
            </div>

            <div className="faculty-card">
              <div className="faculty-avatar-wrap">
                <img src="/assets/arjun-reddy.jpeg" alt="Arjun Reddy" className="faculty-avatar-img" />
              </div>
              <div className="faculty-info">
                <div className="faculty-name">Arjun Reddy</div>
                <div className="faculty-role">Serial Entrepreneur &amp; AI Systems Architect · Founder of osmAPI, VibeStudio, GuardianLink</div>
                <div className="faculty-bio">Builder of AI systems that scale. From GuardianLink's $12M Series A to VibeStudio's THRIFT pruning breakthrough (55% model-size reduction), Arjun has architected infrastructure at every frontier of the stack. His ventures have been featured at TechCrunch Disrupt and acquired by global players. Leads the hands-on build sessions — turning AI concepts into working systems you can deploy on Day 2.</div>
                <div className="faculty-tags">
                  <span className="speaker-tag">AI Architecture</span>
                  <span className="speaker-tag">Agentic Systems</span>
                  <span className="speaker-tag">Serial Entrepreneur</span>
                  <span className="speaker-tag">Sovereign AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="section curriculum-section" id="curriculum">
        <div className="section-inner">
          <span className="section-tag fade-up">The curriculum</span>
          <h2 className="section-h2 fade-up delay-1">The Weekend That Transforms Your Business</h2>
          <p className="section-sub fade-up delay-2">A comprehensive, hands-on curriculum designed for immediate implementation, not notes that sit in a folder.</p>

          <div style={{ marginTop: 40 }} className="fade-up delay-2">
            <div className="curriculum-tabs">
              <button className={`tab-btn ${activeTab === "day1" ? "active" : ""}`} onClick={() => setActiveTab("day1")}>Day 1: AI as a Growth Engine</button>
              <button className={`tab-btn ${activeTab === "day2" ? "active" : ""}`} onClick={() => setActiveTab("day2")}>Day 2: Build, Automate, Scale</button>
            </div>

            <div className={`tab-content ${activeTab === "day1" ? "active" : ""}`}>
              <div className="curriculum-sessions">
                {[
                  { name: "Strategic AI Masterclass", desc: "Reframe your business through an AI-first lens. Understand how AI redesigns value chains, cost structures, and competitive advantage. Learn frameworks to identify high-leverage AI opportunities and operate like an AI-native company.", handsOn: false },
                  { name: "AI CFO / Decision Intelligence (Demo + Q&A)", desc: "Live demonstration of AI-powered financial decision systems. See how AI can analyse costs, simulate scenarios, and generate insights. Followed by interactive Q&A to clarify real-world applications.", handsOn: false },
                  { name: "AI Content Creation at Scale (Demo + Q&A)", desc: "Live demonstration of AI-driven content systems. See how to generate, repurpose, and distribute multilingual content at scale. Followed by Q&A to explore use cases and implementation nuances.", handsOn: false },
                  { name: "Marketing — Getting Found & Remembered", desc: "Build an AI-driven marketing engine end-to-end using agentic workflows. Create systems for content generation, distribution, lead capture, and analytics that run continuously with minimal manual effort.", handsOn: true },
                  { name: "Sales — Cold Calls, Qualification & Booking", desc: "Build an AI-powered sales pipeline with voice and chat agents. Design workflows for outreach, lead qualification, and appointment booking focused on high-intent prospects.", handsOn: true },
                  { name: "Revenue System Integration", desc: "Connect marketing and sales workflows into a unified revenue system. Map lead flow, define conversion stages, and build visibility into pipeline and revenue projections.", handsOn: true },
                ].map((session, i) => (
                  <div className="session-item" key={i}>
                    <div className="session-name">{session.handsOn && <span className="hands-on-dot" />}{session.name}</div>
                    <div className="session-desc">{session.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`tab-content ${activeTab === "day2" ? "active" : ""}`}>
              <div className="curriculum-sessions">
                {[
                  { name: "Tech Strategy & Product Development", desc: "Build your AI \"supply chain\" using agentic workflows. Select models, orchestrate tools, and create functional product prototypes without traditional coding.", handsOn: true },
                  { name: "Customer Support That Runs Itself", desc: "Build a 24/7 multilingual support system. Design agentic workflows for automated responses, ticket handling, and insight generation.", handsOn: true },
                  { name: "Scaling — Unit Economics & Growth Systems", desc: "Build systems to track costs, margins, and growth drivers. Model AI-native unit economics and create workflows that enable scalable, efficient growth.", handsOn: true },
                  { name: "90-Day Execution Plan (Debrief)", desc: "Consolidate all learnings into a clear execution narrative. Align on priorities, identify risks, and define next steps to implement and scale AI-driven systems post-workshop.", handsOn: false },
                ].map((session, i) => (
                  <div className="session-item" key={i}>
                    <div className="session-name">{session.handsOn && <span className="hands-on-dot" />}{session.name}</div>
                    <div className="session-desc">{session.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hands-on-legend">
              <span className="hands-on-dot" /> Hands-on Agentic Workflow Build
            </div>
          </div>
        </div>
      </section>
      {/* ISB-CBI Endorsement */}
      <section className="section testimonials-section">
        <div className="section-inner">
          <div className="isb-endorsement fade-up delay-3">
            <div className="isb-endorsement-icon">🏛️</div>
            <div>
              <div className="isb-endorsement-label">ISB-CBI Centre for Business Innovation</div>
              <p className="isb-endorsement-quote">"The REDESIGN workshop represents exactly the kind of practical, operator-focused AI education that Indian SMEs have been waiting for. We're proud to host this cohort on the ISB-CBI campus."</p>
              <div className="isb-endorsement-source">
                Anvesh T — Associate Director,&nbsp;
                <img src="/assets/isb-logo.png" alt="ISB-CBI" style={{ height: 20, verticalAlign: "middle", display: "inline-block" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section pricing-section" id="pricing">
        <div className="section-inner">
          <span className="section-tag fade-up">Reserve your seat</span>
          <h2 className="section-h2 fade-up delay-1">Secure Your Seat in the April Cohort</h2>
          <p className="section-sub fade-up delay-2">50 seats to ensure every participant gets hands-on support and personalised feedback. Join us on 18th &amp; 19th April 2026 at ISB-CBI Hyderabad.</p>

          {/* 3 Pricing Cards */}
          <div className="pack-cards-row fade-up delay-1">
            {/* Solo */}
            <div className="pack-card">
              <div className="pack-name">Solo</div>
              <div className="pack-people">1 person</div>
              <div className="pack-price">₹39,000<span> + GST</span></div>
              <div className="pack-per">Per person</div>
              <div className="pack-saving-spacer" />
              <button className="pack-cta" onClick={() => navigate("/redesign-ai/intake")}>Apply for Your Seat →</button>
            </div>
            {/* Duo */}
            <div className="pack-card">
              <div className="pack-name">Duo</div>
              <div className="pack-people">2 people</div>
              <div className="pack-price">₹70,000<span> + GST</span></div>
              <div className="pack-per">₹35,000 per person</div>
              <div className="pack-saving">Save ₹4,000 per person</div>
              <button className="pack-cta" onClick={() => window.open(RAZORPAY_DUO_LINK, "_blank")}>Register as Duo →</button>
            </div>
            {/* Trio */}
            <div className="pack-card pack-card--featured">
              <div className="pack-best">⭐ Best Value</div>
              <div className="pack-name">Trio</div>
              <div className="pack-people">3 people</div>
              <div className="pack-price">₹90,000<span> + GST</span></div>
              <div className="pack-per">₹30,000 per person</div>
              <div className="pack-saving">Save ₹9,000/person — back to early bird price</div>
              <button className="pack-cta" onClick={() => navigate("/redesign-ai/intake")}>Register as Trio →</button>
            </div>
          </div>

          {/* Co-Brand — Prominent Card */}
          <div className="cobrand-prominent fade-up delay-2">
            <div className="cobrand-prominent-left">
              <div className="cobrand-prominent-eyebrow">🤝 Co-Brand Partner Slot — Limited Availability</div>
              <h3 className="cobrand-prominent-title">Brand the Workshop.<br />Educate Your Best Clients.</h3>
              <p className="cobrand-prominent-desc">Put your brand on REDESIGN-ai and send your top SME Customers, Channel Partners, or Franchisees to one of the most forward-thinking AI workshops in India. They learn. You lead.</p>
              <div className="cobrand-prominent-pills">
                <span className="cobrand-pill">✓ 5 seats included</span>
                <span className="cobrand-pill">✓ Your logo on all event collateral</span>
                <span className="cobrand-pill">✓ Brand mention throughout the workshop</span>
                <span className="cobrand-pill">✓ Co-branded certificate for participants</span>
              </div>
            </div>
            <div className="cobrand-prominent-right">
              <div className="cobrand-prominent-price-label">Investment</div>
              <div className="cobrand-prominent-price">₹1,35,000</div>
              <div className="cobrand-prominent-price-sub">+ GST &nbsp;·&nbsp; 5 seats</div>
              <div className="cobrand-prominent-per">₹27,000 per seat — best rate on the page</div>
              <a
                href="https://wa.me/919010155595?text=Hi%20Sanjay%2C%20I%27m%20interested%20in%20the%20Co-Brand%20Partner%20slot%20for%20REDESIGN-ai.%20Please%20share%20more%20details."
                className="cobrand-prominent-cta"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Talk to us →
              </a>
              <div className="cobrand-prominent-note">We'll send you a full partnership deck within 24 hours.</div>
            </div>
          </div>

          {/* Shared Details */}
          <div className="pricing-details fade-up delay-3">
            <div className="pricing-details-left">
              <div className="osmapi-bonus osmapi-bonus--light">
                <span className="osmapi-bonus-icon">🎁</span>
                <span className="osmapi-bonus-text osmapi-bonus-text--dark">Bonus: ₹20,000 worth of <strong>osmAPI</strong> credits included free with every registration</span>
              </div>
              <div className="seat-progress-wrap" style={{ marginTop: 20 }}>
                <div className="seat-progress-label">
                  <span>50 total seats</span>
                  <span className="seats-left">20 seats left</span>
                </div>
                <div className="seat-progress-bar">
                  <div className="seat-progress-fill" ref={seatFillRef} />
                </div>
              </div>
              <div className="urgency-block" style={{ marginTop: 20 }}>
                <div className="urgency-icon">🔥</div>
                <div className="urgency-text">
                  <strong>Early Bird ₹30,000 seats are sold out</strong>
                  <span>Remaining seats at ₹39,000 — or bring colleagues to save more.</span>
                </div>
              </div>
            </div>
            <div className="pricing-details-right">
              <div className="includes-label">What's included in every seat</div>
              <ul className="includes-list includes-list--light">
                <li>2 full days of intensive, hands-on AI training at ISB-CBI Hyderabad</li>
                <li>Opening masterclass by ISB-CBI Faculty on Strategic AI Frameworks</li>
                <li>Build working AI workflows, automation systems, and sales agents</li>
                <li>Personalised feedback and troubleshooting from expert instructors</li>
                <li>Comprehensive workshop materials and implementation templates</li>
                <li>Your personalised 90-day AI action plan</li>
                <li>Post-workshop support for 90 days via the AI Collective</li>
                <li>Networking with 49 other ambitious Indian SME operators</li>
                <li>₹20,000 worth of osmAPI platform credits to power your AI workflows</li>
              </ul>
            </div>
          </div>

          {/* ROI Strip */}
          <div className="roi-strip fade-up delay-2">
            <div className="roi-strip-label">🧮 What this would cost you otherwise</div>
            <div className="roi-strip-items">
              <div className="roi-strip-item"><span>AI consultant (2 days)</span><span className="roi-strip-val">₹40,000</span></div>
              <div className="roi-strip-item"><span>No-code automation setup</span><span className="roi-strip-val">₹30,000+</span></div>
              <div className="roi-strip-item"><span>90-day post-support</span><span className="roi-strip-val">₹30,000</span></div>
              <div className="roi-strip-item roi-strip-item--total"><span>Equivalent market value</span><span className="roi-strip-val">₹1,00,000+</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section" id="faq">
        <div className="section-inner">
          <span className="section-tag fade-up">FAQs</span>
          <h2 className="section-h2 fade-up delay-1">Everything you need to know.</h2>
          <p className="section-sub fade-up delay-2">Straight answers to the questions we get most.</p>

          <div className="faq-grid fade-up delay-2">
            {[
              { q: "Do I need to know how to code?", a: "No coding required, at any point. This workshop is designed specifically for business operators, owners, managers, and distributors who have zero engineering background. Every tool we teach is no-code or low-code, built for people who run businesses, not software teams." },
              { q: "Is this only for tech companies?", a: "The opposite. This is built specifically for non-tech SMEs, including manufacturing, retail, distribution, professional services, food & beverages, logistics. Tech companies already have engineering teams for this. The gap is in traditional Indian businesses, and that's exactly who we built this for." },
              { q: "What size business is this designed for?", a: "Typically businesses with 5 to 500 employees and annual revenues between ₹50 lakhs and ₹100 crores. The frameworks and tools are calibrated for this range, not enterprise-scale, and not solo freelancers. If you're running a real operation with real team and real costs, this is built for you." },
              { q: "Can I bring my team or employees?", a: "Yes, and we encourage it. Coming as a team means you can divide and build simultaneously. One person builds the sales agent while another works on HR automation. Team registrations of 3+ get priority on seat allocation. Contact us for group pricing." },
              { q: "What if I can't attend both days?", a: "We strongly recommend attending both days. The curriculum builds on itself and Day 2 requires the systems built on Day 1. If an unavoidable conflict arises, contact us and we'll do our best to accommodate you in a future cohort at no extra charge." },
              { q: "Will I get ongoing support after the workshop?", a: "Yes. Every participant gets 90-day post-workshop access to expert instructors through the AI Collective, a private community of REDESIGN alumni. You can ask questions, share progress, get code reviews, and access updated templates as new AI tools emerge." },
              { q: "What do I need to bring?", a: "Just a laptop. All software is browser-based and free-tier accessible. We'll send you a pre-workshop setup guide 5 days before the event, it takes about 30 minutes to complete and ensures you hit the ground running on Day 1." },
              { q: "How do I know this is worth it?", a: "Fair question. We ran preview sessions with 40+ SME operators across Hyderabad, Pune, and Mumbai to test every session before building this cohort. The testimonials on this page are from those sessions. Plus, every session has been tested with real SME operators before we built this cohort." },
            ].map((faq, i) => (
              <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={i}>
                <button className="faq-question" onClick={() => toggleFaq(i)}>
                  {faq.q}
                  <span className="faq-chevron">▾</span>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-inner">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-brand-name">REDESIGN</div>
              <div className="footer-brand-tagline">Build &middot; Automate &middot; Scale</div>
              <div className="footer-brand-desc">The premier AI workshop for Indian SME owners, distributors and employees. Build, automate, and scale your business with hands-on AI training at ISB-CBI Hyderabad.</div>
            </div>
            <div>
              <div className="footer-col-title">Contact</div>
              <ul className="footer-col-items">
                <li>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  sme@scaleme.in
                </li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Workshop Details</div>
              <ul className="footer-col-items">
                <li>📅 18th &amp; 19th April 2026</li>
                <li>🕘 9:00 AM – 5:00 PM (Both Days)</li>
                <li>🏛️ Indian School of Business, Gachibowli, Hyderabad</li>
                <li>👥 Limited to 50 Participants</li>
                <li>🏆 For Indian SME Operators</li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Quick Links</div>
              <ul className="footer-col-items">
                <li><a href="#who" onClick={(e) => { e.preventDefault(); scrollToSection("who"); }}>Who is this for</a></li>
                <li><a href="#curriculum" onClick={(e) => { e.preventDefault(); scrollToSection("curriculum"); }}>Curriculum</a></li>
                <li><a href="#faculty" onClick={(e) => { e.preventDefault(); scrollToSection("faculty"); }}>Faculty</a></li>
                <li><a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection("testimonials"); }}>Testimonials</a></li>
                <li><a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection("pricing"); }}>Pricing</a></li>
                <li><a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection("faq"); }}>FAQs</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-partners">
            <div className="footer-partners-label">Partners</div>
            <div className="footer-partners-logos">
              <img src="/assets/zaggle-logo.png" alt="Zaggle" className="footer-partner-logo" />
              <img src="/assets/alliance-pro-logo.png" alt="Alliance Pro" className="footer-partner-logo" />
              <img src="/assets/odwen-logo.svg" alt="ODWEN" className="footer-partner-logo" />
              <img src="/assets/finteract-logo.png" alt="Finteract" className="footer-partner-logo" />
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">&copy; 2026 Redesign Workshop. All rights reserved.</div>
            <div className="footer-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms &amp; Conditions</Link>
              <a href="#">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useEffect, useRef, useState, useCallback, FormEvent } from "react";
import { Link } from "react-router-dom";
import "../styles/redesign-ai.css";

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
  const [navScrolled, setNavScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndustry, setActiveIndustry] = useState("retail");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isWaitlistLoading, setIsWaitlistLoading] = useState(false);
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [waitlistData, setWaitlistData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    industry: '',
  });
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

  const toggleFaq = useCallback((index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWaitlistChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setWaitlistData(prev => ({ ...prev, [name]: value }));
  };

  const handleWaitlistSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsWaitlistLoading(true);
    try {
      const res = await fetch("/api/submit-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(waitlistData),
      });
      if (!res.ok) throw new Error("API failed");
      setIsWaitlistLoading(false);
      setWaitlistSubmitted(true);
    } catch {
      setIsWaitlistLoading(false);
      alert("Submission failed. Please try again.");
    }
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
        <button className="nav-cta" onClick={() => scrollToSection("redesign-waitlist")}>
          Register for Next Cohort →
        </button>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-glow-2" />
        <div className="hero-content">
          <div className="hero-eyebrow fade-up">
            <span className="badge">Cohort 1 Complete — Cohort 2 Coming Soon</span>
            Learn AI by building
          </div>

          <h1 className="fade-up delay-1">
            Stop Reading<br />About <em>AI.</em><br />Start Building With It.
          </h1>

          <p className="hero-sub fade-up delay-2">
            AI theory won't grow your business. Implementation will.
          </p>

          <div className="hero-ctas fade-up delay-3">
            <button className="btn-primary" onClick={() => scrollToSection("redesign-waitlist")}>
              Register for Next Cohort →
            </button>
            <button className="btn-secondary" onClick={() => scrollToSection("about")}>
              Learn More ↓
            </button>
          </div>
        </div>
      </section>

      {/* Logo Strip — Hosted By */}
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
        </div>
      </div>

      {/* Cohort 1 Highlights */}
      <section className="section" id="cohort1" style={{ background: "#0a1628" }}>
        <div className="section-inner">
          <span className="section-tag fade-up" style={{ color: "#5eead4" }}>Cohort 1 — April 2026</span>
          <h2 className="section-h2 fade-up delay-1" style={{ color: "#fff" }}>The first cohort is done.<br />Here's what was built.</h2>
          <p className="section-sub fade-up delay-2" style={{ color: "#94a3b8" }}>
            50 Indian SME operators. 2 days at ISB-CBI Hyderabad. 6 sessions across AI strategy, automation, finance, marketing, content and agentic building. Every participant left with live systems — not slides.
          </p>

          <div className="ai-stats-grid fade-up delay-3">
            {[
              { stat: "50", label: "Founders & operators attended", sub: "From manufacturing, retail, distribution, consulting, healthcare and real estate across India." },
              { stat: "6", label: "Sessions across 2 days", sub: "AI strategy, automation, AI CFO, content, marketing systems, and hands-on agentic building." },
              { stat: "2 Days", label: "Intensive hands-on build sprint", sub: "Hosted at ISB-CBI Campus, Gachibowli, Hyderabad — India's premier business innovation centre." },
              { stat: "Day 1+", label: "Deployable AI systems built live", sub: "Every participant built real workflows during the workshop — not templates. Working AI, ready to run." },
            ].map((item, i) => (
              <div className="ai-stat-card" key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="ai-stat-number" style={{ color: "#5eead4" }}>{item.stat}</div>
                <div className="ai-stat-label" style={{ color: "#e2e8f0" }}>{item.label}</div>
                <p className="ai-stat-sub" style={{ color: "#94a3b8" }}>{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="ai-landscape-cta fade-up delay-4">
            <p style={{ color: "#cbd5e1" }}>Missed Cohort 1? <strong style={{ color: "#fff" }}>Cohort 2 is being planned.</strong><br />Register your interest now and get first access before public announcements.</p>
            <button className="btn-primary" onClick={() => scrollToSection("redesign-waitlist")}>
              Register for Next Cohort →
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
            <button className="btn-primary" onClick={() => scrollToSection("redesign-waitlist")}>
              Register for Next Cohort →
            </button>
          </div>
        </div>
      </section>

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
                  { title: "Coding bootcamps are built for engineers, not operators.", desc: "You don't need to code. You need to execute. There's a difference, and most programs miss it." },
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
                  { title: "Live AI workflows tailored to your operations", desc: "Built during the cohort, for your specific industry context" },
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
              { icon: "🌐", title: "AI Peer Network", desc: "Join other SME operators building with AI. An ongoing community, not a one-day event." },
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
          <p className="section-sub fade-up delay-2">Whether you run a factory floor, manage a retail chain, or advise clients — AI can transform how you operate. This program gives you the tools to make it happen, tailored to your industry.</p>

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
            <p className="industry-bottom-text">Don't see your industry? REDESIGN teaches <strong>frameworks, not formulas</strong>. The AI skills you build here apply to any business. <a href="#redesign-waitlist" className="industry-bottom-link" onClick={(e) => { e.preventDefault(); scrollToSection("redesign-waitlist"); }}>Register for the next cohort →</a></p>
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="section pillars-section">
        <div className="section-inner">
          <span className="section-tag fade-up">The framework</span>
          <h2 className="section-h2 fade-up delay-1">Build AI into your business in 3 steps. No tech team needed.</h2>
          <p className="section-sub fade-up delay-2">The same operator playbook used by Indian SMEs across manufacturing, retail, services and distribution. Not theory — a repeatable system any business owner can run.</p>

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

      {/* ISB-CBI Endorsement */}
      <section className="section testimonials-section">
        <div className="section-inner">
          <div className="isb-endorsement fade-up delay-3">
            <div className="isb-endorsement-icon">🏛️</div>
            <div>
              <div className="isb-endorsement-label">ISB-CBI Centre for Business Innovation</div>
              <p className="isb-endorsement-quote">"REDESIGN represents exactly the kind of practical, operator-focused AI education that Indian SMEs have been waiting for. We're proud to host this cohort on the ISB-CBI campus."</p>
              <div className="isb-endorsement-source">
                Anvesh T — Associate Director,&nbsp;
                <img src="/assets/isb-logo.png" alt="ISB-CBI" style={{ height: 20, verticalAlign: "middle", display: "inline-block" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Cohort Waitlist */}
      <section className="section redesign-waitlist-section" id="redesign-waitlist">
        <div className="section-inner" style={{ maxWidth: 640 }}>
          <span className="section-tag fade-up">Next Cohort</span>
          <h2 className="section-h2 fade-up delay-1">Register for the Next Cohort</h2>
          <p className="section-sub fade-up delay-2">
            Cohort 2 is being planned. Leave your details and we'll reach out the moment seats open — before public announcements.
          </p>

          {waitlistSubmitted ? (
            <div className="waitlist-success">
              <div className="waitlist-success-icon">✓</div>
              <h3>You're on the list!</h3>
              <p>We'll reach out as soon as the next REDESIGN-ai cohort opens. Keep building.</p>
            </div>
          ) : (
            <form className="waitlist-form" onSubmit={handleWaitlistSubmit}>
              <div className="waitlist-form-row">
                <div className="waitlist-field">
                  <label>Full Name *</label>
                  <input type="text" name="fullName" required value={waitlistData.fullName} onChange={handleWaitlistChange} placeholder="Your full name" />
                </div>
                <div className="waitlist-field">
                  <label>Phone *</label>
                  <input type="tel" name="phone" required value={waitlistData.phone} onChange={handleWaitlistChange} placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
              <div className="waitlist-field">
                <label>Email *</label>
                <input type="email" name="email" required value={waitlistData.email} onChange={handleWaitlistChange} placeholder="you@company.com" />
              </div>
              <div className="waitlist-form-row">
                <div className="waitlist-field">
                  <label>Company Name *</label>
                  <input type="text" name="companyName" required value={waitlistData.companyName} onChange={handleWaitlistChange} placeholder="Your company" />
                </div>
                <div className="waitlist-field">
                  <label>Industry</label>
                  <select name="industry" value={waitlistData.industry} onChange={handleWaitlistChange}>
                    <option value="">Select industry</option>
                    <option>Retail & E-commerce</option>
                    <option>Manufacturing</option>
                    <option>Distribution & Logistics</option>
                    <option>Consulting & Professional Services</option>
                    <option>Healthcare & Pharma</option>
                    <option>Real Estate & Construction</option>
                    <option>Education & Training</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="waitlist-submit-btn" disabled={isWaitlistLoading}>
                {isWaitlistLoading ? 'Submitting...' : 'Register for Next Cohort →'}
              </button>
            </form>
          )}
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
              { q: "Do I need to know how to code?", a: "No coding required, at any point. REDESIGN is designed specifically for business operators, owners, managers, and distributors who have zero engineering background. Every tool we teach is no-code or low-code, built for people who run businesses, not software teams." },
              { q: "Is this only for tech companies?", a: "The opposite. This is built specifically for non-tech SMEs, including manufacturing, retail, distribution, professional services, food & beverages, logistics. Tech companies already have engineering teams for this. The gap is in traditional Indian businesses, and that's exactly who we built this for." },
              { q: "What size business is this designed for?", a: "Typically businesses with 5 to 500 employees and annual revenues between ₹50 lakhs and ₹100 crores. The frameworks and tools are calibrated for this range, not enterprise-scale, and not solo freelancers. If you're running a real operation with real team and real costs, this is built for you." },
              { q: "Can I bring my team or employees?", a: "Yes, and we encourage it. Coming as a team means you can divide and build simultaneously. One person builds the sales agent while another works on HR automation. Contact us for group pricing and availability." },
              { q: "What will I actually build?", a: "Live AI workflows tailored to your business context. Depending on your industry, this includes marketing and sales automation agents, AI-powered customer support systems, financial decision dashboards, content generation pipelines, and agentic workflows — all built hands-on, no coding required." },
              { q: "Will I get ongoing support after the cohort?", a: "Yes. Every participant gets 90-day access to expert instructors through the AI Collective, a private community of REDESIGN alumni. You can ask questions, share progress, get code reviews, and access updated templates as new AI tools emerge." },
              { q: "When is the next cohort?", a: "Cohort 2 dates are being finalised. Register your interest now and you'll be the first to know — before we announce publicly. Seats are limited to 50 participants per cohort." },
              { q: "What do I need to bring?", a: "Just a laptop. All software is browser-based and free-tier accessible. We'll send you a pre-cohort setup guide 5 days before — it takes about 30 minutes and ensures you hit the ground running on Day 1." },
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
              <div className="footer-brand-desc">Learn AI by building. Build real systems, automate operations, and scale your business — no engineering team required.</div>
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
              <div className="footer-col-title">Workshop</div>
              <ul className="footer-col-items">
                <li>🏛️ ISB-CBI Campus, Gachibowli, Hyderabad</li>
                <li>👥 Limited to 50 Participants per Cohort</li>
                <li>🏆 For Indian SME Operators</li>
                <li>🤝 In partnership with ISB-CBI</li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Quick Links</div>
              <ul className="footer-col-items">
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}>About REDESIGN</a></li>
                <li><a href="#who" onClick={(e) => { e.preventDefault(); scrollToSection("who"); }}>Who is this for</a></li>
                <li><a href="#redesign-waitlist" onClick={(e) => { e.preventDefault(); scrollToSection("redesign-waitlist"); }}>Register for Next Cohort</a></li>
                <li><a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection("faq"); }}>FAQs</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">&copy; 2026 Redesign Workshop. All rights reserved.</div>
            <div className="footer-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "../styles/redesign-ai.css";

const RAZORPAY_LINK = "https://rzp.io/l/YOURLINK";

export default function RedesignAI() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<"day1" | "day2">("day1");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [countdown, setCountdown] = useState({ days: "00", hours: "00", mins: "00", secs: "00" });
  const seatFillRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
              seatFillRef.current!.style.width = "28%";
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

  // Countdown timer
  useEffect(() => {
    const update = () => {
      const target = new Date("2026-04-04T23:59:59").getTime();
      let diff = Math.max(0, target - Date.now());
      const days = Math.floor(diff / 86400000);
      diff %= 86400000;
      const hours = Math.floor(diff / 3600000);
      diff %= 3600000;
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setCountdown({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        mins: String(mins).padStart(2, "0"),
        secs: String(secs).padStart(2, "0"),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
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
          <div className="date-chip">📅 April 2026, Hyderabad</div>
          <div className="dot" />
          <span>ISB Hyderabad</span>
          <div className="dot" />
          <span>50 Seats Only</span>
        </div>
        <button className="nav-cta" onClick={() => scrollToSection("pricing")}>
          Reserve My Seat →
        </button>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-glow-2" />
        <div className="hero-content">
          <div className="hero-eyebrow fade-up">
            <span className="badge">April 2026, Hyderabad</span>
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
              One Weekend in April '26
            </div>
            <div className="hero-meta-divider" />
            <div className="hero-meta-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              ISB Campus, Gachibowli
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
            <button className="btn-primary" onClick={() => scrollToSection("pricing")}>
              Reserve My Seat →
            </button>
            <button className="btn-secondary" onClick={() => scrollToSection("curriculum")}>
              View the Curriculum
            </button>
          </div>

          <div className="seat-counter fade-up delay-4">
            <span className="fire-dot" />
            <span><span className="seat-count-num">14</span> of 50 seats claimed, act fast</span>
          </div>

          <div className="hero-pills fade-up delay-5">
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
            <img src="/assets/isb-logo.png" alt="ISB Centre for Business Innovation" className="logo-partner-img" />
            <div className="logo-partner-desc">Knowledge Partner</div>
          </div>
          <div className="logo-strip-divider" />
          <div className="logo-partner">
            <img src="/assets/plugin-alliance-logo.png" alt="Plugin Alliance" className="logo-partner-img" />
            <div className="logo-partner-desc">Accelerating Industry 4.0 & digital manufacturing adoption across India</div>
          </div>
          <div className="logo-strip-divider" />
          <div className="logo-partner">
            <img src="/assets/aicoworkers-logo.png" alt="AICoworkers" className="logo-partner-img" />
            <div className="logo-partner-desc">No-code AI tools built specifically for Indian SME operators</div>
          </div>
        </div>
      </div>

      {/* Who Is This For */}
      <section className="who-section" id="who">
        <div className="section-inner">
          <span className="section-tag fade-up">Who this is for</span>
          <h2 className="section-h2 fade-up delay-1">Built for three types of people.<br />One shared problem.</h2>
          <p className="section-sub fade-up delay-2">AI is moving fast. Most Indian SMEs are watching from the sidelines. This workshop changes that, whether you own the business, run distribution, or work inside one.</p>

          <div className="who-cards">
            {[
              {
                icon: "🏢", title: "SME Owners",
                desc: "You're running a real business with real costs. You need AI to work in your operations, not in a demo.",
                points: [
                  "Build workflows that cut your admin overhead by 20+ hours/week",
                  "Deploy AI sales agents without hiring a team",
                  "Automate invoice processing, customer support, and data entry",
                  "Understand P&L impact, not just tech jargon",
                ],
              },
              {
                icon: "🚚", title: "Distributors",
                desc: "Managing channels, vendors and logistics manually is costing you margin. AI fixes the invisible inefficiencies.",
                points: [
                  "Automate order tracking, vendor comms and demand forecasting",
                  "Build AI agents for channel management at scale",
                  "Cut manual data entry from distribution ops",
                  "Get ahead of your supply chain before your competitors do",
                ],
              },
              {
                icon: "🧑‍💼", title: "Consulting Firms",
                desc: "CA, CS, legal, and advisory firms that want to deliver faster, smarter, and at scale — without hiring more people.",
                points: [
                  "Automate client onboarding, compliance checklists, and document review",
                  "Build AI agents that handle routine queries so your team focuses on high-value work",
                  "Deliver deeper insights to clients using AI-powered data analysis",
                  "Future-proof your practice before your competitors do",
                ],
              },
            ].map((card, i) => (
              <div className={`who-card fade-up delay-${i + 1}`} key={i}>
                <span className="who-card-icon">{card.icon}</span>
                <div className="who-card-title">{card.title}</div>
                <div className="who-card-desc">{card.desc}</div>
                <ul className="who-card-points">
                  {card.points.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
              </div>
            ))}
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
              <p className="build-sprint">This isn't a seminar. It's a build sprint. In 2 days at ISB Hyderabad, you'll walk out with systems running, not slides to read later.</p>
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
          <p className="section-sub fade-up delay-2">3 to 4 faculty across ISB academia, AI implementation, and Indian SME operations. Theory in the morning, hands-on build sessions in the afternoon.</p>

          <div className="faculty-grid fade-up delay-2">
            <div className="faculty-card">
              <div className="faculty-avatar-wrap">
                <div className="faculty-avatar">ISB</div>
                <div className="faculty-lead-badge">Opening Masterclass</div>
              </div>
              <div className="faculty-info">
                <div className="faculty-name">ISB Faculty <span className="faculty-tbd">(name to be announced)</span></div>
                <div className="faculty-role">Professor of Strategy, Indian School of Business, Hyderabad</div>
                <div className="faculty-bio">Opens the workshop with the strategic AI framework for Indian SMEs. Sets the competitive context, the opportunity map, and the decision criteria for where to deploy AI first in your business.</div>
                <div className="faculty-tags">
                  <span className="speaker-tag">AI Strategy</span>
                  <span className="speaker-tag">ISB Faculty</span>
                  <span className="speaker-tag">Emerging Markets</span>
                </div>
              </div>
            </div>

            <div className="faculty-card">
              <div className="faculty-avatar-wrap">
                <div className="faculty-avatar">AI</div>
              </div>
              <div className="faculty-info">
                <div className="faculty-name">AI Implementation Lead <span className="faculty-tbd">(name to be announced)</span></div>
                <div className="faculty-role">Practitioner, No-Code and Low-Code AI Systems</div>
                <div className="faculty-bio">Leads the hands-on build sessions across both days. Walks participants through workflow creation, automation setup, and agent deployment using tools that require zero engineering background.</div>
                <div className="faculty-tags">
                  <span className="speaker-tag">Workflow Automation</span>
                  <span className="speaker-tag">No-Code AI</span>
                  <span className="speaker-tag">Sales Agents</span>
                </div>
              </div>
            </div>

            <div className="faculty-card">
              <div className="faculty-avatar-wrap">
                <div className="faculty-avatar">OPS</div>
              </div>
              <div className="faculty-info">
                <div className="faculty-name">SME Operations Expert <span className="faculty-tbd">(name to be announced)</span></div>
                <div className="faculty-role">AI Adoption Specialist, Indian Manufacturing and Distribution</div>
                <div className="faculty-bio">Brings real-world context from deploying AI across Indian SMEs in manufacturing, retail and distribution. Facilitates the P&amp;L modelling session and the 90-day roadmap workshop on Day 2.</div>
                <div className="faculty-tags">
                  <span className="speaker-tag">Operations</span>
                  <span className="speaker-tag">P&amp;L Impact</span>
                  <span className="speaker-tag">Distribution</span>
                </div>
              </div>
            </div>

            <div className="faculty-card faculty-card-ghost">
              <div className="faculty-avatar-wrap">
                <div className="faculty-avatar" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.2)" }}>+1</div>
              </div>
              <div className="faculty-info">
                <div className="faculty-name" style={{ color: "rgba(255,255,255,0.35)" }}>Fourth Faculty Member</div>
                <div className="faculty-role" style={{ color: "rgba(255,255,255,0.2)" }}>To be announced shortly</div>
                <div className="faculty-bio" style={{ color: "rgba(255,255,255,0.2)" }}>We're finalising our fourth faculty slot. Follow us or register your interest to be notified when we announce.</div>
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
            <div className="curriculum-header-card">
              <div className="curriculum-header-card-icon">🎓</div>
              <div className="curriculum-header-card-text">
                <strong>Opening Masterclass: Strategic AI Frameworks for Indian SMEs</strong>
                <span>Delivered by ISB Faculty. Setting the strategic foundation before we build</span>
              </div>
            </div>

            <div className="curriculum-tabs">
              <button className={`tab-btn ${activeTab === "day1" ? "active" : ""}`} onClick={() => setActiveTab("day1")}>Day 1: Redesign &amp; Automate</button>
              <button className={`tab-btn ${activeTab === "day2" ? "active" : ""}`} onClick={() => setActiveTab("day2")}>Day 2: Build &amp; Scale</button>
            </div>

            <div className={`tab-content ${activeTab === "day1" ? "active" : ""}`}>
              <div className="curriculum-sessions">
                {[
                  { name: "Strategic AI Frameworks for SMEs", desc: "ISB Professor-led masterclass on AI strategy, competitive advantage, and framework design specifically for Indian business contexts. You'll leave with a strategic AI map for your own company." },
                  { name: "Building Your First AI Workflow", desc: "Hands-on session: Map your current operations, identify automation opportunities, and build your first intelligent workflow using no-code and low-code tools. No engineering background needed." },
                  { name: "Automating Operations, HR & Finance", desc: "Deploy automations for invoice processing, employee onboarding, customer support, and data entry. Walk out of this session with working systems, not mock-ups." },
                  { name: "Day 1 Debrief & Personalised Feedback", desc: "Review your progress with expert instructors. Troubleshoot challenges, refine your workflows, and set the build agenda for Day 2 specific to your business." },
                ].map((session, i) => (
                  <div className="session-item" key={i}>
                    <div className="session-name">{session.name}</div>
                    <div className="session-desc">{session.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`tab-content ${activeTab === "day2" ? "active" : ""}`}>
              <div className="curriculum-sessions">
                {[
                  { name: "Understanding AI Agents: Your New AI Workforce", desc: "The leap beyond chatbots and automations. Learn what AI agents actually are — language models combined with memory, tools, and decision-making — and why they represent a step-change for SME operations." },
                  { name: "AI Sales & Marketing Agents", desc: "Build autonomous agents that qualify leads, follow up with prospects, and generate marketing content at scale. See exactly how these plug into your current sales process." },
                  { name: "Building Your 90-Day AI Roadmap", desc: "Guided workshop: Map out exactly what you'll build in the 90 days after leaving. P&L modelling, priority sequencing, and resource planning for your specific business situation." },
                  { name: "Graduation & AI Collective Access", desc: "Cohort presentations, ISB-CBI co-branded certificate, and onboarding into the ongoing AI Collective — a private community of Indian SME operators building with AI together, long after the weekend ends." },
                ].map((session, i) => (
                  <div className="session-item" key={i}>
                    <div className="session-name">{session.name}</div>
                    <div className="session-desc">{session.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section" id="testimonials">
        <div className="section-inner">
          <span className="section-tag fade-up">What participants say</span>
          <h2 className="section-h2 fade-up delay-1">From people who've been in the room.</h2>
          <p className="section-sub fade-up delay-2">Feedback from attendees of our preview sessions and beta cohort across Hyderabad, Mumbai and Bangalore.</p>

          <div className="testimonials-grid">
            {[
              { initials: "DA", name: "Deepti Agarwal", role: "Founder, Samatvam Living", text: "I came in thinking AI was only for tech-first companies. By Day 2 we had built an actual workflow for our procurement team. This isn't a seminar, it's a build session. I left with something running." },
              { initials: "GS", name: "Gaurav Sharma", role: "Founder, Proficon Labs", text: "As a founder of a growing tech services company, I needed my team to actually use AI, not just talk about it. The workshop gave us a repeatable framework we went back and implemented the following week." },
              { initials: "GT", name: "Gunjann Taneja", role: "President, Talent Development, Naturals", text: "From a talent development perspective, this is exactly what our people needed. Practical, grounded, and immediately applicable. The no-code tools they teach mean any manager can run with this, not just IT." },
            ].map((t, i) => (
              <div className={`testimonial-card fade-up delay-${i + 1}`} key={i}>
                <span className="testimonial-quote">&ldquo;</span>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-stars">★★★★★</div>
                <div className="testimonial-meta">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div>
                    <span className="testimonial-name">{t.name}</span>
                    <span className="testimonial-role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ISB Endorsement */}
          <div className="isb-endorsement fade-up delay-3">
            <div className="isb-endorsement-icon">🏛️</div>
            <div>
              <div className="isb-endorsement-label">ISB Centre for Business Innovation</div>
              <p className="isb-endorsement-quote">"The REDESIGN workshop represents exactly the kind of practical, operator-focused AI education that Indian SMEs have been waiting for. We're proud to host this cohort on the ISB campus."</p>
              <div className="isb-endorsement-source">ISB Centre for Business Innovation, Hyderabad</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section pricing-section" id="pricing">
        <div className="section-inner">
          <span className="section-tag fade-up">Reserve your seat</span>
          <h2 className="section-h2 fade-up delay-1">Secure Your Seat in the April Cohort</h2>
          <p className="section-sub fade-up delay-2">50 seats to ensure every participant gets hands-on support and personalised feedback. Dates to be confirmed shortly, a weekend in April 2026.</p>

          <div className="pricing-layout">
            <div className="pricing-left">
              {/* ROI Block */}
              <div className="roi-block fade-up delay-1">
                <h4>🧮 What this would cost you otherwise</h4>
                <div className="roi-comparison">
                  <div className="roi-row">
                    <span className="roi-row-label">AI consultant (2 days @ ₹20,000/day)</span>
                    <span className="roi-row-value strikethrough">₹40,000</span>
                  </div>
                  <div className="roi-row">
                    <span className="roi-row-label">No-code automation setup (typical agency)</span>
                    <span className="roi-row-value strikethrough">₹60,000+</span>
                  </div>
                  <div className="roi-row">
                    <span className="roi-row-label">90-day post-support and community access</span>
                    <span className="roi-row-value strikethrough">₹25,000</span>
                  </div>
                  <div className="roi-row" style={{ borderTop: "2px solid var(--cream-2)", marginTop: 4, paddingTop: 12 }}>
                    <span className="roi-row-label" style={{ fontWeight: 700, color: "var(--ink)" }}>Equivalent market value</span>
                    <span className="roi-row-value" style={{ fontSize: 18, textDecoration: "line-through", color: "var(--ink-4)" }}>₹1,25,000+</span>
                  </div>
                  <div className="roi-row">
                    <span className="roi-row-label" style={{ fontWeight: 700, color: "var(--ink)" }}>Your early bird price</span>
                    <span className="roi-row-value big">₹39,000</span>
                  </div>
                </div>
              </div>

              {/* Group Pricing */}
              <div className="roi-block group-pricing-block fade-up delay-2">
                <h4>👥 Bring your team, save more</h4>
                <p className="group-pricing-desc">Group discounts apply to early bird registrations only. Standard pricing applies after April 5th.</p>
                <div className="roi-comparison">
                  <div className="roi-row">
                    <span className="roi-row-label">1 person</span>
                    <span className="roi-row-value highlight">₹39,000 per person</span>
                  </div>
                  <div className="roi-row">
                    <span className="roi-row-label">2 people <span className="save-badge-10">Save 10%</span></span>
                    <span className="roi-row-value highlight">₹35,100 per person</span>
                  </div>
                  <div className="roi-row" style={{ borderBottom: "none" }}>
                    <span className="roi-row-label">3 people <span className="save-badge-15">Save 15%</span></span>
                    <span className="roi-row-value highlight">₹33,150 per person</span>
                  </div>
                </div>
              </div>

              {/* Urgency */}
              <div className="urgency-block fade-up delay-3">
                <div className="urgency-icon">⏰</div>
                <div className="urgency-text">
                  <strong>Early bird pricing ends April 5th</strong>
                  <span>After April 5th, the price returns to ₹50,000 and group discounts no longer apply. Reserve your seat now to lock in your rate.</span>
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="pricing-card fade-up delay-2">
              <div className="early-bird-badge">🐦 Early Bird — Ends April 5th</div>
              <div className="pricing-original">₹50,000</div>
              <div className="pricing-main">₹39,000<span> + GST</span></div>
              <div className="pricing-taxes">Per person, early bird price</div>
              <div className="early-bird-save">Early Bird — Save ₹11,000 before April 5th</div>

              {/* Countdown */}
              <div className="countdown-wrap">
                <div className="countdown-label">Early bird offer expires in</div>
                <div className="countdown-timer">
                  <div className="countdown-unit">
                    <span className="countdown-num">{countdown.days}</span>
                    <span className="countdown-unit-label">Days</span>
                  </div>
                  <span className="countdown-sep">:</span>
                  <div className="countdown-unit">
                    <span className="countdown-num">{countdown.hours}</span>
                    <span className="countdown-unit-label">Hours</span>
                  </div>
                  <span className="countdown-sep">:</span>
                  <div className="countdown-unit">
                    <span className="countdown-num">{countdown.mins}</span>
                    <span className="countdown-unit-label">Mins</span>
                  </div>
                  <span className="countdown-sep">:</span>
                  <div className="countdown-unit">
                    <span className="countdown-num">{countdown.secs}</span>
                    <span className="countdown-unit-label">Secs</span>
                  </div>
                </div>
              </div>

              {/* Seat Progress */}
              <div className="seat-progress-wrap">
                <div className="seat-progress-label">
                  <span>50 total seats</span>
                  <span className="seats-left">36 seats left</span>
                </div>
                <div className="seat-progress-bar">
                  <div className="seat-progress-fill" ref={seatFillRef} />
                </div>
              </div>

              <div className="includes-label">What's included</div>
              <ul className="includes-list">
                <li>2 full days of intensive, hands-on AI training at ISB Hyderabad</li>
                <li>Opening masterclass by ISB Faculty on Strategic AI Frameworks</li>
                <li>Build working AI workflows, automation systems, and sales agents</li>
                <li>Personalised feedback and troubleshooting from expert instructors</li>
                <li>Comprehensive workshop materials and implementation templates</li>
                <li>Your personalised 90-day AI action plan</li>
                <li>Post-workshop support for 90 days via the AI Collective</li>
                <li>Networking with 49 other ambitious Indian SME operators</li>
              </ul>

              <a href={RAZORPAY_LINK} target="_blank" rel="noopener noreferrer" className="pricing-cta">Reserve My Seat →</a>
              <div className="pricing-fine-print">
                Instant confirmation on approval. Payment plans available.<br />
                Approved registrations receive ISB access credentials within 24hrs.
              </div>
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
              <div className="footer-brand-desc">The premier AI workshop for Indian SME owners, distributors and employees. Build, automate, and scale your business with hands-on AI training at ISB Hyderabad.</div>
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
                <li>📅 One Weekend in April '26</li>
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

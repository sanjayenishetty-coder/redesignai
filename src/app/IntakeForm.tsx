import { useState, FormEvent, useEffect } from "react";
import "../styles/redesign-ai.css";

const API_URL = "https://script.google.com/macros/s/AKfycbyrVv0gwt45s1DGA4c4qO_xF8oPotuUVTMzBkXxGtDqQZgSZrBXI1yfJaldCkdC-w/exec";
const RAZORPAY_LINK = "https://rzp.io/rzp/ce6486z";
const SHARE_URL = "https://www.scaleme.in/redesign-ai";

export default function IntakeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    designation: "",
    industry: "",
    companyWebsite: "",
    linkedinProfile: "",
    city: "",
    referredBy: "",
    teamSize: "",
    currentAIUsage: "",
    biggestChallenge: "",
    workshopGoals: [] as string[],
    specificTools: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (value: string) => {
    setFormData((prev) => {
      const current = prev.workshopGoals;
      if (current.includes(value)) {
        return { ...prev, workshopGoals: current.filter((v) => v !== value) };
      }
      return { ...prev, workshopGoals: [...current, value] };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(formData),
      });
      window.scrollTo(0, 0);
      setShowShare(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(SHARE_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `I just applied for REDESIGN — a 2-day hands-on AI workshop at ISB Hyderabad for Indian SME owners.\n\nIf you run a business and want to build real AI workflows (no coding needed), check it out:\n${SHARE_URL}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  if (showShare) {
    return (
      <div className="redesign-page">
        <div className="intake-page">
          <div className="intake-success">
            <div className="intake-success-icon">✅</div>
            <h1>Application Submitted!</h1>
            <p>Your application is in. You'll complete your seat reservation on the next step.</p>

            <div className="intake-share-box">
              <p className="intake-share-heading">Know someone who should be in the room?</p>
              <p className="intake-share-sub">
                REDESIGN is built for ambitious SME operators. If you know someone running a business who should be building with AI — share this with them.
              </p>
              <div className="intake-share-actions">
                <button className="intake-share-btn whatsapp" onClick={handleWhatsAppShare}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.526 5.845L.057 23.885l6.194-1.623A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.002-1.368l-.36-.213-3.676.964.981-3.595-.235-.369A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
                  Share on WhatsApp
                </button>
                <button className="intake-share-btn copy" onClick={handleCopyLink}>
                  {copied ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                      Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>

            <a href={RAZORPAY_LINK} className="btn-primary" style={{ display: "inline-block", marginTop: 32, textDecoration: "none" }}>
              Proceed to Payment →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="redesign-page">
      <div className="intake-page">
        <div className="intake-header">
          <div className="intake-date-badge">📅 18th & 19th April 2026 · ISB Campus, Hyderabad</div>
          <div className="intake-banner">
            <img src="/assets/redesign-og.jpg" alt="REDESIGN — A 2-Day Hands-On AI Workshop for Indian SMEs" className="intake-banner-img" />
          </div>
          <h1>Apply for Your Seat</h1>
          <p>Tell us about yourself and your business. We use this to personalise your experience — and you'll complete your payment on the next step.</p>
        </div>

        <form className="intake-form" onSubmit={handleSubmit}>
          {/* Section 1: Personal Details */}
          <div className="intake-section">
            <h2><span className="intake-section-num">01</span> Personal Details</h2>

            <div className="intake-grid">
              <div className="intake-field">
                <label htmlFor="fullName">Full Name *</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Your full name" />
              </div>
              <div className="intake-field">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
              </div>
              <div className="intake-field">
                <label htmlFor="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="intake-field">
                <label htmlFor="city">City *</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required placeholder="Your city" />
              </div>
              <div className="intake-field">
                <label htmlFor="linkedinProfile">LinkedIn Profile</label>
                <input type="url" id="linkedinProfile" name="linkedinProfile" value={formData.linkedinProfile} onChange={handleChange} placeholder="https://linkedin.com/in/yourprofile" />
              </div>
              <div className="intake-field">
                <label htmlFor="referredBy">Referred by (optional)</label>
                <input type="text" id="referredBy" name="referredBy" value={formData.referredBy} onChange={handleChange} placeholder="Name of the person who referred you" />
              </div>
            </div>
          </div>

          {/* Section 2: Business Details */}
          <div className="intake-section">
            <h2><span className="intake-section-num">02</span> Business Details</h2>

            <div className="intake-grid">
              <div className="intake-field">
                <label htmlFor="companyName">Company Name *</label>
                <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required placeholder="Your company name" />
              </div>
              <div className="intake-field">
                <label htmlFor="designation">Your Role / Designation *</label>
                <input type="text" id="designation" name="designation" value={formData.designation} onChange={handleChange} required placeholder="e.g. Founder, CEO, COO" />
              </div>
              <div className="intake-field">
                <label htmlFor="industry">Industry *</label>
                <select id="industry" name="industry" value={formData.industry} onChange={handleChange} required>
                  <option value="">Select your industry</option>
                  <option value="Retail & E-commerce">Retail & E-commerce</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Distribution & Logistics">Distribution & Logistics</option>
                  <option value="Consulting & Professional Services">Consulting & Professional Services</option>
                  <option value="Healthcare & Pharma">Healthcare & Pharma</option>
                  <option value="Real Estate & Construction">Real Estate & Construction</option>
                  <option value="Education & Training">Education & Training</option>
                  <option value="IT & Software">IT & Software</option>
                  <option value="Finance & Banking">Finance & Banking</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="intake-field">
                <label htmlFor="companyWebsite">Company Website</label>
                <input type="url" id="companyWebsite" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} placeholder="https://yourcompany.com" />
              </div>
              <div className="intake-field">
                <label htmlFor="teamSize">Team Size *</label>
                <select id="teamSize" name="teamSize" value={formData.teamSize} onChange={handleChange} required>
                  <option value="">Select team size</option>
                  <option value="1-10">1–10 employees</option>
                  <option value="11-50">11–50 employees</option>
                  <option value="51-200">51–200 employees</option>
                  <option value="201-500">201–500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: AI Readiness */}
          <div className="intake-section">
            <h2><span className="intake-section-num">03</span> AI Readiness & Goals</h2>

            <div className="intake-field full-width">
              <label htmlFor="currentAIUsage">How are you currently using AI in your business? *</label>
              <select id="currentAIUsage" name="currentAIUsage" value={formData.currentAIUsage} onChange={handleChange} required>
                <option value="">Select your current AI usage</option>
                <option value="Not using AI at all">Not using AI at all</option>
                <option value="Using ChatGPT/AI tools personally">Using ChatGPT/AI tools personally, but not in operations</option>
                <option value="Some AI tools in use across team">Some AI tools in use across the team</option>
                <option value="AI integrated into workflows">AI integrated into some business workflows</option>
                <option value="Advanced AI adoption">Advanced — AI agents and automation deployed</option>
              </select>
            </div>

            <div className="intake-field full-width">
              <label>What do you most want to achieve from this workshop? *</label>
              <div className="intake-checkbox-grid">
                {[
                  "Build AI workflows for my operations",
                  "Automate repetitive tasks (HR, finance, admin)",
                  "Create AI-powered sales & marketing systems",
                  "Understand AI strategy for my industry",
                  "Deploy AI agents without a tech team",
                  "Build a 90-day AI implementation plan",
                  "Network with other AI-forward SME operators",
                  "Explore AI tools and platforms",
                ].map((goal) => (
                  <label key={goal} className="intake-checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.workshopGoals.includes(goal)}
                      onChange={() => handleCheckbox(goal)}
                    />
                    <span>{goal}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="intake-field full-width">
              <label htmlFor="biggestChallenge">What's your biggest business challenge right now that you think AI could help solve?</label>
              <textarea id="biggestChallenge" name="biggestChallenge" value={formData.biggestChallenge} onChange={handleChange} rows={3} placeholder="e.g. We spend too much time on manual invoicing and follow-ups..." />
            </div>

            <div className="intake-field full-width">
              <label htmlFor="specificTools">Are there any specific AI tools or platforms you're curious about?</label>
              <textarea id="specificTools" name="specificTools" value={formData.specificTools} onChange={handleChange} rows={2} placeholder="e.g. ChatGPT, Zapier, Make, custom AI agents..." />
            </div>
          </div>

          <button type="submit" className="btn-primary intake-submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application & Proceed to Payment →"}
          </button>
        </form>
      </div>
    </div>
  );
}

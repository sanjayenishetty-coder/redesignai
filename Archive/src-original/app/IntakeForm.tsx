import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router";
import "../styles/redesign-ai.css";

export default function IntakeForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    designation: "",
    industry: "",
    teamSize: "",
    biggestChallenge: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/submit-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Submission failed");
      window.scrollTo(0, 0);
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="redesign-page">
        <div className="intake-page">
          <div className="intake-success">
            <div className="intake-success-icon">✅</div>
            <h1>You're on the Waitlist!</h1>
            <p>
              Thanks for registering your interest. The April 2026 cohort is fully booked, but we'll reach out as soon as the next REDESIGN-ai cohort opens — you'll get first access before public announcements.
            </p>
            <button
              className="btn-primary"
              style={{ marginTop: 32 }}
              onClick={() => navigate("/redesign-ai")}
            >
              ← Back to REDESIGN-ai
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="redesign-page">
      <div className="intake-page">
        <div className="intake-header">
          <div className="intake-date-badge">🔒 April 2026 Cohort — Fully Booked</div>
          <h1>Join the Next Cohort Waitlist</h1>
          <p>
            All 50 seats for the April 2026 cohort are gone. Leave your details and we'll reach out the moment the next REDESIGN-ai cohort opens — before it's announced publicly.
          </p>
        </div>

        <form className="intake-form" onSubmit={handleSubmit}>
          {/* Section 1: About You */}
          <div className="intake-section">
            <h2><span className="intake-section-num">01</span> About You</h2>
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
                <label htmlFor="designation">Your Role / Designation *</label>
                <input type="text" id="designation" name="designation" value={formData.designation} onChange={handleChange} required placeholder="e.g. Founder, CEO, COO" />
              </div>
            </div>
          </div>

          {/* Section 2: Business Details */}
          <div className="intake-section">
            <h2><span className="intake-section-num">02</span> Your Business</h2>
            <div className="intake-grid">
              <div className="intake-field">
                <label htmlFor="companyName">Company Name *</label>
                <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required placeholder="Your company name" />
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
                <label htmlFor="teamSize">Team Size</label>
                <select id="teamSize" name="teamSize" value={formData.teamSize} onChange={handleChange}>
                  <option value="">Select team size</option>
                  <option value="1-10">1–10 employees</option>
                  <option value="11-50">11–50 employees</option>
                  <option value="51-200">51–200 employees</option>
                  <option value="201-500">201–500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
            </div>
            <div className="intake-field full-width" style={{ marginTop: 16 }}>
              <label htmlFor="biggestChallenge">What's the biggest challenge in your business you'd like AI to help solve?</label>
              <textarea id="biggestChallenge" name="biggestChallenge" value={formData.biggestChallenge} onChange={handleChange} rows={3} placeholder="e.g. We spend too much time on manual follow-ups and reporting..." />
            </div>
          </div>

          <button type="submit" className="btn-primary intake-submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Register for Next Cohort →"}
          </button>
        </form>
      </div>
    </div>
  );
}

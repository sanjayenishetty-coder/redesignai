import { useState, FormEvent, useEffect } from "react";
import "../styles/redesign-ai.css";

const GOOGLE_SCRIPT_URL = "https://api.simpo.ai/business/contact";

export default function IntakeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

    teamSize: "",
    currentAIUsage: "",
    biggestChallenge: "",
    workshopGoals: [] as string[],
    specificTools: "",
    dietaryRequirements: "",
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
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          message: "REDESIGN Workshop Intake Form",
          moreInfo: formData,
        }),
      });
      setSubmitted(true);
      window.scrollTo(0, 0);
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
            <h1>You're All Set!</h1>
            <p>Thank you for completing your profile. Our team will use this to personalise your workshop experience.</p>
            <p className="intake-success-sub">We'll send you a confirmation email with all the details — venue, schedule, and what to bring — within 24 hours.</p>
            <a href="/redesign-ai" className="btn-primary" style={{ display: "inline-block", marginTop: 24, textDecoration: "none" }}>Back to REDESIGN</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="redesign-page">
      <div className="intake-page">
        <div className="intake-header">
          <div className="intake-logo">REDESIGN</div>
          <h1>Complete Your Profile</h1>
          <p>Welcome aboard! Help us personalise your workshop experience by filling in a few details about you and your business.</p>
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

          {/* Section 4: Logistics */}
          <div className="intake-section">
            <h2><span className="intake-section-num">04</span> Logistics</h2>

            <div className="intake-field full-width">
              <label htmlFor="dietaryRequirements">Any dietary requirements or accessibility needs?</label>
              <input type="text" id="dietaryRequirements" name="dietaryRequirements" value={formData.dietaryRequirements} onChange={handleChange} placeholder="e.g. Vegetarian, Vegan, No specific requirements" />
            </div>
          </div>

          <button type="submit" className="btn-primary intake-submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit & Confirm My Spot"}
          </button>
        </form>
      </div>
    </div>
  );
}

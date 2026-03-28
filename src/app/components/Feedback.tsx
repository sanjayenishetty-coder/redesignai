// FeedbackForm.tsx
import { useState } from "react";
import {
  User, Building2, Briefcase, Mail, Phone, TrendingUp, Factory,
    CheckCircle2,
  ArrowLeft, Send, ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router";


interface FormState {
  firstName: string;
  companyLegalName: string;
  designation: string;
  email: string;
  contactNumber: string;
  revenue: string;
  industrySector: string;
  overallExperience: number;
  relevance: number;
  qualityNetworking: number;
  valuableSpeakers: string[];
  singleTakeaway: string;
  initiativesInterested: string[];
  futureTopics: string;
  recommend: number;
  shareMore: string;
}

interface RatingGroupProps {
  value: number;
  onChange: (v: number) => void;
  lowLabel: string;
  highLabel: string;
}

interface CheckItemProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

interface TextFieldProps {
  id: keyof FormState;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
}

interface QuestionProps {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

// ── Data ───────────────────────────────────────────────────────────────────
const SESSIONS: string[] = [
  "Sanjay Enishetty — The Uncomfortable Truth",
  "Prof. Rajendra Srivastava — Market Cap vs EBITDA & The India Strategy",
  "Dr. Raj P. Narayanam — Idea to IPO: The Zaggle Journey",
  "CK Kumaravel — High Tech, High Touch & Scaling Frameworks",
  "Uttam Tibrewal — The AU Story",
  "Parvathi Moorthy — NSE Emerge & IPO Readiness",
];

const INITIATIVES: string[] = [
  "Peer Cohort Circles — Structured, ongoing groups of SME operators at similar scale",
  "Capital Connect — Capital connectivity (M&A, equity, debt, pre-IPO)",
  "IPO Readiness Programme — Governance, compliance & listing with NSE Emerge",
  "Sector-Specific Roundtables — Industry-focused deep dives with expert panels",
  "1-on-1 Mentorship Access — Direct advisory from experienced operators and investors",
];


// ── Sub-components ─────────────────────────────────────────────────────────

const RatingGroup: React.FC<RatingGroupProps> = ({ value, onChange, lowLabel, highLabel }) => (
  <div className="space-y-2">
    <div className="flex gap-2 flex-wrap">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`w-11 h-11 rounded-xl border-2 text-sm font-semibold transition-all duration-150 
            ${value === n
              ? "bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-200"
              : "bg-white border-gray-200 text-gray-500 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50"
            }`}
        >
          {n}
        </button>
      ))}
    </div>
    <div className="flex justify-between text-xs text-gray-400 px-0.5">
      <span>{lowLabel}</span>
      <span>{highLabel}</span>
    </div>
  </div>
);

const CheckItem: React.FC<CheckItemProps> = ({ label, checked, onChange }) => (
  <div
    onClick={onChange}
    className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-150
      ${checked
        ? "border-teal-500 bg-teal-50"
        : "border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50/50"
      }`}
  >
    <div
      className={`mt-0.5 w-5 h-5 min-w-5 rounded-md border-2 flex items-center justify-center transition-all duration-150 flex-shrink-0
        ${checked ? "bg-teal-600 border-teal-600" : "border-gray-300 bg-white"}`}
    >
      {checked && (
        <svg className="w-3 h-3" viewBox="0 0 12 9" fill="none">
          <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </div>
    <span className="text-sm text-gray-700 leading-relaxed">{label}</span>
  </div>
);

const TextField: React.FC<TextFieldProps> = ({
  id, label, placeholder, required, type = "text", icon, value, onChange,
}) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
      {label}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
    <div className="relative">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4">
        {icon}
      </div>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-800
          placeholder:text-gray-400 bg-white transition-all duration-200
          focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
      />
    </div>
  </div>
);

const Question: React.FC<QuestionProps> = ({ label, hint, required, children }) => (
  <div className="space-y-2">
    <div>
      <p className="text-sm font-semibold text-gray-800">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </p>
      {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
    </div>
    {children}
  </div>
);

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/70">
      <p className="text-xs font-bold uppercase tracking-widest text-teal-600">{title}</p>
    </div>
    <div className="p-6 space-y-6">{children}</div>
  </div>
);

// ── Success Screen ─────────────────────────────────────────────────────────
const SuccessScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <div className="text-center max-w-sm">
      <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10 text-teal-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
        Feedback Submitted!
      </h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-8">
        Thank you for taking the time. Your input is invaluable in shaping ScaleMe's next chapter.
      </p>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white text-sm font-semibold
          rounded-xl hover:bg-teal-700 transition-colors duration-200 shadow-md shadow-teal-200"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>
    </div>
  </div>
);

// ── Main FeedbackForm Component ────────────────────────────────────────────
interface FeedbackFormProps {
  onBack?: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onBack }) => {
  const [form, setForm] = useState<FormState>({
    firstName: "", companyLegalName: "", designation: "", email: "", contactNumber: "",
    revenue: "", industrySector: "", overallExperience: 0, relevance: 0, qualityNetworking: 0,
    valuableSpeakers: [], singleTakeaway: "", initiativesInterested: [], futureTopics: "", recommend: 0, shareMore: "",
  });
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const toggle = (k: "valuableSpeakers" | "initiativesInterested", v: string) =>
    set(k, (form[k] as string[]).includes(v)
      ? (form[k] as string[]).filter((x) => x !== v)
      : [...(form[k] as string[]), v]
    );

  const handleSubmit = async () => {
    if (!form.firstName || !form.companyLegalName || !form.email || !form.overallExperience) {
      alert("Please fill in required fields (Name, Company, Email) and provide an overall rating.");
      return;
    }

    setLoading(true)
    const payload: any ={
        businessId: "1f0ffff7-c282-624f-9d23-03d83203e77f",
        name: form.firstName,
        mobileNo: form.contactNumber,
        email: form.email,
        message: '',
        moreInfo: form,
        prospect: true,
        fromPaisa: false
    }
    try {
      const res = await fetch(
        "https://api.simpo.ai/business/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        throw new Error("API failed");
      }

      const result = await res.json();
      setLoading(false);
      navigate('/feedback-submitted');
    } catch (err: any) {
      setLoading(false);
      alert("Submission failed. Please try again.");
    }
    
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) return <SuccessScreen onBack={onBack ?? (() => setSubmitted(false))} />;

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap');`}</style>

          <div className="min-h-screen bg-gray-50">
              {/* ── Header ── */}
              <div className="relative bg-gradient-to-br from-[#1B2A4A] to-[#2D4A6E]">
                  {/* back button */}
                  <div className="pt-10 pb-3 px-6">
                      <button
                          onClick={() => navigate('/')}
                          className="inline-flex gap-1.5 text-xs text-white/60
                hover:text-white/90 transition-colors px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10"
                      >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          Back
                      </button>
                  </div>
                  <div className="px-6 pb-14 text-center overflow-hidden">
                      {/* brand */}
                      <p className="text-xs font-bold uppercase tracking-[4px] text-white/50 mb-3">
                          S<span className="text-teal-400">{"{"}</span>cale<span className="text-teal-400">{"}"}</span>ME
                      </p>
                      <h1
                          className="text-2xl md:text-3xl font-bold text-white mb-2 leading-snug"
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                          SME Growth Summit '26
                      </h1>
                      <p className="text-sm text-white/50 max-w-xs mx-auto">
                          Your feedback shapes the future of India's SME growth ecosystem
                      </p>
                      {/* event pill */}
                      <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                          ISB Hyderabad · 21st February 2026
                      </div>
                  </div>
              </div>

              {/* ── Form Body ── */}
              <div className="max-w-3xl mx-auto px-4 pb-0 -mt-6 space-y-4 relative z-100">

                  {/* ── Section 1: Your Details ── */}
                  <Section title="Your Details">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <TextField id="firstName" label="Full Name" placeholder="Your name" required
                              icon={<User className="w-4 h-4" />} value={form.firstName} onChange={(v) => set("firstName", v)} />
                          <TextField id="companyLegalName" label="Company Name" placeholder="Your company" required
                              icon={<Building2 className="w-4 h-4" />} value={form.companyLegalName} onChange={(v) => set("companyLegalName", v)} />
                          <TextField id="designation" label="Designation" placeholder="e.g. Founder, CEO"
                              icon={<Briefcase className="w-4 h-4" />} value={form.designation} onChange={(v) => set("designation", v)} />
                          <TextField id="email" label="Email" placeholder="your@email.com" required type="email"
                              icon={<Mail className="w-4 h-4" />} value={form.email} onChange={(v) => set("email", v)} />
                          <TextField id="contactNumber" label="Phone" placeholder="+91 XXXXX XXXXX" type="tel"
                              icon={<Phone className="w-4 h-4" />} value={form.contactNumber} onChange={(v) => set("contactNumber", v)} />
                          <TextField id="industrySector" label="Industry / Sector" placeholder="e.g. Manufacturing, IT"
                              icon={<Factory className="w-4 h-4" />} value={form.industrySector} onChange={(v) => set("industrySector", v)} />
                      </div>

                  </Section>

                  {/* ── Section 2: Summit Experience ── */}
                  <Section title="Summit Experience">
                      <Question label="Overall summit experience" hint="1 = Poor · 5 = Exceptional" required>
                          <RatingGroup value={form.overallExperience} onChange={(v) => set("overallExperience", v)} lowLabel="Poor" highLabel="Exceptional" />
                      </Question>

                      <Question label="Relevance to your business challenges" hint="1 = Not relevant · 5 = Highly relevant">
                          <RatingGroup value={form.relevance} onChange={(v) => set("relevance", v)} lowLabel="Not relevant" highLabel="Highly relevant" />
                      </Question>

                      <Question label="Quality of networking & peer interactions" hint="1 = Weak · 5 = Excellent">
                          <RatingGroup value={form.qualityNetworking} onChange={(v) => set("qualityNetworking", v)} lowLabel="Weak" highLabel="Excellent" />
                      </Question>

                      <hr className="border-gray-100" />

                      <Question label="Most valuable speaker session(s)" hint="Select all that apply">
                          <div className="space-y-2">
                              {SESSIONS.map((s) => (
                                  <CheckItem key={s} label={s} checked={form.valuableSpeakers.includes(s)} onChange={() => toggle("valuableSpeakers", s)} />
                              ))}
                          </div>
                      </Question>

                      <Question label="Your single biggest takeaway">
                          <textarea
                              placeholder="Share the one insight or moment that stood out most for you..."
                              value={form.singleTakeaway}
                              onChange={(e) => set("singleTakeaway", e.target.value)}
                              rows={3}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-800
                  placeholder:text-gray-400 resize-y transition-all duration-200
                  focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          />
                      </Question>
                  </Section>

                  {/* ── Section 3: What You Want Next ── */}
                  <Section title="What You Want Next">
                      <Question label="ScaleMe initiatives you're most interested in" hint="Select all that apply">
                          <div className="space-y-2">
                              {INITIATIVES.map((item) => (
                                  <CheckItem key={item} label={item} checked={form.initiativesInterested.includes(item)} onChange={() => toggle("initiativesInterested", item)} />
                              ))}
                          </div>
                      </Question>

                      <Question label="Topics for future ScaleMe events">
                          <textarea
                              placeholder="e.g. Succession planning, digital transformation, export readiness..."
                              value={form.futureTopics}
                              onChange={(e) => set("futureTopics", e.target.value)}
                              rows={3}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-800
                  placeholder:text-gray-400 resize-y transition-all duration-200
                  focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          />
                      </Question>

                      <Question label="Would you recommend ScaleMe to a fellow SME operator?" hint="1 = Unlikely · 5 = Absolutely">
                          <RatingGroup value={form.recommend} onChange={(v) => set("recommend", v)} lowLabel="Unlikely" highLabel="Absolutely" />
                      </Question>

                      <Question label="Anything else to share?" hint="Suggestions, ideas, or anything we should know">
                          <textarea
                              placeholder="Your thoughts..."
                              value={form.shareMore}
                              onChange={(e) => set("shareMore", e.target.value)}
                              rows={3}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-800
                  placeholder:text-gray-400 resize-y transition-all duration-200
                  focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          />
                      </Question>
                  </Section>

                  {/* ── Submit ── */}
                  {loading ? <button
                      onClick={handleSubmit}
                      className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl
              bg-gradient-to-r from-teal-600 to-teal-700 text-white text-base font-bold
              shadow-lg shadow-teal-200 hover:shadow-xl hover:shadow-teal-300
              hover:-translate-y-0.5 active:translate-y-0
              transition-all duration-200" style={{ opacity: "0.5", cursor: 'not-allowed' }}
                  >
                      Submitting Feedback...
                  </button> : 
                  <button
                      onClick={handleSubmit}
                      className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl
              bg-gradient-to-r from-teal-600 to-teal-700 text-white text-base font-bold
              shadow-lg shadow-teal-200 hover:shadow-xl hover:shadow-teal-300
              hover:-translate-y-0.5 active:translate-y-0
              transition-all duration-200"
                  >
                      <Send className="w-5 h-5" />
                      Submit Feedback
                      <ChevronRight className="w-4 h-4 opacity-70" />
                  </button>}

                  <p className="text-center text-xs text-gray-400 pb-2 leading-relaxed">
                      Your responses help us build a better ecosystem for India's SME operators.
                  </p>
              </div>

              <div className="mt-6 rounded-2xl border border-gray-100 bg-white shadow-sm p-6 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Follow Our Channels for Latest Updates
                </p>
                <div className="flex items-center justify-center gap-8">

                {/* Instagram */}
                <a
                    href="https://www.instagram.com/scalemenetwork"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl border-2 border-gray-100
                    hover:border-pink-300 hover:bg-pink-50 transition-all duration-200 group"
                >
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                    bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 shadow-sm shadow-pink-200">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    </span>
                    <div className="text-left">
                    <p className="text-xs font-bold text-gray-800 group-hover:text-pink-600 transition-colors">Instagram</p>
                    <p className="text-[11px] text-gray-400">@scaleme.in</p>
                    </div>
                </a>

                {/* LinkedIn */}
                <a
                    href="https://www.linkedin.com/company/scalemenetwork/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl border-2 border-gray-100
                    hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                >
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                    bg-[#0A66C2] shadow-sm shadow-blue-200">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    </span>
                    <div className="text-left">
                    <p className="text-xs font-bold text-gray-800 group-hover:text-blue-600 transition-colors">LinkedIn</p>
                    <p className="text-[11px] text-gray-400">ScaleMe India</p>
                    </div>
                </a>

                </div>
          </div>
          </div>
    </>
  );
};

export default FeedbackForm;
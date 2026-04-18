import { useState, FormEvent } from "react";

const SPEAKERS = [
  {
    key: "sp",
    name: "Prof. Shankar Prakash",
    topic: "AI Foundations & Strategic Thinking",
  },
  {
    key: "rt",
    name: "Ravi Tanniru",
    topic: "AI Use Cases for Indian SMEs",
  },
  {
    key: "ae",
    name: "Abhishek Ekbote",
    topic: "Implementing AI in Business Operations",
  },
  {
    key: "pa",
    name: "Pavan Adipuram",
    topic: "Business Dashboard & Data Decisions",
  },
  {
    key: "vr",
    name: "Venkatesh Rajendran",
    topic: "AI-Driven Growth Strategy",
  },
];

type SessionRating = {
  rating: string;
  delivery: string;
  relevance: string;
  takeaway: string;
};

type FormState = {
  participantName: string;
  participantCompany: string;
  sessions: Record<string, SessionRating>;
  overallRating: string;
  bestSession: string;
  improvements: string;
  wouldRecommend: string;
  otherFeedback: string;
};

const emptySession = (): SessionRating => ({
  rating: "",
  delivery: "",
  relevance: "",
  takeaway: "",
});

const RatingButtons = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <div style={{ display: "flex", gap: 8 }}>
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        onClick={() => onChange(String(n))}
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          border: value === String(n) ? "2px solid #007787" : "1.5px solid #d1d5db",
          background: value === String(n) ? "#007787" : "white",
          color: value === String(n) ? "white" : "#374151",
          fontWeight: 700,
          fontSize: 15,
          cursor: "pointer",
          transition: "all 0.15s",
        }}
      >
        {n}
      </button>
    ))}
  </div>
);

export default function WorkshopFeedback() {
  const [form, setForm] = useState<FormState>({
    participantName: "",
    participantCompany: "",
    sessions: Object.fromEntries(SPEAKERS.map((s) => [s.key, emptySession()])),
    overallRating: "",
    bestSession: "",
    improvements: "",
    wouldRecommend: "",
    otherFeedback: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const setSession = (key: string, field: keyof SessionRating, value: string) => {
    setForm((prev) => ({
      ...prev,
      sessions: {
        ...prev.sessions,
        [key]: { ...prev.sessions[key], [field]: value },
      },
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate all session ratings filled
    for (const s of SPEAKERS) {
      const sess = form.sessions[s.key];
      if (!sess.rating || !sess.delivery || !sess.relevance) {
        setError(`Please complete all ratings for ${s.name}.`);
        return;
      }
    }
    if (!form.overallRating || !form.wouldRecommend) {
      setError("Please complete the overall feedback section.");
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      const payload = {
        participant_name: form.participantName || null,
        participant_company: form.participantCompany || null,
        ...Object.fromEntries(
          SPEAKERS.flatMap((s) => [
            [`${s.key}_rating`, parseInt(form.sessions[s.key].rating)],
            [`${s.key}_delivery`, parseInt(form.sessions[s.key].delivery)],
            [`${s.key}_relevance`, parseInt(form.sessions[s.key].relevance)],
            [`${s.key}_takeaway`, form.sessions[s.key].takeaway || null],
          ])
        ),
        overall_rating: parseInt(form.overallRating),
        best_session: form.bestSession || null,
        improvements: form.improvements || null,
        would_recommend: form.wouldRecommend === "yes",
        other_feedback: form.otherFeedback || null,
      };

      const res = await fetch("/api/submit-workshop-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={s.page}>
        <div style={s.successWrap}>
          <div style={s.successIcon}>✅</div>
          <h1 style={s.successTitle}>Thank you for your feedback!</h1>
          <p style={s.successText}>
            Your responses help us make REDESIGN-ai better. We appreciate you taking the time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={s.container}>
        {/* Header */}
        <div style={s.header}>
          <div style={s.badge}>REDESIGN-ai · Day 1</div>
          <h1 style={s.title}>Workshop Feedback</h1>
          <p style={s.subtitle}>
            Rate each session and share your thoughts. Your honest feedback shapes the next cohort.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Participant Info */}
          <div style={s.card}>
            <div style={s.sectionLabel}>About You <span style={s.optional}>(optional)</span></div>
            <div style={s.grid2}>
              <div>
                <label style={s.label}>Your Name</label>
                <input
                  style={s.input}
                  type="text"
                  placeholder="Your name"
                  value={form.participantName}
                  onChange={(e) => setForm((p) => ({ ...p, participantName: e.target.value }))}
                />
              </div>
              <div>
                <label style={s.label}>Company</label>
                <input
                  style={s.input}
                  type="text"
                  placeholder="Your company"
                  value={form.participantCompany}
                  onChange={(e) => setForm((p) => ({ ...p, participantCompany: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Session Ratings */}
          {SPEAKERS.map((speaker, idx) => (
            <div key={speaker.key} style={s.card}>
              <div style={s.sessionHeader}>
                <div style={s.sessionNum}>{String(idx + 1).padStart(2, "0")}</div>
                <div>
                  <div style={s.speakerName}>{speaker.name}</div>
                  <div style={s.speakerTopic}>{speaker.topic}</div>
                </div>
              </div>

              <div style={s.ratingsGrid}>
                <div>
                  <label style={s.ratingLabel}>Overall Session Rating <span style={s.req}>*</span></label>
                  <div style={s.ratingHint}>1 = Poor · 5 = Excellent</div>
                  <RatingButtons
                    value={form.sessions[speaker.key].rating}
                    onChange={(v) => setSession(speaker.key, "rating", v)}
                  />
                </div>
                <div>
                  <label style={s.ratingLabel}>Delivery & Engagement <span style={s.req}>*</span></label>
                  <div style={s.ratingHint}>How well was the session delivered?</div>
                  <RatingButtons
                    value={form.sessions[speaker.key].delivery}
                    onChange={(v) => setSession(speaker.key, "delivery", v)}
                  />
                </div>
                <div>
                  <label style={s.ratingLabel}>Practical Relevance <span style={s.req}>*</span></label>
                  <div style={s.ratingHint}>Applicable to your business?</div>
                  <RatingButtons
                    value={form.sessions[speaker.key].relevance}
                    onChange={(v) => setSession(speaker.key, "relevance", v)}
                  />
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <label style={s.label}>
                  Key takeaway from this session <span style={s.optional}>(optional)</span>
                </label>
                <textarea
                  style={s.textarea}
                  rows={2}
                  placeholder="What's the one thing you'll take away from this session?"
                  value={form.sessions[speaker.key].takeaway}
                  onChange={(e) => setSession(speaker.key, "takeaway", e.target.value)}
                />
              </div>
            </div>
          ))}

          {/* Overall Day Feedback */}
          <div style={s.card}>
            <div style={s.sectionLabel}>Overall Day 1 Feedback</div>

            <div style={{ marginBottom: 20 }}>
              <label style={s.ratingLabel}>How would you rate Day 1 overall? <span style={s.req}>*</span></label>
              <div style={s.ratingHint}>1 = Poor · 5 = Excellent</div>
              <RatingButtons
                value={form.overallRating}
                onChange={(v) => setForm((p) => ({ ...p, overallRating: v }))}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={s.label}>Which session was most valuable to you? <span style={s.optional}>(optional)</span></label>
              <select
                style={s.input}
                value={form.bestSession}
                onChange={(e) => setForm((p) => ({ ...p, bestSession: e.target.value }))}
              >
                <option value="">Select a session</option>
                {SPEAKERS.map((sp) => (
                  <option key={sp.key} value={sp.name}>
                    {sp.name} — {sp.topic}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={s.label}>What could be improved? <span style={s.optional}>(optional)</span></label>
              <textarea
                style={s.textarea}
                rows={3}
                placeholder="Any suggestions for improvement — content, format, timing, logistics..."
                value={form.improvements}
                onChange={(e) => setForm((p) => ({ ...p, improvements: e.target.value }))}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={s.ratingLabel}>
                Would you recommend REDESIGN-ai to another business owner? <span style={s.req}>*</span>
              </label>
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                {[
                  { value: "yes", label: "Yes, definitely" },
                  { value: "maybe", label: "Maybe" },
                  { value: "no", label: "Not sure yet" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, wouldRecommend: opt.value }))}
                    style={{
                      padding: "10px 20px",
                      borderRadius: 8,
                      border: form.wouldRecommend === opt.value ? "2px solid #007787" : "1.5px solid #d1d5db",
                      background: form.wouldRecommend === opt.value ? "#007787" : "white",
                      color: form.wouldRecommend === opt.value ? "white" : "#374151",
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={s.label}>Any other thoughts or feedback? <span style={s.optional}>(optional)</span></label>
              <textarea
                style={s.textarea}
                rows={3}
                placeholder="Anything else you'd like to share..."
                value={form.otherFeedback}
                onChange={(e) => setForm((p) => ({ ...p, otherFeedback: e.target.value }))}
              />
            </div>
          </div>

          {error && <div style={s.errorMsg}>{error}</div>}

          <button
            type="submit"
            disabled={submitting}
            style={s.submitBtn}
          >
            {submitting ? "Submitting..." : "Submit Feedback →"}
          </button>
        </form>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f3f4f6",
    fontFamily: "system-ui, -apple-system, sans-serif",
    padding: "40px 16px 80px",
  },
  container: {
    maxWidth: 720,
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: 32,
  },
  badge: {
    display: "inline-block",
    background: "#007787",
    color: "white",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "4px 14px",
    borderRadius: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 800,
    color: "#111",
    margin: "0 0 10px",
  },
  subtitle: {
    fontSize: 15,
    color: "#6b7280",
    margin: 0,
  },
  card: {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: "24px",
    marginBottom: 20,
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: 700,
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    marginBottom: 20,
  },
  sessionHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 20,
    paddingBottom: 16,
    borderBottom: "1px solid #f3f4f6",
  },
  sessionNum: {
    width: 36,
    height: 36,
    background: "#007787",
    color: "white",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: 14,
    flexShrink: 0,
  },
  speakerName: {
    fontWeight: 700,
    fontSize: 16,
    color: "#111",
    marginBottom: 3,
  },
  speakerTopic: {
    fontSize: 13,
    color: "#6b7280",
  },
  ratingsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "16px 20px",
  },
  ratingLabel: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 4,
  },
  ratingHint: {
    fontSize: 11,
    color: "#9ca3af",
    marginBottom: 10,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px 20px",
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    fontSize: 14,
    border: "1.5px solid #e5e7eb",
    borderRadius: 8,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "system-ui, sans-serif",
    background: "white",
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    fontSize: 14,
    border: "1.5px solid #e5e7eb",
    borderRadius: 8,
    outline: "none",
    resize: "vertical",
    boxSizing: "border-box",
    fontFamily: "system-ui, sans-serif",
  },
  optional: {
    fontWeight: 400,
    color: "#9ca3af",
    fontSize: 12,
  },
  req: {
    color: "#ef4444",
  },
  errorMsg: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#dc2626",
    padding: "12px 16px",
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 16,
  },
  submitBtn: {
    width: "100%",
    padding: "14px",
    background: "#007787",
    color: "white",
    border: "none",
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: "0.02em",
  },
  successWrap: {
    maxWidth: 480,
    margin: "80px auto",
    background: "white",
    borderRadius: 16,
    padding: "48px 40px",
    textAlign: "center",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  },
  successIcon: {
    fontSize: 48,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: 800,
    color: "#111",
    margin: "0 0 12px",
  },
  successText: {
    fontSize: 15,
    color: "#6b7280",
    lineHeight: 1.6,
    margin: 0,
  },
};

import { useState, FormEvent } from "react";

const DAY1_SPEAKERS = [
  { key: "sp", name: "Prof. Shankar Prakash", topic: "AI Foundations & Strategic Thinking" },
  { key: "rt", name: "Ravi Tanniru", topic: "AI Use Cases for Indian SMEs" },
  { key: "ae", name: "Abhishek Ekbote", topic: "Implementing AI in Business Operations" },
  { key: "pa", name: "Pavan Adipuram", topic: "Business Dashboard & Data Decisions" },
  { key: "vr", name: "Venkatesh Rajendran", topic: "AI-Driven Growth Strategy" },
];

const DAY2_SPEAKERS = [
  { key: "ar", name: "Arjun Reddy", topic: "Agentic AI Building" },
];

const ALL_SPEAKERS = [...DAY1_SPEAKERS, ...DAY2_SPEAKERS];

type SessionFeedback = { rating: string; response: string };

type FormState = {
  name: string;
  day1Feedback: string;
  day2Feedback: string;
  sessions: Record<string, SessionFeedback>;
  futureImprovements: string;
  overallFeedback: string;
};

const RatingButtons = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div style={{ display: "flex", gap: 8 }}>
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        onClick={() => onChange(String(n))}
        style={{
          width: 44,
          height: 44,
          borderRadius: 8,
          border: value === String(n) ? "2px solid #007787" : "1.5px solid #d1d5db",
          background: value === String(n) ? "#007787" : "white",
          color: value === String(n) ? "white" : "#374151",
          fontWeight: 700,
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        {n}
      </button>
    ))}
  </div>
);

const DayDivider = ({ label }: { label: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "8px 0 16px" }}>
    <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
    <span style={{ fontSize: 12, fontWeight: 700, color: "#007787", textTransform: "uppercase", letterSpacing: "0.1em", background: "#f3f4f6", padding: "4px 14px", borderRadius: 20, border: "1px solid #d1fae5" }}>
      {label}
    </span>
    <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
  </div>
);

export default function WorkshopFeedback() {
  const [form, setForm] = useState<FormState>({
    name: "",
    day1Feedback: "",
    day2Feedback: "",
    sessions: Object.fromEntries(ALL_SPEAKERS.map((sp) => [sp.key, { rating: "", response: "" }])),
    futureImprovements: "",
    overallFeedback: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const setSession = (key: string, field: keyof SessionFeedback, value: string) => {
    setForm((prev) => ({
      ...prev,
      sessions: { ...prev.sessions, [key]: { ...prev.sessions[key], [field]: value } },
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    for (const sp of ALL_SPEAKERS) {
      if (!form.sessions[sp.key].rating) {
        setError(`Please rate the session by ${sp.name}.`);
        return;
      }
    }
    setError("");
    setSubmitting(true);
    try {
      const payload = {
        participant_name: form.name || null,
        day1_feedback: form.day1Feedback || null,
        day2_feedback: form.day2Feedback || null,
        ...Object.fromEntries(
          ALL_SPEAKERS.flatMap((sp) => [
            [`${sp.key}_rating`, parseInt(form.sessions[sp.key].rating)],
            [`${sp.key}_response`, form.sessions[sp.key].response || null],
          ])
        ),
        future_improvements: form.futureImprovements || null,
        overall_feedback: form.overallFeedback || null,
      };
      const res = await fetch("/api/submit-workshop-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
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
          <div style={{ fontSize: 52, marginBottom: 20 }}>✅</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", margin: "0 0 12px" }}>
            Thank you!
          </h1>
          <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
            Your feedback helps us make REDESIGN-ai better for the next cohort.
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
          <div style={s.badge}>REDESIGN-ai · Day 1 & Day 2</div>
          <h1 style={s.title}>Workshop Feedback</h1>
          <p style={s.subtitle}>Share your honest feedback — takes about 5 minutes.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div style={s.card}>
            <label style={s.label}>Your Name <span style={s.opt}>(optional)</span></label>
            <input
              style={s.input}
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
          </div>

          {/* Day 1 */}
          <DayDivider label="Day 1" />

          <div style={s.card}>
            <label style={s.label}>Overall Day 1 Feedback <span style={s.opt}>(optional)</span></label>
            <textarea
              style={s.textarea}
              rows={3}
              placeholder="How was your overall Day 1 experience? Any highlights or suggestions..."
              value={form.day1Feedback}
              onChange={(e) => setForm((p) => ({ ...p, day1Feedback: e.target.value }))}
            />
          </div>

          {DAY1_SPEAKERS.map((speaker, idx) => (
            <div key={speaker.key} style={s.card}>
              <div style={s.sessionHeader}>
                <div style={s.sessionNum}>{String(idx + 1).padStart(2, "0")}</div>
                <div>
                  <div style={s.speakerName}>{speaker.name}</div>
                  <div style={s.speakerTopic}>{speaker.topic}</div>
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={s.ratingLabel}>Rate this session <span style={s.req}>*</span></label>
                <div style={s.ratingHint}>1 = Poor &nbsp;·&nbsp; 5 = Excellent</div>
                <RatingButtons
                  value={form.sessions[speaker.key].rating}
                  onChange={(v) => setSession(speaker.key, "rating", v)}
                />
              </div>
              <div>
                <label style={s.label}>Your thoughts <span style={s.opt}>(optional)</span></label>
                <textarea
                  style={s.textarea}
                  rows={2}
                  placeholder="What did you find most useful? Any feedback for the speaker?"
                  value={form.sessions[speaker.key].response}
                  onChange={(e) => setSession(speaker.key, "response", e.target.value)}
                />
              </div>
            </div>
          ))}

          {/* Day 2 */}
          <DayDivider label="Day 2" />

          <div style={s.card}>
            <label style={s.label}>Overall Day 2 Feedback <span style={s.opt}>(optional)</span></label>
            <textarea
              style={s.textarea}
              rows={3}
              placeholder="How was your overall Day 2 experience? Any highlights or suggestions..."
              value={form.day2Feedback}
              onChange={(e) => setForm((p) => ({ ...p, day2Feedback: e.target.value }))}
            />
          </div>

          {DAY2_SPEAKERS.map((speaker) => (
            <div key={speaker.key} style={s.card}>
              <div style={s.sessionHeader}>
                <div style={{ ...s.sessionNum, background: "#1d4ed8" }}>06</div>
                <div>
                  <div style={s.speakerName}>{speaker.name}</div>
                  <div style={s.speakerTopic}>{speaker.topic}</div>
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={s.ratingLabel}>Rate this session <span style={s.req}>*</span></label>
                <div style={s.ratingHint}>1 = Poor &nbsp;·&nbsp; 5 = Excellent</div>
                <RatingButtons
                  value={form.sessions[speaker.key].rating}
                  onChange={(v) => setSession(speaker.key, "rating", v)}
                />
              </div>
              <div>
                <label style={s.label}>Your thoughts <span style={s.opt}>(optional)</span></label>
                <textarea
                  style={s.textarea}
                  rows={2}
                  placeholder="What did you find most useful? Any feedback for the speaker?"
                  value={form.sessions[speaker.key].response}
                  onChange={(e) => setSession(speaker.key, "response", e.target.value)}
                />
              </div>
            </div>
          ))}

          {/* Overall */}
          <DayDivider label="Overall" />

          <div style={s.card}>
            <label style={s.label}>
              What can be improved for future cohorts? <span style={s.opt}>(optional)</span>
            </label>
            <textarea
              style={s.textarea}
              rows={3}
              placeholder="Content, format, pacing, logistics, topics you'd like added..."
              value={form.futureImprovements}
              onChange={(e) => setForm((p) => ({ ...p, futureImprovements: e.target.value }))}
            />
          </div>

          <div style={s.card}>
            <label style={s.label}>
              Overall feedback on the 2-day workshop <span style={s.opt}>(optional)</span>
            </label>
            <textarea
              style={s.textarea}
              rows={4}
              placeholder="Any final thoughts on the full workshop — what worked, what didn't, what you'll take back to your business..."
              value={form.overallFeedback}
              onChange={(e) => setForm((p) => ({ ...p, overallFeedback: e.target.value }))}
            />
          </div>

          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "12px 16px", borderRadius: 8, fontSize: 14, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={submitting} style={s.submitBtn}>
            {submitting ? "Submitting..." : "Submit Feedback →"}
          </button>
        </form>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#f3f4f6", fontFamily: "system-ui, -apple-system, sans-serif", padding: "40px 16px 80px" },
  container: { maxWidth: 680, margin: "0 auto" },
  header: { textAlign: "center", marginBottom: 32 },
  badge: { display: "inline-block", background: "#007787", color: "white", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 20, marginBottom: 12 },
  title: { fontSize: 32, fontWeight: 800, color: "#111", margin: "0 0 10px" },
  subtitle: { fontSize: 15, color: "#6b7280", margin: 0 },
  card: { background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: "24px", marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" },
  sessionHeader: { display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #f3f4f6" },
  sessionNum: { width: 36, height: 36, background: "#007787", color: "white", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0 },
  speakerName: { fontWeight: 700, fontSize: 16, color: "#111", marginBottom: 3 },
  speakerTopic: { fontSize: 13, color: "#6b7280" },
  ratingLabel: { display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 4 },
  ratingHint: { fontSize: 11, color: "#9ca3af", marginBottom: 10 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 },
  input: { width: "100%", padding: "10px 12px", fontSize: 14, border: "1.5px solid #e5e7eb", borderRadius: 8, outline: "none", boxSizing: "border-box", fontFamily: "system-ui, sans-serif", background: "white" },
  textarea: { width: "100%", padding: "10px 12px", fontSize: 14, border: "1.5px solid #e5e7eb", borderRadius: 8, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "system-ui, sans-serif" },
  opt: { fontWeight: 400, color: "#9ca3af", fontSize: 12 },
  req: { color: "#ef4444" },
  submitBtn: { width: "100%", padding: "14px", background: "#007787", color: "white", border: "none", borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: "pointer" },
  successWrap: { maxWidth: 440, margin: "80px auto", background: "white", borderRadius: 16, padding: "48px 40px", textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" },
};

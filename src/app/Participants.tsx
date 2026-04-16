import { useState, useEffect, useRef, useCallback } from "react";

const PARTICIPANTS_PASSWORD_KEY = "redesign_participants_pw";

type Participant = {
  id: string;
  full_name: string;
  designation: string;
  company_name: string;
  industry: string;
  city: string;
  team_size: string;
  workshop_goals: string[] | string;
  specific_tools: string;
  current_ai_usage: string;
  biggest_challenge: string;
  status: string;
  participant_type: string | null;
  email: string;
  phone: string;
};

const AV_COLORS = [
  ["#0D9E6E","#0D1F35"],["#F5A623","#1A0F00"],["#7C5CBF","#1A1040"],
  ["#E85D3C","#2A0F08"],["#38bdf8","#051520"],["#94A3B8","#15202E"],
  ["#0BB87F","#082A1E"],["#F97316","#1F0E00"],["#A78BFA","#1A1040"],
];

function getAvatar(name: string) {
  const i = (name || "?").charCodeAt(0) % AV_COLORS.length;
  const [bg, fg] = AV_COLORS[i];
  const init = (name || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return { bg, fg, init };
}

const IND_COLOR_MAP: Record<string, string> = {
  IT: "#0D9E6E", Software: "#38bdf8", Tech: "#38bdf8", Manufactur: "#F5A623",
  Health: "#E85D3C", Pharma: "#E85D3C", Consult: "#7C5CBF", Finance: "#7C5CBF",
  Banking: "#7C5CBF", "Real Estate": "#94A3B8", Construct: "#94A3B8",
  Telecom: "#F97316", Distribution: "#F97316", Logistics: "#F97316",
  Education: "#A78BFA", Retail: "#F5A623",
};
function getIndColor(ind: string) {
  if (!ind) return "#94A3B8";
  const key = Object.keys(IND_COLOR_MAP).find(k => ind.toLowerCase().includes(k.toLowerCase()));
  return key ? IND_COLOR_MAP[key] : "#94A3B8";
}

function inferSeniority(desig: string) {
  if (!desig) return "ic";
  const x = desig.toLowerCase();
  if (/\b(ceo|cfo|cto|coo|cmo|md|managing director|founder|co-founder|cofounder|president|director|partner|proprietor|owner)\b/.test(x)) return "c";
  if (/\b(vp|vice president|avp|svp|head|global head|senior director|principal)\b/.test(x)) return "vp";
  if (/\b(manager|lead|product manager|team lead|senior|sme)\b/.test(x)) return "mgr";
  return "ic";
}
const SEN_LABEL: Record<string, string> = { c: "C-Suite/Founder", vp: "VP / Head", mgr: "Manager / Lead", ic: "Individual" };
const SEN_COLORS: Record<string, string> = { "C-Suite/Founders": "#F5A623", "VP/Head Level": "#0D9E6E", "Manager/Lead": "#94A3B8", "Individual": "#7C5CBF" };
const SEN_MAP: Record<string, string> = { c: "C-Suite/Founders", vp: "VP/Head Level", mgr: "Manager/Lead", ic: "Individual" };

const GOAL_KEYWORDS = ["prompt engineering","automation","ai agents","chatgpt","ai tools","ai strategy","workflow","productivity","use cases","implementation","build ai","generative ai"];

export default function Participants() {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [indFilter, setIndFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeCompany, setActiveCompany] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const donutRef = useRef<HTMLCanvasElement>(null);
  const passwordRef = useRef("");

  const fetchParticipants = useCallback(async (pw: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/get-participants", {
        headers: { "x-admin-password": pw },
      });
      if (res.status === 401) { setPwError(true); setAuthed(false); setLoading(false); return; }
      if (!res.ok) throw new Error("Failed to fetch");
      const data: Participant[] = await res.json();
      setParticipants(data);
      setLastRefresh(new Date());
    } catch {
      setError("Failed to load participants. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = () => {
    const pw = pwInput.trim();
    if (!pw) return;
    passwordRef.current = pw;
    sessionStorage.setItem(PARTICIPANTS_PASSWORD_KEY, pw);
    setAuthed(true);
    fetchParticipants(pw);
  };

  useEffect(() => {
    // Check participants-specific session first, then fall back to admin session
    const saved = sessionStorage.getItem(PARTICIPANTS_PASSWORD_KEY) || sessionStorage.getItem("redesign_admin_pw");
    if (saved) {
      passwordRef.current = saved;
      setAuthed(true);
      fetchParticipants(saved);
    }
  }, [fetchParticipants]);

  // Auto-refresh every 60s
  useEffect(() => {
    if (!authed) return;
    const interval = setInterval(() => fetchParticipants(passwordRef.current), 60000);
    return () => clearInterval(interval);
  }, [authed, fetchParticipants]);

  function getFiltered() {
    return participants.filter(p => {
      if (typeFilter !== "all" && p.status !== typeFilter) return false;
      if (indFilter !== "all" && (p.industry || "") !== indFilter) return false;
      if (activeCompany && p.company_name !== activeCompany) return false;
      if (search) {
        const q = search.toLowerCase();
        return [p.full_name, p.company_name, p.designation, p.city, p.industry].join(" ").toLowerCase().includes(q);
      }
      return true;
    });
  }

  // Draw donut chart
  useEffect(() => {
    if (!donutRef.current || participants.length === 0) return;
    const P = getFiltered();
    const n = P.length;
    if (n === 0) return;
    const senCts: Record<string, number> = {};
    P.forEach(p => { const l = SEN_MAP[inferSeniority(p.designation)]; senCts[l] = (senCts[l] || 0) + 1; });
    const senE = Object.entries(senCts).filter(([, v]) => v > 0);
    const cv = donutRef.current;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, 130, 130);
    let sa = -Math.PI / 2;
    senE.forEach(([lbl, val]) => {
      const sl = (val / n) * Math.PI * 2;
      ctx.beginPath(); ctx.moveTo(65, 65); ctx.arc(65, 65, 52, sa, sa + sl); ctx.closePath();
      ctx.fillStyle = SEN_COLORS[lbl] || "#94A3B8"; ctx.fill(); sa += sl;
    });
    ctx.beginPath(); ctx.arc(65, 65, 32, 0, Math.PI * 2); ctx.fillStyle = "#152B47"; ctx.fill();
    ctx.fillStyle = "#fff"; ctx.font = "bold 18px serif"; ctx.textAlign = "center"; ctx.fillText(String(n), 65, 69);
    ctx.fillStyle = "#94A3B8"; ctx.font = "10px sans-serif"; ctx.fillText("people", 65, 81);
  });

  const handleCopyAll = () => {
    const url = `${window.location.origin}/participants`;
    const text = `REDESIGN-AI Participant Dashboard\n\nURL: ${url}\nPassword: redesign2026`;
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
  };

  if (!authed) {
    return (
      <div style={s.loginWrap}>
        <div style={s.loginBox}>
          <div style={s.loginIcon}>📋</div>
          <h2 style={s.loginTitle}>REDESIGN-AI · Participant Dashboard</h2>
          <p style={s.loginSub}>Enter the access password to view participant data</p>
          <input
            style={s.loginInput}
            type="password"
            placeholder="Enter password"
            value={pwInput}
            onChange={e => { setPwInput(e.target.value); setPwError(false); }}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            autoFocus
          />
          {pwError && <div style={s.loginErr}>Incorrect password — please check with the organiser</div>}
          <button style={s.loginBtn} onClick={handleLogin}>View Dashboard →</button>
        </div>
      </div>
    );
  }

  const filtered = getFiltered();
  const P = participants;
  const n = filtered.length;
  const total = P.length;

  const companies: Record<string, number> = {};
  const industries: Record<string, number> = {};
  filtered.forEach(p => {
    if (p.company_name) companies[p.company_name] = (companies[p.company_name] || 0) + 1;
    if (p.industry) industries[p.industry] = (industries[p.industry] || 0) + 1;
  });
  const allCompanies: Record<string, number> = {};
  P.forEach(p => { if (p.company_name) allCompanies[p.company_name] = (allCompanies[p.company_name] || 0) + 1; });
  const allIndustries = [...new Set(P.map(p => p.industry).filter(Boolean))].sort();
  const cSuite = filtered.filter(p => inferSeniority(p.designation) === "c").length;
  const cities = [...new Set(filtered.map(p => p.city).filter(Boolean))];
  const paid = P.filter(p => p.status === "paid").length;
  const comp = P.filter(p => p.status === "complimentary").length;

  const indSorted = Object.entries(industries).sort((a, b) => b[1] - a[1]);
  const maxI = indSorted[0]?.[1] || 1;

  const senCts: Record<string, number> = {};
  filtered.forEach(p => { const l = SEN_MAP[inferSeniority(p.designation)]; senCts[l] = (senCts[l] || 0) + 1; });
  const senE = Object.entries(senCts).filter(([, v]) => v > 0);

  const compSorted = Object.entries(allCompanies).sort((a, b) => b[1] - a[1]);

  const gkw: Record<string, number> = {};
  P.forEach(p => {
    const goals = Array.isArray(p.workshop_goals) ? p.workshop_goals.join(" ") : (p.workshop_goals || "");
    const t = goals.toLowerCase();
    GOAL_KEYWORDS.forEach(k => { if (t.includes(k)) gkw[k] = (gkw[k] || 0) + 1; });
  });
  const topGoals = Object.entries(gkw).sort((a, b) => b[1] - a[1]).slice(0, 8);

  const toolMap: Record<string, number> = {};
  P.forEach(p => {
    const tools = p.specific_tools || p.current_ai_usage || "";
    tools.split(/[,;\/\n|]+/).forEach(t => {
      const tool = t.trim();
      if (tool.length > 1 && tool.length < 50) toolMap[tool] = (toolMap[tool] || 0) + 1;
    });
  });
  const topTools = Object.entries(toolMap).sort((a, b) => b[1] - a[1]).slice(0, 20);

  const shareUrl = `${window.location.origin}/participants`;

  return (
    <div style={s.page}>
      {/* SHARE MODAL */}
      {showShare && (
        <div style={s.modalOverlay} onClick={() => setShowShare(false)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <div style={s.modalTitle}>🔗 Share Participant Dashboard</div>
            <p style={s.modalDesc}>Anyone with this link and password can view the participant list. They cannot access the full CRM.</p>
            <div style={s.shareField}>
              <div style={s.shareLabel}>Dashboard URL</div>
              <div style={s.shareValue}>{shareUrl}</div>
            </div>
            <div style={s.shareField}>
              <div style={s.shareLabel}>Access Password</div>
              <div style={s.shareValue} id="share-pw">redesign2026</div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button style={s.copyBtn} onClick={handleCopyAll}>
                {copied ? "✅ Copied!" : "📋 Copy Link + Password"}
              </button>
              <button style={s.closeBtn} onClick={() => setShowShare(false)}>Close</button>
            </div>
            <p style={s.modalNote}>To change the password, update <code>PARTICIPANTS_PASSWORD</code> in Vercel environment variables.</p>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div style={s.header}>
        <div>
          <h1 style={s.headerTitle}>REDESIGN<span style={{ color: "#0D9E6E" }}>-AI</span> · Participant Dashboard</h1>
          <p style={s.headerSub}>Cohort Profiling & Event Intelligence · April 18–19, 2026 · ISB Hyderabad</p>
        </div>
        <div style={s.headerRight}>
          <div style={s.headerBadge}>{total} Participants · Confirmed</div>
          <button style={s.shareBtn} onClick={() => setShowShare(true)}>🔗 Share</button>
          <button style={s.reloadBtn} onClick={() => fetchParticipants(passwordRef.current)}>
            {loading ? "Refreshing…" : "↻ Refresh"}
          </button>
          {lastRefresh && <span style={s.lastRefresh}>Updated {lastRefresh.toLocaleTimeString()}</span>}
          <a href="/admin" style={s.adminLink}>← CRM</a>
        </div>
      </div>

      <div style={s.main}>
        {error && <div style={s.errorBanner}>{error}</div>}

        {/* TYPE FILTER */}
        <div style={s.typeRow}>
          {(["all","paid","complimentary"] as const).map(t => (
            <button key={t} style={{ ...s.typeBtn, ...(typeFilter === t ? s.typeBtnActive : {}) }}
              onClick={() => setTypeFilter(t)}>
              {t === "all" ? `All (${total})` : t === "paid" ? `✅ Paid (${paid})` : `🎁 Complimentary (${comp})`}
            </button>
          ))}
        </div>

        {/* STATS */}
        <div style={s.statsGrid}>
          {[
            { label: "Total Participants", val: n, sub: "In current view", color: "#0D9E6E" },
            { label: "Companies", val: Object.keys(companies).length, sub: `Across ${Object.keys(industries).length} industries`, color: "#F5A623" },
            { label: "C-Suite / Founders", val: cSuite, sub: `${n > 0 ? Math.round(cSuite/n*100) : 0}% of cohort`, color: "#E85D3C" },
            { label: "Industries", val: Object.keys(industries).length, sub: "Diverse sector mix", color: "#7C5CBF" },
            { label: "Cities", val: cities.length, sub: cities.slice(0, 3).join(" · ") || "—", color: "#94A3B8" },
          ].map((st, i) => (
            <div key={i} style={{ ...s.statCard, borderTop: `3px solid ${st.color}` }}>
              <div style={s.statLabel}>{st.label}</div>
              <div style={{ ...s.statVal, color: st.color }}>{st.val}</div>
              <div style={s.statSub}>{st.sub}</div>
            </div>
          ))}
        </div>

        {/* COHORT COMPOSITION */}
        <div style={s.sectionHeader}>
          <span style={s.sectionTitle}>Cohort Composition</span>
          <div style={s.sectionLine} />
        </div>
        <div style={s.chartsRow}>
          <div style={s.chartCard}>
            <div style={s.chartTitle}>Industry Breakdown</div>
            {indSorted.length === 0 ? <div style={s.empty}>No data</div> :
              indSorted.map(([ind, cnt]) => {
                const c = getIndColor(ind);
                const pct = ((cnt / maxI) * 100).toFixed(0);
                return (
                  <div key={ind} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ fontSize: 11, color: "#94A3B8", width: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flexShrink: 0 }} title={ind}>{ind}</div>
                      <div style={{ flex: 1, height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: c, borderRadius: 4 }} />
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 600, width: 20, textAlign: "right", color: c }}>{cnt}</div>
                    </div>
                  </div>
                );
              })
            }
          </div>

          <div style={s.chartCard}>
            <div style={s.chartTitle}>Seniority Level</div>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <canvas ref={donutRef} width={130} height={130} />
              <div style={{ flex: 1 }}>
                {senE.map(([lbl, val]) => (
                  <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: SEN_COLORS[lbl] || "#94A3B8", flexShrink: 0 }} />
                    <div style={{ fontSize: 11, color: "#94A3B8", flex: 1 }}>{lbl}</div>
                    <div style={{ fontSize: 11, fontWeight: 600 }}>{val} <span style={{ color: "#94A3B8", fontWeight: 400 }}>({n > 0 ? Math.round(val/n*100) : 0}%)</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={s.chartCard}>
            <div style={s.chartTitle}>Companies Represented</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {compSorted.map(([comp, cnt]) => {
                const short = comp.replace(/private limited|pvt\.?\s*ltd\.?|llp|technologies|technolog|tech\b/gi, "").trim();
                const isActive = activeCompany === comp;
                return (
                  <div key={comp}
                    onClick={() => setActiveCompany(isActive ? null : comp)}
                    style={{ background: isActive ? "rgba(13,158,110,0.18)" : "rgba(255,255,255,0.05)", border: `1px solid ${isActive ? "#0D9E6E" : "rgba(255,255,255,0.08)"}`, borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                    <span style={{ fontSize: 11, color: "#fff" }}>{short || comp}</span>
                    <span style={{ background: "#0D9E6E", color: "#fff", fontSize: 10, fontWeight: 600, borderRadius: 10, padding: "1px 7px" }}>{cnt}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* GOALS & AI */}
        <div style={s.sectionHeader}>
          <span style={s.sectionTitle}>Workshop Goals & AI Readiness</span>
          <div style={s.sectionLine} />
        </div>
        <div style={s.goalsRow}>
          <div style={s.goalCard}>
            <div style={s.chartTitle}>🎯 Top Workshop Goals</div>
            {topGoals.length === 0 ? <div style={s.empty}>No goals data</div> :
              topGoals.map(([k, c]) => (
                <div key={k} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0D9E6E", marginTop: 5, flexShrink: 0 }} />
                  <div style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.5 }}>
                    <strong style={{ color: "#fff" }}>{c} participant{c > 1 ? "s" : ""}</strong> mentioned <strong style={{ color: "#fff" }}>{k}</strong>
                  </div>
                </div>
              ))
            }
          </div>
          <div style={s.goalCard}>
            <div style={s.chartTitle}>🤖 Current AI Tool Usage</div>
            <div style={{ display: "flex", flexWrap: "wrap", paddingTop: 4 }}>
              {topTools.length === 0 ? <div style={s.empty}>No tools data</div> :
                topTools.map(([t, c]) => (
                  <span key={t} style={{ display: "inline-block", background: "rgba(124,92,191,0.15)", color: "#A78BFA", fontSize: 10, padding: "3px 10px", borderRadius: 10, margin: 3 }}>
                    {t} ({c})
                  </span>
                ))
              }
            </div>
          </div>
        </div>

        {/* PARTICIPANT CARDS */}
        <div style={s.sectionHeader}>
          <span style={s.sectionTitle}>
            All Participants
            <span style={{ display: "inline-block", background: "rgba(13,158,110,0.15)", color: "#0BB87F", fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 10, marginLeft: 8 }}>{filtered.length}</span>
          </span>
          <div style={s.sectionLine} />
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
          <button style={{ ...s.filterBtn, ...(indFilter === "all" ? s.filterBtnActive : {}) }} onClick={() => { setIndFilter("all"); setActiveCompany(null); }}>All</button>
          {allIndustries.map(ind => (
            <button key={ind} style={{ ...s.filterBtn, ...(indFilter === ind ? s.filterBtnActive : {}) }}
              onClick={() => { setIndFilter(ind); setActiveCompany(null); }}>
              {ind.length > 20 ? ind.slice(0, 18) + "…" : ind}
            </button>
          ))}
          <input style={s.searchInput} type="text" placeholder="🔍  Search name, company, role..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {loading && <div style={s.empty}>Loading participants…</div>}
        {!loading && filtered.length === 0 && <div style={s.empty}>No participants match the current filter.</div>}

        <div style={s.participantGrid}>
          {filtered.map((p) => {
            const av = getAvatar(p.full_name);
            const color = getIndColor(p.industry);
            const sen = inferSeniority(p.designation);
            const senColors: Record<string, { bg: string; color: string }> = {
              c: { bg: "rgba(245,166,35,.2)", color: "#F5A623" },
              vp: { bg: "rgba(13,158,110,.2)", color: "#0BB87F" },
              mgr: { bg: "rgba(148,163,184,.15)", color: "#94A3B8" },
              ic: { bg: "rgba(124,92,191,.15)", color: "#A78BFA" },
            };
            const sc = senColors[sen] || senColors.ic;
            return (
              <div key={p.id} style={s.pCard}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: av.bg, color: av.fg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, flexShrink: 0 }}>
                    {av.init}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3, color: "#fff" }}>{p.full_name}</div>
                    <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{p.designation || "—"}</div>
                  </div>
                  <div style={{ fontSize: 10, padding: "3px 8px", borderRadius: 10, fontWeight: 600, flexShrink: 0, background: p.status === "paid" ? "rgba(13,158,110,0.2)" : "rgba(190,24,93,0.2)", color: p.status === "paid" ? "#0BB87F" : "#f472b6" }}>
                    {p.status === "paid" ? "✅ Paid" : "🎁 Comp"}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 11, opacity: 0.5 }}>🏢</span>
                  <span style={{ fontSize: 11, color: "#94A3B8" }}>{p.company_name || "—"}</span>
                </div>
                {p.city && <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}><span style={{ fontSize: 11, opacity: 0.5 }}>📍</span><span style={{ fontSize: 11, color: "#94A3B8" }}>{p.city}</span></div>}
                {p.team_size && <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}><span style={{ fontSize: 11, opacity: 0.5 }}>👥</span><span style={{ fontSize: 11, color: "#94A3B8" }}>{p.team_size} employees</span></div>}
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 8 }}>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, fontWeight: 500, background: `${color}22`, color }}>{p.industry || "—"}</span>
                  <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", ...sc }}>{SEN_LABEL[sen]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: { fontFamily: "'DM Sans', sans-serif", background: "#0D1F35", color: "#fff", minHeight: "100vh", WebkitFontSmoothing: "antialiased" },
  loginWrap: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#0D1F35" },
  loginBox: { background: "#152B47", border: "2px dashed rgba(13,158,110,0.4)", borderRadius: 20, padding: "60px 40px", maxWidth: 440, width: "100%", textAlign: "center" },
  loginIcon: { fontSize: 48, marginBottom: 16 },
  loginTitle: { fontFamily: "serif", fontSize: 22, marginBottom: 8, color: "#fff" },
  loginSub: { fontSize: 13, color: "#94A3B8", lineHeight: 1.6, marginBottom: 24 },
  loginInput: { width: "100%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 16px", fontSize: 14, color: "#fff", outline: "none", marginBottom: 12, fontFamily: "DM Sans, sans-serif" },
  loginErr: { fontSize: 12, color: "#f87171", marginBottom: 10 },
  loginBtn: { width: "100%", background: "#0D9E6E", color: "#fff", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "DM Sans, sans-serif" },
  header: { background: "linear-gradient(135deg, #0D1F35 0%, #1A3352 100%)", borderBottom: "1px solid rgba(13,158,110,0.2)", padding: "24px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 },
  headerTitle: { fontFamily: "serif", fontSize: 24, letterSpacing: -0.5, color: "#fff" },
  headerSub: { fontSize: 13, color: "#94A3B8", marginTop: 2 },
  headerRight: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" },
  headerBadge: { background: "rgba(13,158,110,0.15)", border: "1px solid rgba(13,158,110,0.3)", borderRadius: 20, padding: "6px 16px", fontSize: 12, color: "#0BB87F", fontWeight: 500 },
  shareBtn: { background: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.4)", borderRadius: 20, padding: "6px 16px", fontSize: 12, color: "#F5A623", cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontWeight: 600 },
  reloadBtn: { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: "6px 14px", fontSize: 12, color: "#94A3B8", cursor: "pointer", fontFamily: "DM Sans, sans-serif" },
  lastRefresh: { fontSize: 11, color: "#94A3B8" },
  adminLink: { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: "6px 14px", fontSize: 12, color: "#94A3B8", textDecoration: "none", fontWeight: 500 },
  main: { padding: "32px 40px", maxWidth: 1400, margin: "0 auto" },
  errorBanner: { background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 10, padding: "10px 16px", fontSize: 13, color: "#f87171", marginBottom: 20 },
  typeRow: { display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" },
  typeBtn: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "8px 20px", fontSize: 13, color: "#94A3B8", cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontWeight: 500 },
  typeBtnActive: { background: "rgba(13,158,110,0.15)", border: "1px solid #0D9E6E", color: "#0BB87F" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 32 },
  statCard: { background: "#152B47", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 20 },
  statLabel: { fontSize: 11, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 },
  statVal: { fontFamily: "serif", fontSize: 36, lineHeight: 1 },
  statSub: { fontSize: 11, color: "#94A3B8", marginTop: 4 },
  sectionHeader: { display: "flex", alignItems: "center", gap: 10, marginBottom: 16, marginTop: 8 },
  sectionTitle: { fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.5, color: "#94A3B8", whiteSpace: "nowrap" },
  sectionLine: { flex: 1, height: 1, background: "rgba(255,255,255,0.07)" },
  chartsRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 28 },
  chartCard: { background: "#152B47", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 24 },
  chartTitle: { fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 18 },
  goalsRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 },
  goalCard: { background: "#152B47", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 24 },
  filterBtn: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "6px 14px", fontSize: 12, color: "#94A3B8", cursor: "pointer", fontFamily: "DM Sans, sans-serif" },
  filterBtnActive: { background: "rgba(13,158,110,0.15)", border: "1px solid #0D9E6E", color: "#0BB87F" },
  searchInput: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "6px 16px", fontSize: 12, color: "#fff", fontFamily: "DM Sans, sans-serif", outline: "none", minWidth: 220, marginLeft: "auto" },
  participantGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 40 },
  pCard: { background: "#152B47", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 16 },
  empty: { fontSize: 13, color: "#94A3B8", padding: "20px 0" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "#152B47", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 36, maxWidth: 480, width: "90%", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" },
  modalTitle: { fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 10 },
  modalDesc: { fontSize: 13, color: "#94A3B8", lineHeight: 1.6, marginBottom: 24 },
  shareField: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 16px", marginBottom: 12 },
  shareLabel: { fontSize: 10, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  shareValue: { fontSize: 14, fontWeight: 600, color: "#0BB87F", wordBreak: "break-all" },
  copyBtn: { flex: 1, background: "#0D9E6E", color: "#fff", border: "none", borderRadius: 10, padding: "11px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "DM Sans, sans-serif" },
  closeBtn: { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#94A3B8", borderRadius: 10, padding: "11px 20px", fontSize: 14, cursor: "pointer", fontFamily: "DM Sans, sans-serif" },
  modalNote: { fontSize: 11, color: "#94A3B8", marginTop: 16, lineHeight: 1.5 },
};

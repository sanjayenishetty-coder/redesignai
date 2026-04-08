import { useState, useEffect, useCallback } from "react";

const STATUS_OPTIONS = ["new", "contacted", "paid", "attended", "rejected"];

const STATUS_COLORS: Record<string, string> = {
  new: "#2563eb",
  contacted: "#d97706",
  paid: "#16a34a",
  attended: "#7c3aed",
  rejected: "#dc2626",
};

type Lead = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  linkedin_profile: string | null;
  referred_by: string | null;
  company_name: string;
  designation: string;
  industry: string;
  company_website: string | null;
  team_size: string;
  current_ai_usage: string;
  workshop_goals: string[];
  biggest_challenge: string | null;
  specific_tools: string | null;
  status: string;
  notes: string | null;
};

export default function Admin() {
  const [password, setPassword] = useState(() => sessionStorage.getItem("adminPwd") || "");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [emailSending, setEmailSending] = useState<string | null>(null);
  const [emailStatus, setEmailStatus] = useState<Record<string, "sent" | "error">>({});

  const fetchLeads = useCallback(async (pwd: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin-leads", {
        headers: { "x-admin-password": pwd },
      });
      if (res.status === 401) {
        setAuthError("Incorrect password.");
        setAuthed(false);
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setLeads(data);
      setAuthed(true);
      setAuthError("");
      sessionStorage.setItem("adminPwd", pwd);
    } catch {
      setAuthError("Could not connect. Try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("adminPwd");
    if (saved) fetchLeads(saved);
  }, [fetchLeads]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads(password);
  };

  const handleStatusChange = async (id: string, status: string) => {
    setSaving(id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await fetch("/api/update-lead", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": sessionStorage.getItem("adminPwd") || "",
      },
      body: JSON.stringify({ id, status }),
    });
    setSaving(null);
  };

  const handleSaveNotes = async (id: string) => {
    setSaving(id);
    const notes = editNotes[id] ?? leads.find((l) => l.id === id)?.notes ?? "";
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes } : l)));
    await fetch("/api/update-lead", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": sessionStorage.getItem("adminPwd") || "",
      },
      body: JSON.stringify({ id, notes }),
    });
    setSaving(null);
  };

  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzGQmYKdYnUDe3C5E6GzBG3zmF4d7rzxPtBBtp_aRDwpiPUGfC-BWojhd4JebeNkcWi/exec";

  const handleSendEmail = async (lead: Lead) => {
    setEmailSending(lead.id);
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          action: "sendEmail",
          email: lead.email,
          fullName: lead.full_name,
          companyName: lead.company_name,
          designation: lead.designation,
          industry: lead.industry,
          workshopGoals: lead.workshop_goals,
        }),
      });
      setEmailStatus((prev) => ({ ...prev, [lead.id]: "sent" }));
      setTimeout(() => setEmailStatus((prev) => { const n = { ...prev }; delete n[lead.id]; return n; }), 3000);
    } catch {
      setEmailStatus((prev) => ({ ...prev, [lead.id]: "error" }));
      setTimeout(() => setEmailStatus((prev) => { const n = { ...prev }; delete n[lead.id]; return n; }), 3000);
    } finally {
      setEmailSending(null);
    }
  };

  const filtered = leads.filter((l) => {
    const matchesSearch =
      search === "" ||
      [l.full_name, l.email, l.company_name, l.phone, l.city]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    paid: leads.filter((l) => l.status === "paid").length,
    attended: leads.filter((l) => l.status === "attended").length,
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminPwd");
    setAuthed(false);
    setPassword("");
    setLeads([]);
  };

  if (!authed) {
    return (
      <div style={styles.loginWrap}>
        <div style={styles.loginBox}>
          <div style={styles.loginLogo}>REDESIGN</div>
          <h2 style={styles.loginTitle}>Admin Access</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.loginInput}
              autoFocus
            />
            {authError && <p style={styles.loginError}>{authError}</p>}
            <button type="submit" style={styles.loginBtn} disabled={loading}>
              {loading ? "Checking..." : "Enter"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrap}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <span style={styles.headerTitle}>REDESIGN — Leads CRM</span>
          <span style={styles.headerSub}>{leads.length} total applicants</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button onClick={() => fetchLeads(sessionStorage.getItem("adminPwd") || "")} style={styles.refreshBtn}>
            ↻ Refresh
          </button>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Log out
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        {[
          { label: "Total", value: stats.total, color: "#111" },
          { label: "New", value: stats.new, color: STATUS_COLORS.new },
          { label: "Contacted", value: stats.contacted, color: STATUS_COLORS.contacted },
          { label: "Paid", value: stats.paid, color: STATUS_COLORS.paid },
          { label: "Attended", value: stats.attended, color: STATUS_COLORS.attended },
        ].map((s) => (
          <div key={s.label} style={styles.statCard}>
            <div style={{ ...styles.statValue, color: s.color }}>{s.value}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <input
          placeholder="Search by name, email, company, city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="all">All Statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
        <span style={styles.resultCount}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Table */}
      {loading ? (
        <div style={styles.empty}>Loading leads...</div>
      ) : filtered.length === 0 ? (
        <div style={styles.empty}>No leads found.</div>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Contact</th>
                <th style={styles.th}>Company</th>
                <th style={styles.th}>Industry</th>
                <th style={styles.th}>Team</th>
                <th style={styles.th}>City</th>
                <th style={styles.th}>Referred By</th>
                <th style={styles.th}>Applied</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <>
                  <tr
                    key={lead.id}
                    style={{
                      ...styles.row,
                      background: expandedId === lead.id ? "#f0f4ff" : "white",
                    }}
                  >
                    <td style={styles.td}>
                      <div style={styles.name}>{lead.full_name}</div>
                      <div style={styles.desig}>{lead.designation}</div>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.email}>{lead.email}</div>
                      <div style={styles.phone}>{lead.phone}</div>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.company}>{lead.company_name}</div>
                      {lead.company_website && (
                        <a href={lead.company_website} target="_blank" rel="noreferrer" style={styles.link}>
                          website ↗
                        </a>
                      )}
                    </td>
                    <td style={styles.td}>{lead.industry}</td>
                    <td style={styles.td}>{lead.team_size}</td>
                    <td style={styles.td}>{lead.city}</td>
                    <td style={styles.td}>{lead.referred_by || "—"}</td>
                    <td style={styles.td}>
                      {new Date(lead.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td style={styles.td}>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        disabled={saving === lead.id}
                        style={{
                          ...styles.statusSelect,
                          color: STATUS_COLORS[lead.status] || "#111",
                          borderColor: STATUS_COLORS[lead.status] || "#ccc",
                        }}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={styles.td}>
                      <button
                        onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                        style={styles.expandBtn}
                      >
                        {expandedId === lead.id ? "▲ Hide" : "▼ View"}
                      </button>
                    </td>
                  </tr>

                  {expandedId === lead.id && (
                    <tr key={`${lead.id}-detail`} style={{ background: "#f0f4ff" }}>
                      <td colSpan={10} style={styles.detailCell}>
                        <div style={styles.detailGrid}>
                          <div style={styles.detailBlock}>
                            <div style={styles.detailLabel}>AI Usage</div>
                            <div style={styles.detailVal}>{lead.current_ai_usage}</div>
                          </div>
                          <div style={styles.detailBlock}>
                            <div style={styles.detailLabel}>Workshop Goals</div>
                            <div style={styles.detailVal}>
                              {lead.workshop_goals?.length > 0
                                ? lead.workshop_goals.map((g) => (
                                    <span key={g} style={styles.goalTag}>{g}</span>
                                  ))
                                : "—"}
                            </div>
                          </div>
                          <div style={styles.detailBlock}>
                            <div style={styles.detailLabel}>Biggest Challenge</div>
                            <div style={styles.detailVal}>{lead.biggest_challenge || "—"}</div>
                          </div>
                          <div style={styles.detailBlock}>
                            <div style={styles.detailLabel}>Specific Tools</div>
                            <div style={styles.detailVal}>{lead.specific_tools || "—"}</div>
                          </div>
                          {lead.linkedin_profile && (
                            <div style={styles.detailBlock}>
                              <div style={styles.detailLabel}>LinkedIn</div>
                              <a href={lead.linkedin_profile} target="_blank" rel="noreferrer" style={styles.link}>
                                View profile ↗
                              </a>
                            </div>
                          )}
                          <div style={{ ...styles.detailBlock, gridColumn: "1 / -1" }}>
                            <div style={styles.detailLabel}>Internal Notes</div>
                            <textarea
                              rows={3}
                              placeholder="Add notes about this lead..."
                              value={editNotes[lead.id] ?? lead.notes ?? ""}
                              onChange={(e) =>
                                setEditNotes((prev) => ({ ...prev, [lead.id]: e.target.value }))
                              }
                              style={styles.notesArea}
                            />
                            <div style={{ display: "flex", gap: 10, marginTop: 8, alignItems: "center" }}>
                              <button
                                onClick={() => handleSaveNotes(lead.id)}
                                disabled={saving === lead.id}
                                style={styles.saveBtn}
                              >
                                {saving === lead.id ? "Saving..." : "Save Notes"}
                              </button>
                              <button
                                onClick={() => handleSendEmail(lead)}
                                disabled={emailSending === lead.id}
                                style={{
                                  ...styles.emailBtn,
                                  ...(emailStatus[lead.id] === "sent" ? styles.emailBtnSent : {}),
                                  ...(emailStatus[lead.id] === "error" ? styles.emailBtnError : {}),
                                }}
                              >
                                {emailSending === lead.id
                                  ? "Sending..."
                                  : emailStatus[lead.id] === "sent"
                                  ? "✓ Email Sent"
                                  : emailStatus[lead.id] === "error"
                                  ? "✗ Failed"
                                  : "✉ Send Confirmation Email"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  loginWrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f5f5",
    fontFamily: "system-ui, sans-serif",
  },
  loginBox: {
    background: "white",
    padding: "40px 48px",
    borderRadius: 12,
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    width: 360,
    textAlign: "center",
  },
  loginLogo: {
    fontWeight: 800,
    fontSize: 18,
    letterSpacing: "0.15em",
    color: "#111",
    marginBottom: 8,
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: 600,
    color: "#111",
    margin: "0 0 24px",
  },
  loginInput: {
    width: "100%",
    padding: "12px 14px",
    fontSize: 15,
    border: "1.5px solid #ddd",
    borderRadius: 8,
    marginBottom: 8,
    outline: "none",
    boxSizing: "border-box",
  },
  loginError: { color: "#dc2626", fontSize: 13, marginBottom: 8 },
  loginBtn: {
    width: "100%",
    padding: "12px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 8,
  },
  wrap: {
    minHeight: "100vh",
    background: "#f9fafb",
    fontFamily: "system-ui, sans-serif",
    padding: "0 0 60px",
  },
  header: {
    background: "#111",
    color: "white",
    padding: "18px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontWeight: 700, fontSize: 17, marginRight: 16 },
  headerSub: { color: "#aaa", fontSize: 13 },
  refreshBtn: {
    padding: "7px 16px",
    background: "#333",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
  },
  logoutBtn: {
    padding: "7px 16px",
    background: "transparent",
    color: "#aaa",
    border: "1px solid #444",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
  },
  statsRow: {
    display: "flex",
    gap: 16,
    padding: "20px 32px",
    background: "white",
    borderBottom: "1px solid #e5e7eb",
  },
  statCard: {
    flex: 1,
    padding: "14px 20px",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    textAlign: "center",
  },
  statValue: { fontSize: 28, fontWeight: 700 },
  statLabel: { fontSize: 12, color: "#6b7280", marginTop: 2, fontWeight: 500 },
  filters: {
    display: "flex",
    gap: 12,
    padding: "16px 32px",
    alignItems: "center",
    background: "white",
    borderBottom: "1px solid #e5e7eb",
  },
  searchInput: {
    flex: 1,
    padding: "9px 14px",
    fontSize: 14,
    border: "1.5px solid #e5e7eb",
    borderRadius: 8,
    outline: "none",
  },
  filterSelect: {
    padding: "9px 14px",
    fontSize: 14,
    border: "1.5px solid #e5e7eb",
    borderRadius: 8,
    background: "white",
    cursor: "pointer",
  },
  resultCount: { fontSize: 13, color: "#6b7280", whiteSpace: "nowrap" },
  tableWrap: { overflowX: "auto", margin: "24px 32px 0", borderRadius: 12, border: "1px solid #e5e7eb" },
  table: { width: "100%", borderCollapse: "collapse", background: "white" },
  thead: { background: "#f9fafb" },
  th: {
    padding: "11px 14px",
    textAlign: "left",
    fontSize: 11,
    fontWeight: 600,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "1px solid #e5e7eb",
    whiteSpace: "nowrap",
  },
  row: { borderBottom: "1px solid #f3f4f6", cursor: "default" },
  td: { padding: "12px 14px", verticalAlign: "top", fontSize: 13 },
  name: { fontWeight: 600, color: "#111", marginBottom: 2 },
  desig: { color: "#6b7280", fontSize: 12 },
  email: { color: "#2563eb", marginBottom: 2 },
  phone: { color: "#6b7280", fontSize: 12 },
  company: { fontWeight: 500, color: "#111", marginBottom: 2 },
  link: { color: "#2563eb", fontSize: 12, textDecoration: "none" },
  statusSelect: {
    padding: "5px 8px",
    fontSize: 12,
    fontWeight: 600,
    border: "1.5px solid",
    borderRadius: 6,
    background: "white",
    cursor: "pointer",
    outline: "none",
  },
  expandBtn: {
    padding: "5px 10px",
    fontSize: 12,
    background: "#f3f4f6",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  detailCell: { padding: "16px 24px" },
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },
  detailBlock: {},
  detailLabel: { fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", marginBottom: 4 },
  detailVal: { fontSize: 13, color: "#111", lineHeight: 1.5 },
  goalTag: {
    display: "inline-block",
    background: "#ede9fe",
    color: "#5b21b6",
    padding: "2px 8px",
    borderRadius: 4,
    fontSize: 11,
    marginRight: 4,
    marginBottom: 4,
  },
  notesArea: {
    width: "100%",
    padding: "10px 12px",
    fontSize: 13,
    border: "1.5px solid #e5e7eb",
    borderRadius: 8,
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "system-ui, sans-serif",
  },
  saveBtn: {
    marginTop: 8,
    padding: "7px 18px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  empty: { textAlign: "center", padding: 60, color: "#6b7280", fontSize: 15 },
  emailBtn: {
    padding: "7px 18px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  emailBtnSent: { background: "#16a34a" },
  emailBtnError: { background: "#dc2626" },
};

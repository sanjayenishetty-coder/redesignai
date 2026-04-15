import { useState, useEffect, useCallback } from "react";

const STATUS_OPTIONS = ["new", "contacted", "paid", "attended", "rejected", "complimentary", "not interested"];

const PARTICIPANT_TYPES = ["individual", "b2b", "duo", "trio", "co-brand"];
const PARTICIPANT_TYPE_COLORS: Record<string, string> = {
  individual: "#2563eb",
  b2b: "#7c3aed",
  duo: "#0891b2",
  trio: "#16a34a",
  "co-brand": "#d97706",
};

const SOURCE_CHANNELS = [
  "WhatsApp Broadcast",
  "LinkedIn Organic",
  "LinkedIn Ad",
  "Instagram Organic",
  "Instagram Ad",
  "Google Ad",
  "Referral",
  "Email Campaign",
  "Event / In-person",
  "Website Direct",
  "Cold Outreach",
  "Partner Network",
  "Other",
];

const CITY_ALIASES: Record<string, string> = {
  hyderabad: "Hyderabad", hyd: "Hyderabad", "hyd.": "Hyderabad",
  secunderabad: "Hyderabad", secundrabad: "Hyderabad",
  mumbai: "Mumbai", bombay: "Mumbai",
  bangalore: "Bengaluru", bengaluru: "Bengaluru", blr: "Bengaluru", banglore: "Bengaluru",
  delhi: "Delhi", "new delhi": "Delhi", "new deli": "Delhi",
  chennai: "Chennai", madras: "Chennai",
  pune: "Pune",
  kolkata: "Kolkata", calcutta: "Kolkata",
  ahmedabad: "Ahmedabad", ahemdabad: "Ahmedabad",
};

const normalizeCity = (city: string): string => {
  if (!city) return city;
  // Strip suffixes like ", India", ", Telangana", ", Maharashtra", etc.
  const stripped = city.trim().replace(/,\s*(india|telangana|maharashtra|karnataka|tamil nadu|gujarat|rajasthan|up|delhi|wb|ap|andhra pradesh|west bengal|uttar pradesh)$/i, "").trim();
  const key = stripped.toLowerCase();
  return CITY_ALIASES[key] || stripped.replace(/\b\w/g, (c) => c.toUpperCase());
};

const STATUS_COLORS: Record<string, string> = {
  new: "#2563eb",
  contacted: "#d97706",
  paid: "#16a34a",
  attended: "#7c3aed",
  rejected: "#dc2626",
  complimentary: "#be185d",
  "not interested": "#6b7280",
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
  participant_type: string | null;
  source_channel: string | null;
};

type ActivityEntry = {
  id: string;
  action: string;
  details: string | null;
  performed_by: string;
  created_at: string;
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
  const [emailType, setEmailType] = useState<Record<string, string>>({});
  const [deleting, setDeleting] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [csvUploading, setCsvUploading] = useState(false);
  const [csvResult, setCsvResult] = useState<{ added: number; errors: number } | null>(null);
  const [dateFilter, setDateFilter] = useState("");
  const [addForm, setAddForm] = useState({
    full_name: "", email: "", phone: "", city: "",
    company_name: "", designation: "", industry: "",
    team_size: "", referred_by: "", status: "new", notes: "",
    participant_type: "", source_channel: "",
  });
  const [addSaving, setAddSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"leads" | "analytics">("leads");
  const [leadActivity, setLeadActivity] = useState<Record<string, ActivityEntry[]>>({});
  const [activityLoading, setActivityLoading] = useState<string | null>(null);
  const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
  const [editFields, setEditFields] = useState<Partial<Lead>>({});
  const [analyticsStatusFilter, setAnalyticsStatusFilter] = useState("all");
  const [analyticsTypeFilter, setAnalyticsTypeFilter] = useState("all");
  const [analyticsSourceFilter, setAnalyticsSourceFilter] = useState("all");
  const [analyticsDateFrom, setAnalyticsDateFrom] = useState("");
  const [analyticsDateTo, setAnalyticsDateTo] = useState("");

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
    logActivity(id, leads.find(l => l.id === id)?.full_name || "", "Status changed", `→ ${status}`);
  };

  const handleParticipantTypeChange = async (id: string, participant_type: string) => {
    setSaving(id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, participant_type } : l)));
    await fetch("/api/update-lead", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-password": sessionStorage.getItem("adminPwd") || "" },
      body: JSON.stringify({ id, participant_type }),
    });
    setSaving(null);
    logActivity(id, leads.find(l => l.id === id)?.full_name || "", "Type tagged", `→ ${participant_type}`);
  };

  const handleSourceChannelChange = async (id: string, source_channel: string) => {
    setSaving(id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, source_channel } : l)));
    await fetch("/api/update-lead", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-password": sessionStorage.getItem("adminPwd") || "" },
      body: JSON.stringify({ id, source_channel }),
    });
    setSaving(null);
    logActivity(id, leads.find(l => l.id === id)?.full_name || "", "Source tagged", `→ ${source_channel}`);
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
    logActivity(id, leads.find(l => l.id === id)?.full_name || "", "Notes updated");
  };

  const handleSaveEdit = async (id: string) => {
    setSaving(id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...editFields } : l)));
    await fetch("/api/update-lead", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": sessionStorage.getItem("adminPwd") || "",
      },
      body: JSON.stringify({ id, ...editFields }),
    });
    setSaving(null);
    setEditingLeadId(null);
    logActivity(id, (editFields.full_name as string) || leads.find((l) => l.id === id)?.full_name || "", "Lead fields updated");
  };

  const DEFAULT_EMAIL_TYPE: Record<string, string> = {
    new: "payment_reminder",
    contacted: "follow_up",
    paid: "confirmation",
    rejected: "rejection",
    attended: "post_event",
  };

  const EMAIL_TYPE_OPTIONS = [
    { value: "payment_reminder", label: "Payment Reminder" },
    { value: "follow_up", label: "Follow-up" },
    { value: "confirmation", label: "Confirmation" },
    { value: "rejection", label: "Rejection Notice" },
    { value: "post_event", label: "Post-Event Thank You" },
  ];

  const handleSendEmail = async (lead: Lead) => {
    const type = emailType[lead.id] || DEFAULT_EMAIL_TYPE[lead.status] || "confirmation";
    setEmailSending(lead.id);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": sessionStorage.getItem("adminPwd") || "",
        },
        body: JSON.stringify({
          email: lead.email,
          fullName: lead.full_name,
          companyName: lead.company_name,
          designation: lead.designation,
          industry: lead.industry,
          workshopGoals: lead.workshop_goals,
          emailType: type,
        }),
      });
      setEmailStatus((prev) => ({ ...prev, [lead.id]: res.ok ? "sent" : "error" }));
      if (res.ok) {
        logActivity(lead.id, lead.full_name, "Email sent", type);
      }
      setTimeout(() => setEmailStatus((prev) => { const n = { ...prev }; delete n[lead.id]; return n; }), 3000);
    } catch {
      setEmailStatus((prev) => ({ ...prev, [lead.id]: "error" }));
      setTimeout(() => setEmailStatus((prev) => { const n = { ...prev }; delete n[lead.id]; return n; }), 3000);
    } finally {
      setEmailSending(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await fetch("/api/delete-lead", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": sessionStorage.getItem("adminPwd") || "",
        },
        body: JSON.stringify({ id }),
      });
      logActivity(id, name, "Lead deleted");
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch {
      alert("Failed to delete. Try again.");
    } finally {
      setDeleting(null);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = (ids: string[]) => {
    setSelectedIds((prev) => prev.size === ids.length ? new Set() : new Set(ids));
  };

  const handleBulkDelete = async (ids: string[]) => {
    if (!window.confirm(`Delete ${ids.length} selected lead${ids.length > 1 ? "s" : ""}? This cannot be undone.`)) return;
    setBulkDeleting(true);
    try {
      await Promise.all(ids.map((id) =>
        fetch("/api/delete-lead", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-admin-password": sessionStorage.getItem("adminPwd") || "",
          },
          body: JSON.stringify({ id }),
        })
      ));
      setLeads((prev) => prev.filter((l) => !ids.includes(l.id)));
      setSelectedIds(new Set());
    } catch {
      alert("Some deletions failed. Try again.");
    } finally {
      setBulkDeleting(false);
    }
  };

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddSaving(true);
    try {
      const res = await fetch("/api/add-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": sessionStorage.getItem("adminPwd") || "",
        },
        body: JSON.stringify(addForm),
      });
      if (!res.ok) throw new Error("Failed");
      const { data } = await res.json();
      setLeads((prev) => [data[0], ...prev]);
      logActivity(data[0].id, data[0].full_name, "Lead added manually");
      setShowAddModal(false);
      setAddForm({ full_name: "", email: "", phone: "", city: "", company_name: "", designation: "", industry: "", team_size: "", referred_by: "", status: "new", notes: "", participant_type: "", source_channel: "" });
    } catch {
      alert("Failed to add lead. Try again.");
    } finally {
      setAddSaving(false);
    }
  };

  const handleCsvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvUploading(true);
    setCsvResult(null);

    const text = await file.text();
    const lines = text.trim().split("\n");
    const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, "").toLowerCase().replace(/\s+/g, "_"));

    const rows = lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => { obj[h] = values[i] || ""; });
      return obj;
    }).filter((r) => r.email);

    let added = 0;
    let errors = 0;
    for (const row of rows) {
      try {
        const res = await fetch("/api/add-lead", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-password": sessionStorage.getItem("adminPwd") || "",
          },
          body: JSON.stringify(row),
        });
        if (res.ok) { added++; } else { errors++; }
      } catch { errors++; }
    }

    setCsvResult({ added, errors });
    setCsvUploading(false);
    e.target.value = "";
    fetchLeads(sessionStorage.getItem("adminPwd") || "");
  };

  const handleDownloadCsv = () => {
    const cols = [
      "id", "created_at", "full_name", "email", "phone", "city",
      "company_name", "designation", "industry", "team_size",
      "linkedin_profile", "referred_by", "company_website",
      "current_ai_usage", "workshop_goals", "biggest_challenge",
      "specific_tools", "status", "notes",
    ];
    const escape = (v: unknown) => {
      const s = Array.isArray(v) ? v.join("; ") : String(v ?? "");
      return `"${s.replace(/"/g, '""')}"`;
    };
    const rows = [cols.join(","), ...leads.map((l) => cols.map((c) => escape(l[c as keyof typeof l])).join(","))];
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `redesign-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = leads.filter((l) => {
    const matchesSearch =
      search === "" ||
      [l.full_name, l.email, l.company_name, l.phone, l.city]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    const matchesDate = dateFilter === "" || new Date(l.created_at).toISOString().slice(0, 10) === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
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

  const logActivity = async (leadId: string, leadName: string, action: string, details?: string) => {
    try {
      await fetch("/api/log-activity", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": sessionStorage.getItem("adminPwd") || "" },
        body: JSON.stringify({ lead_id: leadId, lead_name: leadName, action, details }),
      });
    } catch { /* silent */ }
  };

  const fetchLeadActivity = async (leadId: string) => {
    setActivityLoading(leadId);
    try {
      const res = await fetch(`/api/get-activity?lead_id=${leadId}`, {
        headers: { "x-admin-password": sessionStorage.getItem("adminPwd") || "" },
      });
      if (res.ok) {
        const data = await res.json();
        setLeadActivity(prev => ({ ...prev, [leadId]: data }));
      }
    } finally {
      setActivityLoading(null);
    }
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
          <button onClick={() => setShowAddModal(true)} style={styles.addBtn}>+ Add Lead</button>
          <button onClick={handleDownloadCsv} style={styles.downloadBtn}>↓ Download CSV</button>
          <label style={styles.csvBtn}>
            {csvUploading ? "Uploading..." : "↑ Upload CSV"}
            <input type="file" accept=".csv" onChange={handleCsvUpload} style={{ display: "none" }} disabled={csvUploading} />
          </label>
          {csvResult && (
            <span style={{ fontSize: 12, color: csvResult.errors > 0 ? "#dc2626" : "#16a34a" }}>
              {csvResult.added} added{csvResult.errors > 0 ? `, ${csvResult.errors} failed` : ""}
            </span>
          )}
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

      {/* Tab Navigation */}
      <div style={styles.tabNav}>
        {(["leads", "analytics"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ ...styles.tabBtn, ...(activeTab === tab ? styles.tabBtnActive : {}) }}>
            {tab === "leads" ? `📋 Leads (${leads.length})` : "📊 Analytics"}
          </button>
        ))}
      </div>

      {activeTab === "leads" && (
        <>
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
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={styles.filterSelect}
              title="Filter by date"
            />
            {dateFilter && (
              <button onClick={() => setDateFilter("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 13 }}>✕ Clear date</button>
            )}
            <span style={styles.resultCount}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
            {selectedIds.size > 0 && (
              <button
                onClick={() => handleBulkDelete(Array.from(selectedIds))}
                disabled={bulkDeleting}
                style={styles.bulkDeleteBtn}
              >
                {bulkDeleting ? "Deleting..." : `🗑 Delete ${selectedIds.size} selected`}
              </button>
            )}
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
                    <th style={{ ...styles.th, width: 36, textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={selectedIds.size === filtered.length && filtered.length > 0}
                        onChange={() => toggleSelectAll(filtered.map((l) => l.id))}
                      />
                    </th>
                    <th style={{ ...styles.th, width: 36, textAlign: "center" }}>#</th>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Contact</th>
                    <th style={styles.th}>Company</th>
                    <th style={styles.th}>Industry</th>
                    <th style={styles.th}>Team</th>
                    <th style={styles.th}>City</th>
                    <th style={styles.th}>Referred By</th>
                    <th style={styles.th}>Applied</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Type</th>
                    <th style={styles.th}>Source</th>
                    <th style={styles.th}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead, idx) => (
                    <>
                      <tr
                        key={lead.id}
                        style={{
                          ...styles.row,
                          background: selectedIds.has(lead.id) ? "#fef9c3" : expandedId === lead.id ? "#f0f4ff" : "white",
                        }}
                      >
                        <td style={{ ...styles.td, textAlign: "center" }}>
                          <input
                            type="checkbox"
                            checked={selectedIds.has(lead.id)}
                            onChange={() => toggleSelect(lead.id)}
                          />
                        </td>
                        <td style={{ ...styles.td, textAlign: "center", color: "#9ca3af", fontSize: 12 }}>
                          {idx + 1}
                        </td>
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
                        <td style={styles.td}>{normalizeCity(lead.city)}</td>
                        <td style={styles.td}>{lead.referred_by || "—"}</td>
                        <td style={styles.td}>
                          <div>{new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
                          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{new Date(lead.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}</div>
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
                          <select
                            value={lead.participant_type || ""}
                            onChange={(e) => handleParticipantTypeChange(lead.id, e.target.value)}
                            disabled={saving === lead.id}
                            style={{
                              ...styles.statusSelect,
                              color: lead.participant_type ? PARTICIPANT_TYPE_COLORS[lead.participant_type] || "#111" : "#9ca3af",
                              borderColor: lead.participant_type ? PARTICIPANT_TYPE_COLORS[lead.participant_type] || "#ccc" : "#e5e7eb",
                            }}
                          >
                            <option value="">— Tag type</option>
                            {PARTICIPANT_TYPES.map((t) => (
                              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                            ))}
                          </select>
                        </td>
                        <td style={styles.td}>
                          <select
                            value={lead.source_channel || ""}
                            onChange={(e) => handleSourceChannelChange(lead.id, e.target.value)}
                            disabled={saving === lead.id}
                            style={{ ...styles.statusSelect, color: lead.source_channel ? "#111" : "#9ca3af", borderColor: lead.source_channel ? "#6b7280" : "#e5e7eb", minWidth: 130 }}
                          >
                            <option value="">— Tag source</option>
                            {SOURCE_CHANNELS.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                        <td style={styles.td}>
                          <button
                            onClick={() => {
                              const newId = expandedId === lead.id ? null : lead.id;
                              setExpandedId(newId);
                              if (newId) fetchLeadActivity(newId);
                            }}
                            style={styles.expandBtn}
                          >
                            {expandedId === lead.id ? "▲ Hide" : "▼ View"}
                          </button>
                        </td>
                      </tr>

                      {expandedId === lead.id && (
                        <tr key={`${lead.id}-detail`} style={{ background: "#f0f4ff" }}>
                          <td colSpan={14} style={styles.detailCell}>
                            {/* Inline Edit Panel */}
                            {editingLeadId === lead.id ? (
                              <div style={{ marginBottom: 20 }}>
                                <div style={{ fontWeight: 700, fontSize: 12, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>✏ Editing Fields</div>
                                <div style={styles.editGrid}>
                                  {([
                                    { label: "Full Name", key: "full_name" },
                                    { label: "Email", key: "email" },
                                    { label: "Phone", key: "phone" },
                                    { label: "City", key: "city" },
                                    { label: "Company", key: "company_name" },
                                    { label: "Designation", key: "designation" },
                                    { label: "Industry", key: "industry" },
                                    { label: "Team Size", key: "team_size" },
                                    { label: "Referred By", key: "referred_by" },
                                    { label: "LinkedIn", key: "linkedin_profile" },
                                    { label: "Website", key: "company_website" },
                                  ] as { label: string; key: keyof Lead }[]).map(({ label, key }) => (
                                    <div key={key}>
                                      <div style={styles.detailLabel}>{label}</div>
                                      <input
                                        style={styles.editInput}
                                        value={(editFields[key] as string) ?? ""}
                                        onChange={(e) => setEditFields((prev) => ({ ...prev, [key]: e.target.value }))}
                                      />
                                    </div>
                                  ))}
                                </div>
                                <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                                  <button onClick={() => handleSaveEdit(lead.id)} disabled={saving === lead.id} style={styles.saveBtn}>
                                    {saving === lead.id ? "Saving..." : "✓ Save Changes"}
                                  </button>
                                  <button onClick={() => setEditingLeadId(null)} style={styles.logoutBtn}>Cancel</button>
                                </div>
                              </div>
                            ) : (
                              <div style={{ marginBottom: 16 }}>
                                <button
                                  onClick={() => { setEditingLeadId(lead.id); setEditFields({ ...lead }); }}
                                  style={styles.editFieldsBtn}
                                >
                                  ✏ Edit Fields
                                </button>
                              </div>
                            )}

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
                                  <select
                                    value={emailType[lead.id] || DEFAULT_EMAIL_TYPE[lead.status] || "confirmation"}
                                    onChange={(e) => setEmailType((prev) => ({ ...prev, [lead.id]: e.target.value }))}
                                    style={styles.emailTypeSelect}
                                  >
                                    {EMAIL_TYPE_OPTIONS.map((o) => (
                                      <option key={o.value} value={o.value}>{o.label}</option>
                                    ))}
                                  </select>
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
                                      ? "✓ Sent"
                                      : emailStatus[lead.id] === "error"
                                      ? "✗ Failed"
                                      : "✉ Send"}
                                  </button>
                                  {lead.phone && (
                                    <a
                                      href={(() => { const num = lead.phone.replace(/[^0-9]/g, ""); const e164 = num.startsWith("91") && num.length === 12 ? num : num.length === 10 ? `91${num}` : num; return `https://wa.me/${e164}?text=${encodeURIComponent(`Hi ${lead.full_name}, this is Sanjay from REDESIGN-ai. `)}`; })()}
                                      target="_blank"
                                      rel="noreferrer"
                                      style={styles.whatsappBtn}
                                    >
                                      💬 WhatsApp
                                    </a>
                                  )}
                                  <button
                                    onClick={() => handleDelete(lead.id, lead.full_name)}
                                    disabled={deleting === lead.id}
                                    style={styles.deleteBtn}
                                  >
                                    {deleting === lead.id ? "Deleting..." : "🗑 Delete"}
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Activity Timeline */}
                            <div style={{ marginTop: 20, borderTop: "1px solid #e5e7eb", paddingTop: 16 }}>
                              <div style={{ fontWeight: 700, fontSize: 12, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Activity Log</div>
                              {activityLoading === lead.id ? (
                                <div style={{ color: "#9ca3af", fontSize: 13 }}>Loading...</div>
                              ) : (leadActivity[lead.id] || []).length === 0 ? (
                                <div style={{ color: "#9ca3af", fontSize: 13 }}>No activity recorded yet.</div>
                              ) : (
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                  {(leadActivity[lead.id] || []).map((entry) => (
                                    <div key={entry.id} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2563eb", marginTop: 5, flexShrink: 0 }} />
                                      <div>
                                        <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{entry.action}</span>
                                        {entry.details && <span style={{ fontSize: 12, color: "#6b7280", marginLeft: 6 }}>— {entry.details}</span>}
                                        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
                                          {new Date(entry.created_at).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} · {entry.performed_by}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
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
        </>
      )}

      {activeTab === "analytics" && (() => {
        const analyticsLeads = leads.filter((l) => {
          if (analyticsStatusFilter !== "all" && l.status !== analyticsStatusFilter) return false;
          if (analyticsTypeFilter !== "all" && (l.participant_type || "") !== analyticsTypeFilter) return false;
          if (analyticsSourceFilter !== "all" && (l.source_channel || "") !== analyticsSourceFilter) return false;
          if (analyticsDateFrom && new Date(l.created_at) < new Date(analyticsDateFrom)) return false;
          if (analyticsDateTo && new Date(l.created_at) > new Date(analyticsDateTo + "T23:59:59")) return false;
          return true;
        });
        const activeFiltersCount = [analyticsStatusFilter, analyticsTypeFilter, analyticsSourceFilter].filter(f => f !== "all").length + (analyticsDateFrom ? 1 : 0) + (analyticsDateTo ? 1 : 0);
        return (
        <div style={styles.analyticsWrap}>
          {/* Analytics Filters */}
          <div style={styles.analyticsFilterBar}>
            <div style={styles.analyticsFilterLabel}>
              🔍 Filter Analytics
              {activeFiltersCount > 0 && (
                <span style={styles.analyticsFilterBadge}>{activeFiltersCount} active</span>
              )}
            </div>
            <div style={styles.analyticsFilterControls}>
              <select value={analyticsStatusFilter} onChange={(e) => setAnalyticsStatusFilter(e.target.value)} style={styles.analyticsFilterSelect}>
                <option value="all">All Statuses</option>
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
              <select value={analyticsTypeFilter} onChange={(e) => setAnalyticsTypeFilter(e.target.value)} style={styles.analyticsFilterSelect}>
                <option value="all">All Types</option>
                {PARTICIPANT_TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
              </select>
              <select value={analyticsSourceFilter} onChange={(e) => setAnalyticsSourceFilter(e.target.value)} style={styles.analyticsFilterSelect}>
                <option value="all">All Sources</option>
                {SOURCE_CHANNELS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <input type="date" value={analyticsDateFrom} onChange={(e) => setAnalyticsDateFrom(e.target.value)} style={styles.analyticsFilterSelect} title="From date" />
              <input type="date" value={analyticsDateTo} onChange={(e) => setAnalyticsDateTo(e.target.value)} style={styles.analyticsFilterSelect} title="To date" />
              {activeFiltersCount > 0 && (
                <button onClick={() => { setAnalyticsStatusFilter("all"); setAnalyticsTypeFilter("all"); setAnalyticsSourceFilter("all"); setAnalyticsDateFrom(""); setAnalyticsDateTo(""); }} style={styles.analyticsClearBtn}>
                  ✕ Clear all
                </button>
              )}
            </div>
            <div style={styles.analyticsFilterResult}>
              Showing <strong>{analyticsLeads.length}</strong> of {leads.length} leads
            </div>
          </div>

          {/* Metric Cards */}
          <div style={styles.analyticsCards}>
            {[
              { label: "Total Applicants", value: analyticsLeads.length, color: "#2563eb", icon: "👥" },
              { label: "Paid", value: analyticsLeads.filter(l => l.status === "paid").length, color: "#16a34a", icon: "✅" },
              { label: "Conversion Rate", value: analyticsLeads.length > 0 ? `${Math.round((analyticsLeads.filter(l => l.status === "paid").length / analyticsLeads.length) * 100)}%` : "0%", color: "#7c3aed", icon: "📈" },
              { label: "Seats Remaining", value: 50 - leads.filter(l => l.status === "paid").length, color: "#d97706", icon: "💺" },
              { label: "Avg Team Size", value: (() => { const sizes = analyticsLeads.map(l => parseInt(l.team_size)).filter(n => !isNaN(n)); return sizes.length > 0 ? Math.round(sizes.reduce((a,b)=>a+b,0)/sizes.length) : "—"; })(), color: "#0891b2", icon: "🏢" },
            ].map((card) => (
              <div key={card.label} style={styles.analyticsCard}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{card.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: card.color }}>{card.value}</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{card.label}</div>
              </div>
            ))}
          </div>

          {/* Status Funnel */}
          <div style={styles.analyticsSection}>
            <div style={styles.analyticsSectionTitle}>Registration Funnel</div>
            <div style={{ display: "flex", gap: 4, alignItems: "stretch", height: 80 }}>
              {[
                { label: "New", key: "new", color: "#2563eb" },
                { label: "Contacted", key: "contacted", color: "#d97706" },
                { label: "Paid", key: "paid", color: "#16a34a" },
                { label: "Attended", key: "attended", color: "#7c3aed" },
                { label: "Rejected", key: "rejected", color: "#dc2626" },
              ].map((stage, i) => {
                const count = analyticsLeads.filter(l => l.status === stage.key).length;
                const pct = analyticsLeads.length > 0 ? Math.round((count / analyticsLeads.length) * 100) : 0;
                return (
                  <div key={stage.key} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ flex: 1, width: "100%", background: stage.color, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "white", opacity: 0.85 + (i * 0.03) }}>
                      <div style={{ fontSize: 20, fontWeight: 800 }}>{count}</div>
                      <div style={{ fontSize: 11 }}>{pct}%</div>
                    </div>
                    <div style={{ fontSize: 11, color: "#6b7280", marginTop: 6, textAlign: "center" }}>{stage.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Industry Breakdown */}
            <div style={styles.analyticsSection}>
              <div style={styles.analyticsSectionTitle}>By Industry</div>
              {(() => {
                const data = Object.entries(analyticsLeads.reduce((acc, l) => { if (l.industry) acc[l.industry] = (acc[l.industry]||0)+1; return acc; }, {} as Record<string,number>)).sort((a,b)=>b[1]-a[1]).slice(0,8);
                const max = Math.max(...data.map(d=>d[1]), 1);
                return data.map(([label, value]) => (
                  <div key={label} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: "#374151" }}>{label}</span>
                      <span style={{ fontWeight: 700, color: "#111" }}>{value}</span>
                    </div>
                    <div style={{ background: "#f3f4f6", borderRadius: 4, height: 8 }}>
                      <div style={{ width: `${(value/max)*100}%`, height: "100%", background: "#2563eb", borderRadius: 4 }} />
                    </div>
                  </div>
                ));
              })()}
            </div>

            {/* City Distribution */}
            <div style={styles.analyticsSection}>
              <div style={styles.analyticsSectionTitle}>By City</div>
              {(() => {
                const data = Object.entries(analyticsLeads.reduce((acc, l) => { if (l.city) { const c = normalizeCity(l.city); acc[c] = (acc[c]||0)+1; } return acc; }, {} as Record<string,number>)).sort((a,b)=>b[1]-a[1]).slice(0,8);
                const max = Math.max(...data.map(d=>d[1]), 1);
                return data.map(([label, value]) => (
                  <div key={label} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: "#374151" }}>{label}</span>
                      <span style={{ fontWeight: 700, color: "#111" }}>{value}</span>
                    </div>
                    <div style={{ background: "#f3f4f6", borderRadius: 4, height: 8 }}>
                      <div style={{ width: `${(value/max)*100}%`, height: "100%", background: "#7c3aed", borderRadius: 4 }} />
                    </div>
                  </div>
                ));
              })()}
            </div>

            {/* Team Size */}
            <div style={styles.analyticsSection}>
              <div style={styles.analyticsSectionTitle}>By Team Size</div>
              {(() => {
                const buckets: Record<string,number> = { "1–10": 0, "11–50": 0, "51–200": 0, "200+": 0 };
                analyticsLeads.forEach(l => { const n = parseInt(l.team_size); if (!isNaN(n)) { if(n<=10)buckets["1–10"]++; else if(n<=50)buckets["11–50"]++; else if(n<=200)buckets["51–200"]++; else buckets["200+"]++; }});
                const max = Math.max(...Object.values(buckets), 1);
                return Object.entries(buckets).map(([label, value]) => (
                  <div key={label} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: "#374151" }}>{label} employees</span>
                      <span style={{ fontWeight: 700, color: "#111" }}>{value}</span>
                    </div>
                    <div style={{ background: "#f3f4f6", borderRadius: 4, height: 8 }}>
                      <div style={{ width: `${(value/max)*100}%`, height: "100%", background: "#16a34a", borderRadius: 4 }} />
                    </div>
                  </div>
                ));
              })()}
            </div>

            {/* Registrations Over Time */}
            <div style={styles.analyticsSection}>
              <div style={styles.analyticsSectionTitle}>Registrations Over Time</div>
              {(() => {
                const data = Object.entries(analyticsLeads.reduce((acc, l) => { const d = new Date(l.created_at).toLocaleDateString("en-IN",{day:"numeric",month:"short"}); acc[d]=(acc[d]||0)+1; return acc; }, {} as Record<string,number>));
                const max = Math.max(...data.map(d=>d[1]), 1);
                return data.map(([label, value]) => (
                  <div key={label} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: "#374151" }}>{label}</span>
                      <span style={{ fontWeight: 700, color: "#111" }}>{value}</span>
                    </div>
                    <div style={{ background: "#f3f4f6", borderRadius: 4, height: 8 }}>
                      <div style={{ width: `${(value/max)*100}%`, height: "100%", background: "#d97706", borderRadius: 4 }} />
                    </div>
                  </div>
                ));
              })()}
            </div>

            {/* AI Usage */}
            <div style={styles.analyticsSection}>
              <div style={styles.analyticsSectionTitle}>Current AI Usage Level</div>
              {(() => {
                const data = Object.entries(analyticsLeads.reduce((acc, l) => { if (l.current_ai_usage) acc[l.current_ai_usage] = (acc[l.current_ai_usage]||0)+1; return acc; }, {} as Record<string,number>)).sort((a,b)=>b[1]-a[1]);
                const max = Math.max(...data.map(d=>d[1]), 1);
                return data.map(([label, value]) => (
                  <div key={label} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: "#374151" }}>{label}</span>
                      <span style={{ fontWeight: 700, color: "#111" }}>{value}</span>
                    </div>
                    <div style={{ background: "#f3f4f6", borderRadius: 4, height: 8 }}>
                      <div style={{ width: `${(value/max)*100}%`, height: "100%", background: "#0891b2", borderRadius: 4 }} />
                    </div>
                  </div>
                ));
              })()}
            </div>

            {/* Referral Sources */}
            <div style={styles.analyticsSection}>
              <div style={styles.analyticsSectionTitle}>Referral Sources</div>
              {(() => {
                const data = Object.entries(analyticsLeads.reduce((acc, l) => { const r = l.referred_by || "Direct / Unknown"; acc[r]=(acc[r]||0)+1; return acc; }, {} as Record<string,number>)).sort((a,b)=>b[1]-a[1]).slice(0,8);
                const max = Math.max(...data.map(d=>d[1]), 1);
                return data.map(([label, value]) => (
                  <div key={label} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: "#374151" }}>{label}</span>
                      <span style={{ fontWeight: 700, color: "#111" }}>{value}</span>
                    </div>
                    <div style={{ background: "#f3f4f6", borderRadius: 4, height: 8 }}>
                      <div style={{ width: `${(value/max)*100}%`, height: "100%", background: "#dc2626", borderRadius: 4 }} />
                    </div>
                  </div>
                ));
              })()}
            </div>

            {/* Participant Type */}
            <div style={styles.analyticsSection}>
              <div style={styles.analyticsSectionTitle}>By Participant Type</div>
              {(() => {
                const data = Object.entries(analyticsLeads.reduce((acc, l) => { const t = l.participant_type || "Untagged"; acc[t]=(acc[t]||0)+1; return acc; }, {} as Record<string,number>)).sort((a,b)=>b[1]-a[1]);
                const max = Math.max(...data.map(d=>d[1]), 1);
                return data.map(([label, value]) => (
                  <div key={label} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: "#374151" }}>{label.charAt(0).toUpperCase() + label.slice(1)}</span>
                      <span style={{ fontWeight: 700, color: "#111" }}>{value}</span>
                    </div>
                    <div style={{ background: "#f3f4f6", borderRadius: 4, height: 8 }}>
                      <div style={{ width: `${(value/max)*100}%`, height: "100%", background: PARTICIPANT_TYPE_COLORS[label] || "#9ca3af", borderRadius: 4 }} />
                    </div>
                  </div>
                ));
              })()}
            </div>

            {/* Source Channel */}
            <div style={styles.analyticsSection}>
              <div style={styles.analyticsSectionTitle}>By Source Channel</div>
              {(() => {
                const data = Object.entries(analyticsLeads.reduce((acc, l) => { const s = l.source_channel || "Untagged"; acc[s]=(acc[s]||0)+1; return acc; }, {} as Record<string,number>)).sort((a,b)=>b[1]-a[1]);
                const max = Math.max(...data.map(d=>d[1]), 1);
                return data.map(([label, value]) => (
                  <div key={label} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: "#374151" }}>{label}</span>
                      <span style={{ fontWeight: 700, color: "#111" }}>{value}</span>
                    </div>
                    <div style={{ background: "#f3f4f6", borderRadius: 4, height: 8 }}>
                      <div style={{ width: `${(value/max)*100}%`, height: "100%", background: "#7c3aed", borderRadius: 4 }} />
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
        );
      })()}

      {/* Add Lead Modal */}
      {showAddModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Add Lead Manually</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6b7280" }}>×</button>
            </div>
            <form onSubmit={handleAddLead}>
              <div style={styles.modalGrid}>
                {[
                  { label: "Full Name *", key: "full_name", required: true },
                  { label: "Email *", key: "email", required: true },
                  { label: "Phone", key: "phone" },
                  { label: "City", key: "city" },
                  { label: "Company Name", key: "company_name" },
                  { label: "Designation", key: "designation" },
                  { label: "Industry", key: "industry" },
                  { label: "Team Size", key: "team_size" },
                  { label: "Referred By", key: "referred_by" },
                ].map(({ label, key, required }) => (
                  <div key={key}>
                    <label style={styles.modalLabel}>{label}</label>
                    <input
                      style={styles.modalInput}
                      value={(addForm as any)[key]}
                      onChange={(e) => setAddForm((p) => ({ ...p, [key]: e.target.value }))}
                      required={required}
                    />
                  </div>
                ))}
                <div>
                  <label style={styles.modalLabel}>Status</label>
                  <select
                    style={styles.modalInput}
                    value={addForm.status}
                    onChange={(e) => setAddForm((p) => ({ ...p, status: e.target.value }))}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={styles.modalLabel}>Participant Type</label>
                  <select
                    style={styles.modalInput}
                    value={addForm.participant_type}
                    onChange={(e) => setAddForm((p) => ({ ...p, participant_type: e.target.value }))}
                  >
                    <option value="">— Select type</option>
                    {PARTICIPANT_TYPES.map((t) => (
                      <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={styles.modalLabel}>Source Channel</label>
                  <select
                    style={styles.modalInput}
                    value={addForm.source_channel}
                    onChange={(e) => setAddForm((p) => ({ ...p, source_channel: e.target.value }))}
                  >
                    <option value="">— Select source</option>
                    {SOURCE_CHANNELS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <label style={styles.modalLabel}>Notes</label>
                <textarea
                  rows={2}
                  style={{ ...styles.modalInput, resize: "vertical" as const }}
                  value={addForm.notes}
                  onChange={(e) => setAddForm((p) => ({ ...p, notes: e.target.value }))}
                />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={styles.logoutBtn}>Cancel</button>
                <button type="submit" disabled={addSaving} style={styles.addBtn}>
                  {addSaving ? "Saving..." : "Add Lead"}
                </button>
              </div>
            </form>
          </div>
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
  emailTypeSelect: {
    padding: "7px 10px",
    fontSize: 13,
    border: "1.5px solid #e5e7eb",
    borderRadius: 6,
    background: "white",
    cursor: "pointer",
    outline: "none",
  },
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
  whatsappBtn: {
    padding: "7px 18px",
    background: "#25d366",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
  },
  deleteBtn: {
    padding: "7px 18px",
    background: "white",
    color: "#dc2626",
    border: "1.5px solid #dc2626",
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  addBtn: {
    padding: "8px 16px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
  },
  downloadBtn: {
    padding: "8px 16px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
  },
  csvBtn: {
    padding: "8px 16px",
    background: "#f3f4f6",
    color: "#111",
    border: "1.5px solid #e5e7eb",
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
  },
  modalOverlay: {
    position: "fixed" as const,
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalBox: {
    background: "white",
    borderRadius: 12,
    padding: "28px 32px",
    width: 640,
    maxWidth: "95vw",
    maxHeight: "90vh",
    overflowY: "auto" as const,
    boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
  },
  modalGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px 20px",
  },
  modalLabel: {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    color: "#6b7280",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    marginBottom: 4,
  },
  modalInput: {
    width: "100%",
    padding: "8px 10px",
    fontSize: 13,
    border: "1.5px solid #e5e7eb",
    borderRadius: 6,
    outline: "none",
    boxSizing: "border-box" as const,
    fontFamily: "system-ui, sans-serif",
  },
  bulkDeleteBtn: {
    padding: "8px 18px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
  },
  tabNav: {
    display: "flex",
    gap: 4,
    padding: "0 24px",
    borderBottom: "2px solid #e5e7eb",
    background: "white",
  },
  tabBtn: {
    padding: "12px 20px",
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    marginBottom: -2,
    fontSize: 14,
    fontWeight: 600,
    color: "#6b7280",
    cursor: "pointer",
  },
  tabBtnActive: {
    color: "#2563eb",
    borderBottomColor: "#2563eb",
  },
  analyticsWrap: {
    padding: "24px",
    display: "flex",
    flexDirection: "column" as const,
    gap: 20,
  },
  analyticsCards: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 16,
  },
  analyticsCard: {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: "20px 16px",
    textAlign: "center" as const,
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  analyticsSection: {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: "20px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  analyticsSectionTitle: {
    fontWeight: 700,
    fontSize: 13,
    color: "#374151",
    marginBottom: 16,
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
  },
  analyticsFilterBar: {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: "16px 20px",
    marginBottom: 20,
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
  },
  analyticsFilterLabel: {
    fontSize: 13,
    fontWeight: 700,
    color: "#111",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  analyticsFilterBadge: {
    background: "#2563eb",
    color: "white",
    fontSize: 11,
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: 20,
  },
  analyticsFilterControls: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap" as const,
    alignItems: "center",
  },
  analyticsFilterSelect: {
    padding: "6px 10px",
    border: "1px solid #e5e7eb",
    borderRadius: 7,
    fontSize: 13,
    background: "#f9fafb",
    color: "#374151",
    cursor: "pointer",
  },
  analyticsClearBtn: {
    padding: "6px 12px",
    background: "#fee2e2",
    color: "#dc2626",
    border: "none",
    borderRadius: 7,
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
  },
  analyticsFilterResult: {
    fontSize: 12,
    color: "#6b7280",
  },
  editFieldsBtn: {
    background: "#f0f4ff",
    color: "#2563eb",
    border: "1px solid #c7d7fe",
    borderRadius: 6,
    padding: "6px 14px",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
  },
  editGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "12px 16px",
  },
  editInput: {
    width: "100%",
    padding: "6px 10px",
    border: "1px solid #c7d7fe",
    borderRadius: 6,
    fontSize: 13,
    background: "#f8faff",
    marginTop: 4,
    boxSizing: "border-box" as const,
    outline: "none",
  },
};

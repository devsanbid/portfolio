"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  LayoutDashboard,
  User,
  Code2,
  FolderGit2,
  Briefcase,
  MessageSquare,
  Share2,
  Type,
  Save,
  RotateCcw,
  LogOut,
  Check,
  Plus,
  Trash2,
  ChevronRight,
  Home,
  Eye,
  Globe,
} from "lucide-react";
import {
  SiteDataProvider,
  useSiteData,
  type SiteData,
  type SkillItem,
  type TimelineEntry,
  type SocialLink,
  type WebsiteItem,
  defaultSiteData,
} from "@/app/lib/siteData";

/* ============================================================
   Admin Page — Full control panel for the portfolio
   Password-protected, persists all changes to localStorage.
   ============================================================ */

// ── Simple password auth (change this!) ──
const ADMIN_PASSWORD = "sandesh2026";

// ── Sidebar sections ──
const sections = [
  { id: "hero", label: "Hero Section", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "websites", label: "Websites", icon: Globe },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "contact", label: "Contact", icon: MessageSquare },
  { id: "social", label: "Social Links", icon: Share2 },
  { id: "footer", label: "Footer", icon: Type },
] as const;

type SectionId = (typeof sections)[number]["id"];

// ── Gradient color presets for skill bars ──
const gradientPresets = [
  { label: "Blue → Cyan", value: "from-blue-400 to-cyan-400" },
  { label: "Purple → Pink", value: "from-purple-400 to-pink-400" },
  { label: "Yellow → Orange", value: "from-yellow-400 to-orange-400" },
  { label: "Orange → Red", value: "from-orange-400 to-red-400" },
  { label: "Blue → Purple", value: "from-blue-500 to-purple-500" },
  { label: "Cyan → Blue", value: "from-cyan-400 to-blue-400" },
  { label: "Green → Emerald", value: "from-green-400 to-emerald-400" },
  { label: "Blue → Green", value: "from-blue-400 to-green-400" },
  { label: "Violet → Purple", value: "from-violet-400 to-purple-400" },
  { label: "Red → Pink", value: "from-red-400 to-pink-400" },
  { label: "Pink → Rose", value: "from-pink-400 to-rose-400" },
  { label: "Amber → Yellow", value: "from-amber-400 to-yellow-400" },
];

// ═══════════════════════════════════════════
// Reusable Admin UI Components
// ═══════════════════════════════════════════

function AdminInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
        {label}
      </label>
      {rows ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
        />
      )}
    </div>
  );
}

function AdminSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-[#0d0d20] px-3 py-2.5 text-sm text-white outline-none transition-all focus:border-purple-500/50"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function AdminSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
          {label}
        </label>
        <span className="text-xs font-mono text-purple-400">{value}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-purple-500"
      />
    </div>
  );
}

function SectionCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm ${className}`}
    >
      <h3 className="mb-5 text-base font-semibold text-white">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

// ═══════════════════════════════════════════
// Login Screen
// ═══════════════════════════════════════════

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050510] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/10">
            <Lock className="text-purple-400" size={24} />
          </div>
          <h1 className="mb-2 text-center text-xl font-bold text-white">Admin Panel</h1>
          <p className="mb-6 text-center text-sm text-gray-400">
            Enter password to access the dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
            />
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-red-400"
              >
                Incorrect password. Try again.
              </motion.p>
            )}
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-purple-500/20"
            >
              Login
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════
// Dashboard Content
// ═══════════════════════════════════════════

function Dashboard() {
  const { data, updateData, resetData } = useSiteData();
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [draft, setDraft] = useState<SiteData>(data);
  const [saved, setSaved] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync draft when data changes (e.g. after reset)
  useEffect(() => {
    setDraft(data);
  }, [data]);

  const handleSave = useCallback(() => {
    updateData(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [draft, updateData]);

  const handleReset = useCallback(() => {
    if (confirm("Reset all data to defaults? This cannot be undone.")) {
      resetData();
      setDraft(defaultSiteData);
    }
  }, [resetData]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    window.location.reload();
  };

  // ── Update helpers ──
  const updateHero = (field: keyof SiteData["hero"], value: string) => {
    setDraft((d) => ({ ...d, hero: { ...d.hero, [field]: value } }));
  };

  const updateAbout = (field: keyof SiteData["about"], value: string) => {
    setDraft((d) => ({ ...d, about: { ...d.about, [field]: value } }));
  };

  const updateAboutCard = (index: number, field: "title" | "description", value: string) => {
    setDraft((d) => {
      const cards = [...d.about.cards];
      cards[index] = { ...cards[index], [field]: value };
      return { ...d, about: { ...d.about, cards } };
    });
  };

  const addAboutCard = () => {
    setDraft((d) => ({
      ...d,
      about: { ...d.about, cards: [...d.about.cards, { title: "New Card", description: "" }] },
    }));
  };

  const removeAboutCard = (index: number) => {
    setDraft((d) => ({
      ...d,
      about: { ...d.about, cards: d.about.cards.filter((_, i) => i !== index) },
    }));
  };

  const updateSkillsMeta = (field: string, value: string) => {
    setDraft((d) => ({ ...d, skills: { ...d.skills, [field]: value } }));
  };

  const updateSkill = (
    category: "frontend" | "learning" | "tools",
    index: number,
    field: keyof SkillItem,
    value: string | number
  ) => {
    setDraft((d) => {
      const skills = [...d.skills[category]];
      skills[index] = { ...skills[index], [field]: value };
      return { ...d, skills: { ...d.skills, [category]: skills } };
    });
  };

  const addSkill = (category: "frontend" | "learning" | "tools") => {
    setDraft((d) => ({
      ...d,
      skills: {
        ...d.skills,
        [category]: [
          ...d.skills[category],
          { name: "New Skill", level: 50, color: "from-blue-400 to-cyan-400" },
        ],
      },
    }));
  };

  const removeSkill = (category: "frontend" | "learning" | "tools", index: number) => {
    setDraft((d) => ({
      ...d,
      skills: {
        ...d.skills,
        [category]: d.skills[category].filter((_, i) => i !== index),
      },
    }));
  };

  const updateProjects = (field: keyof SiteData["projects"], value: string) => {
    setDraft((d) => ({ ...d, projects: { ...d.projects, [field]: value } }));
  };

  const updateExperienceMeta = (field: string, value: string) => {
    setDraft((d) => ({ ...d, experience: { ...d.experience, [field]: value } }));
  };

  const updateTimeline = (index: number, field: keyof TimelineEntry, value: string) => {
    setDraft((d) => {
      const timeline = [...d.experience.timeline];
      timeline[index] = { ...timeline[index], [field]: value };
      return { ...d, experience: { ...d.experience, timeline } };
    });
  };

  const addTimeline = () => {
    setDraft((d) => ({
      ...d,
      experience: {
        ...d.experience,
        timeline: [
          { year: "2026", title: "New Entry", description: "" },
          ...d.experience.timeline,
        ],
      },
    }));
  };

  const removeTimeline = (index: number) => {
    setDraft((d) => ({
      ...d,
      experience: {
        ...d.experience,
        timeline: d.experience.timeline.filter((_, i) => i !== index),
      },
    }));
  };

  const updateContact = (field: keyof SiteData["contact"], value: string) => {
    setDraft((d) => ({ ...d, contact: { ...d.contact, [field]: value } }));
  };

  const updateSocial = (index: number, field: keyof SocialLink, value: string) => {
    setDraft((d) => {
      const social = [...d.social];
      social[index] = { ...social[index], [field]: value };
      return { ...d, social };
    });
  };

  const addSocial = () => {
    setDraft((d) => ({
      ...d,
      social: [...d.social, { platform: "website", url: "https://", label: "Website" }],
    }));
  };

  const removeSocial = (index: number) => {
    setDraft((d) => ({ ...d, social: d.social.filter((_, i) => i !== index) }));
  };

  const updateFooter = (field: keyof SiteData["footer"], value: string) => {
    setDraft((d) => ({ ...d, footer: { ...d.footer, [field]: value } }));
  };

  // ═══════════════════════════════════════════
  // Section renderers
  // ═══════════════════════════════════════════

  const renderHero = () => (
    <div className="space-y-6">
      <SectionCard title="Avatar">
        <AdminInput
          label="Avatar Image URL"
          value={draft.hero.avatar}
          onChange={(v) => updateHero("avatar", v)}
          placeholder="https://example.com/avatar.png"
        />
        {draft.hero.avatar && (
          <div className="mt-3 flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full border border-white/10 bg-white/5">
              <img src={draft.hero.avatar} alt="Preview" className="h-full w-full rounded-full object-cover" />
            </div>
            <span className="text-xs text-gray-500">Preview</span>
          </div>
        )}
      </SectionCard>
      <SectionCard title="Hero Text">
        <AdminInput label="Badge Text" value={draft.hero.badge} onChange={(v) => updateHero("badge", v)} />
        <AdminInput label="Greeting" value={draft.hero.greeting} onChange={(v) => updateHero("greeting", v)} />
        <AdminInput label="Name" value={draft.hero.name} onChange={(v) => updateHero("name", v)} />
        <AdminInput label="Role / Tagline" value={draft.hero.role} onChange={(v) => updateHero("role", v)} />
        <AdminInput
          label="Description"
          value={draft.hero.description}
          onChange={(v) => updateHero("description", v)}
          rows={3}
        />
      </SectionCard>
      <SectionCard title="Call-to-Action Buttons">
        <AdminInput label="Primary Button Text" value={draft.hero.cta} onChange={(v) => updateHero("cta", v)} />
        <AdminInput
          label="Secondary Button Text"
          value={draft.hero.resumeCta}
          onChange={(v) => updateHero("resumeCta", v)}
        />
      </SectionCard>
    </div>
  );

  const renderAbout = () => (
    <div className="space-y-6">
      <SectionCard title="About Section Header">
        <AdminInput label="Subtitle" value={draft.about.subtitle} onChange={(v) => updateAbout("subtitle", v)} />
        <AdminInput label="Title" value={draft.about.title} onChange={(v) => updateAbout("title", v)} />
        <AdminInput
          label="Description"
          value={draft.about.description}
          onChange={(v) => updateAbout("description", v)}
          rows={4}
        />
      </SectionCard>

      <SectionCard title="About Cards">
        {draft.about.cards.map((card, i) => (
          <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Card {i + 1}</span>
              {draft.about.cards.length > 1 && (
                <button onClick={() => removeAboutCard(i)} className="text-red-400 hover:text-red-300">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
            <AdminInput label="Title" value={card.title} onChange={(v) => updateAboutCard(i, "title", v)} />
            <AdminInput
              label="Description"
              value={card.description}
              onChange={(v) => updateAboutCard(i, "description", v)}
              rows={2}
            />
          </div>
        ))}
        <button
          onClick={addAboutCard}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/10 py-3 text-xs text-gray-400 transition-colors hover:border-purple-500/30 hover:text-purple-300"
        >
          <Plus size={14} /> Add Card
        </button>
      </SectionCard>
    </div>
  );

  const renderSkillCategory = (category: "frontend" | "learning" | "tools", label: string) => (
    <SectionCard title={label}>
      {draft.skills[category].map((skill, i) => (
        <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">
              {skill.name} — {skill.level}%
            </span>
            <button
              onClick={() => removeSkill(category, i)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 size={14} />
            </button>
          </div>
          <AdminInput
            label="Skill Name"
            value={skill.name}
            onChange={(v) => updateSkill(category, i, "name", v)}
          />
          <AdminSlider
            label="Proficiency"
            value={skill.level}
            onChange={(v) => updateSkill(category, i, "level", v)}
          />
          <AdminSelect
            label="Color Gradient"
            value={skill.color}
            onChange={(v) => updateSkill(category, i, "color", v)}
            options={gradientPresets}
          />
          {/* Preview */}
          <div className="space-y-1">
            <span className="text-xs text-gray-500">Preview</span>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={() => addSkill(category)}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/10 py-3 text-xs text-gray-400 transition-colors hover:border-purple-500/30 hover:text-purple-300"
      >
        <Plus size={14} /> Add Skill
      </button>
    </SectionCard>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <SectionCard title="Skills Section Header">
        <AdminInput label="Title" value={draft.skills.title} onChange={(v) => updateSkillsMeta("title", v)} />
        <AdminInput label="Subtitle" value={draft.skills.subtitle} onChange={(v) => updateSkillsMeta("subtitle", v)} />
        <AdminInput
          label="Frontend Category Label"
          value={draft.skills.frontendLabel}
          onChange={(v) => updateSkillsMeta("frontendLabel", v)}
        />
        <AdminInput
          label="Learning Category Label"
          value={draft.skills.learningLabel}
          onChange={(v) => updateSkillsMeta("learningLabel", v)}
        />
        <AdminInput
          label="Tools Category Label"
          value={draft.skills.toolsLabel || "Dev Tools & Environment"}
          onChange={(v) => updateSkillsMeta("toolsLabel", v)}
        />
      </SectionCard>
      {renderSkillCategory("frontend", "Frontend Skills")}
      {renderSkillCategory("learning", "Learning Skills")}
      {renderSkillCategory("tools", "Dev Tools & Environment")}
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <SectionCard title="Projects Section">
        <AdminInput label="Title" value={draft.projects.title} onChange={(v) => updateProjects("title", v)} />
        <AdminInput label="Subtitle" value={draft.projects.subtitle} onChange={(v) => updateProjects("subtitle", v)} />
        <AdminInput
          label="GitHub Username"
          value={draft.projects.githubUsername}
          onChange={(v) => updateProjects("githubUsername", v)}
          placeholder="e.g. devsanbid"
        />
        <p className="text-xs text-gray-500">
          Projects are fetched live from{" "}
          <span className="text-purple-400">github.com/{draft.projects.githubUsername}</span>
        </p>
      </SectionCard>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      <SectionCard title="Experience Section Header">
        <AdminInput label="Title" value={draft.experience.title} onChange={(v) => updateExperienceMeta("title", v)} />
        <AdminInput
          label="Subtitle"
          value={draft.experience.subtitle}
          onChange={(v) => updateExperienceMeta("subtitle", v)}
        />
      </SectionCard>

      <SectionCard title="Timeline Entries">
        {draft.experience.timeline.map((entry, i) => (
          <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">
                {entry.year} — {entry.title}
              </span>
              {draft.experience.timeline.length > 1 && (
                <button onClick={() => removeTimeline(i)} className="text-red-400 hover:text-red-300">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
            <AdminInput label="Year" value={entry.year} onChange={(v) => updateTimeline(i, "year", v)} />
            <AdminInput label="Title" value={entry.title} onChange={(v) => updateTimeline(i, "title", v)} />
            <AdminInput
              label="Description"
              value={entry.description}
              onChange={(v) => updateTimeline(i, "description", v)}
              rows={2}
            />
          </div>
        ))}
        <button
          onClick={addTimeline}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/10 py-3 text-xs text-gray-400 transition-colors hover:border-purple-500/30 hover:text-purple-300"
        >
          <Plus size={14} /> Add Timeline Entry
        </button>
      </SectionCard>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-6">
      <SectionCard title="Contact Section">
        <AdminInput label="Title" value={draft.contact.title} onChange={(v) => updateContact("title", v)} />
        <AdminInput label="Subtitle" value={draft.contact.subtitle} onChange={(v) => updateContact("subtitle", v)} />
        <AdminInput
          label="Description"
          value={draft.contact.description}
          onChange={(v) => updateContact("description", v)}
          rows={3}
        />
      </SectionCard>
    </div>
  );

  // ── Websites helpers ──
  const updateWebsitesMeta = (key: "title" | "subtitle", value: string) =>
    setDraft((d) => ({ ...d, websites: { ...d.websites, [key]: value } }));

  const updateWebsite = (index: number, key: keyof WebsiteItem, value: string | string[]) =>
    setDraft((d) => {
      const items = [...d.websites.items];
      items[index] = { ...items[index], [key]: value };
      return { ...d, websites: { ...d.websites, items } };
    });

  const addWebsite = () =>
    setDraft((d) => ({
      ...d,
      websites: {
        ...d.websites,
        items: [
          ...d.websites.items,
          { name: "New Website", url: "https://", description: "", tags: [] },
        ],
      },
    }));

  const removeWebsite = (index: number) =>
    setDraft((d) => ({
      ...d,
      websites: {
        ...d.websites,
        items: d.websites.items.filter((_, i) => i !== index),
      },
    }));

  const renderWebsites = () => (
    <div className="space-y-6">
      <SectionCard title="Websites Section">
        <AdminInput
          label="Title"
          value={draft.websites.title}
          onChange={(v) => updateWebsitesMeta("title", v)}
        />
        <AdminInput
          label="Subtitle"
          value={draft.websites.subtitle}
          onChange={(v) => updateWebsitesMeta("subtitle", v)}
        />
      </SectionCard>

      <SectionCard title="Website Items">
        {draft.websites.items.map((site, i) => (
          <div key={i} className="space-y-3 rounded-lg border border-white/5 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-300">
                Website #{i + 1}
              </span>
              {draft.websites.items.length > 1 && (
                <button onClick={() => removeWebsite(i)} className="text-red-400 hover:text-red-300">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
            <AdminInput label="Name" value={site.name} onChange={(v) => updateWebsite(i, "name", v)} />
            <AdminInput label="URL" value={site.url} onChange={(v) => updateWebsite(i, "url", v)} />
            <AdminInput
              label="Description"
              value={site.description}
              onChange={(v) => updateWebsite(i, "description", v)}
              rows={2}
            />
            <AdminInput
              label="Tags (comma separated)"
              value={site.tags.join(", ")}
              onChange={(v) => updateWebsite(i, "tags", v.split(",").map((t) => t.trim()).filter(Boolean))}
            />
          </div>
        ))}
        <button
          onClick={addWebsite}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/10 py-3 text-xs text-gray-400 transition-colors hover:border-purple-500/30 hover:text-purple-300"
        >
          <Plus size={14} /> Add Website
        </button>
      </SectionCard>
    </div>
  );

  const renderSocial = () => (
    <div className="space-y-6">
      <SectionCard title="Social Links">
        {draft.social.map((link, i) => (
          <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">{link.label}</span>
              {draft.social.length > 1 && (
                <button onClick={() => removeSocial(i)} className="text-red-400 hover:text-red-300">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
            <AdminSelect
              label="Platform"
              value={link.platform}
              onChange={(v) => updateSocial(i, "platform", v)}
              options={[
                { label: "GitHub", value: "github" },
                { label: "LinkedIn", value: "linkedin" },
                { label: "Email", value: "email" },
                { label: "Twitter/X", value: "twitter" },
                { label: "Instagram", value: "instagram" },
                { label: "YouTube", value: "youtube" },
                { label: "Website", value: "website" },
              ]}
            />
            <AdminInput label="Label" value={link.label} onChange={(v) => updateSocial(i, "label", v)} />
            <AdminInput
              label="URL"
              value={link.url}
              onChange={(v) => updateSocial(i, "url", v)}
              placeholder="https://..."
            />
          </div>
        ))}
        <button
          onClick={addSocial}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/10 py-3 text-xs text-gray-400 transition-colors hover:border-purple-500/30 hover:text-purple-300"
        >
          <Plus size={14} /> Add Social Link
        </button>
      </SectionCard>
    </div>
  );

  const renderFooter = () => (
    <div className="space-y-6">
      <SectionCard title="Footer">
        <AdminInput
          label="Copyright Text"
          value={draft.footer.copyright}
          onChange={(v) => updateFooter("copyright", v)}
        />
        <AdminInput
          label="Made With Text"
          value={draft.footer.madeWith}
          onChange={(v) => updateFooter("madeWith", v)}
        />
      </SectionCard>
    </div>
  );

  const sectionRenderers: Record<SectionId, () => React.ReactNode> = {
    hero: renderHero,
    about: renderAbout,
    skills: renderSkills,
    websites: renderWebsites,
    projects: renderProjects,
    experience: renderExperience,
    contact: renderContact,
    social: renderSocial,
    footer: renderFooter,
  };

  const activeSectionData = sections.find((s) => s.id === activeSection)!;

  return (
    <div className="flex min-h-screen bg-[#050510]">
      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-white/5 bg-[#080818] transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-white/5 px-5 py-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600">
              <LayoutDashboard size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Admin Panel</p>
              <p className="text-[10px] text-gray-500">Portfolio Manager</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-widest text-gray-600">
              Sections
            </p>
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setSidebarOpen(false);
                  }}
                  className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all ${
                    isActive
                      ? "bg-purple-500/10 text-purple-300"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  <span>{section.label}</span>
                  {isActive && <ChevronRight size={14} className="ml-auto" />}
                </button>
              );
            })}
          </nav>

          {/* Bottom actions */}
          <div className="border-t border-white/5 px-3 py-4 space-y-2">
            <a
              href="/"
              target="_blank"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <Eye size={16} /> View Portfolio
            </a>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* ── Mobile sidebar overlay ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/5 bg-[#050510]/80 px-4 py-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white lg:hidden"
            >
              <LayoutDashboard size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-white">{activeSectionData.label}</h1>
              <p className="text-xs text-gray-500">Edit content for this section</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 transition-all hover:border-red-500/30 hover:text-red-400"
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw size={14} /> Reset
            </motion.button>
            <motion.button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/40"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {saved ? (
                  <motion.span
                    key="saved"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="flex items-center gap-1"
                  >
                    <Check size={14} /> Saved!
                  </motion.span>
                ) : (
                  <motion.span
                    key="save"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="flex items-center gap-1"
                  >
                    <Save size={14} /> Save Changes
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {sectionRenderers[activeSection]()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// Admin Page wrapper
// ═══════════════════════════════════════════

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if already authenticated this session
    const isAuth = sessionStorage.getItem("admin_auth") === "true";
    setAuthenticated(isAuth);
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050510]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  if (!authenticated) {
    return <LoginScreen onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <SiteDataProvider>
      <Dashboard />
    </SiteDataProvider>
  );
}

"use client";

import { useState } from "react";
import NavBar from "@/app/components/NavBar";
import ContactForm from "@/app/components/contactForm";

// ── Types ──────────────────────────────────────────────────────────────────────

type TabId = "new" | "cases" | "docs" | "countries";

type CaseStatus = "At customs" | "Released" | "Submitted" | "Agent assigned";

interface ClearanceCase {
  id: string;
  ref: string;
  title: string;
  border: string;
  agent: string;
  step: number;
  totalSteps: number;
  status: CaseStatus;
  eta: string;
}

interface ClearanceForm {
  cargoType: string;
  origin: string;
  entryPoint: string;
  value: string;
  make: string;
  model: string;
  year: string;
  name: string;
  phone: string;
  notes: string;
}

// ── Static data ────────────────────────────────────────────────────────────────

const CASES: ClearanceCase[] = [
  {
    id: "1",
    ref: "GNL-2026-0041",
    title: "Toyota Land Cruiser 2019",
    border: "Nakonde",
    agent: "Justus J.",
    step: 3,
    totalSteps: 4,
    status: "At customs",
    eta: "2 days",
  },
  {
    id: "2",
    ref: "GNL-2026-0038",
    title: "Commercial goods — 3 pallets",
    border: "Kasumbalesa",
    agent: "Justus J.",
    step: 4,
    totalSteps: 4,
    status: "Released",
    eta: "Jun 12",
  },
];

const DOCUMENTS = [
  {
    icon: "🪪",
    name: "National ID / Passport",
    note: "Copy of the owner's ID",
  },
  {
    icon: "📦",
    name: "Bill of Lading / AWB",
    note: "Shipping document from carrier",
  },
  {
    icon: "🧾",
    name: "Commercial Invoice",
    note: "Shows value and description",
  },
  { icon: "📋", name: "Packing List", note: "Item-level breakdown of cargo" },
  { icon: "🚗", name: "Logbook / Title", note: "For vehicle shipments only" },
  {
    icon: "📜",
    name: "Certificate of Origin",
    note: "Required for duty exemptions",
  },
];

const COUNTRIES = [
  {
    flag: "🇿🇲",
    name: "Zambia",
    ports: "Nakonde · Kasumbalesa · Chirundu",
    tag: "Headquarters",
  },
  {
    flag: "🇹🇿",
    name: "Tanzania",
    ports: "Dar es Salaam · Tunduma",
    tag: "Active",
  },
  {
    flag: "🇨🇩",
    name: "DRC",
    ports: "Lubumbashi · Kasumbalesa",
    tag: "Active",
  },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Submit documents",
    desc: "Send us your vehicle or goods documentation.",
  },
  {
    step: "2",
    title: "Agent assignment",
    desc: "A licensed agent is assigned to your case immediately.",
  },
  {
    step: "3",
    title: "Customs processing",
    desc: "We handle all declarations, duties, and compliance checks.",
  },
  {
    step: "4",
    title: "Release & handover",
    desc: "Your vehicle or cargo is cleared and handed over.",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

const statusBadge: Record<CaseStatus, string> = {
  "At customs": "bg-[#d98f2b]/10 text-[#a3690f]",
  Released: "bg-[#2955c8]/10 text-[#2955c8]",
  Submitted: "bg-[#5c6a7a]/10 text-[#5c6a7a]",
  "Agent assigned": "bg-[#5c6a7a]/10 text-[#5c6a7a]",
};

const EMPTY_FORM: ClearanceForm = {
  cargoType: "",
  origin: "",
  entryPoint: "",
  value: "",
  make: "",
  model: "",
  year: "",
  name: "",
  phone: "",
  notes: "",
};

// ── Page ───────────────────────────────────────────────────────────────────────

export default function CustomsClearingPage() {
  const [activeTab, setActiveTab] = useState<TabId>("new");
  const [form, setForm] = useState<ClearanceForm>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const updateForm = (field: keyof ClearanceForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/clearance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          CargoType: form.cargoType,
          Country: form.origin,
          EntryPoint: form.entryPoint,
          Value: form.value,
          Fullname: form.name,
          ADN: form.notes,
          Phone: form.phone,
          Make: form.make,
          Model: form.model,
          Year: form.year,
        }),
      });

      if (!res.ok) return;

      setSubmitted(true);
      setForm(EMPTY_FORM);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  const tabs: { id: TabId; label: string; badge?: number }[] = [
    { id: "new", label: "New clearance" },
    {
      id: "cases",
      label: "My cases",
      badge: CASES.filter((c) => c.status !== "Released").length,
    },
    { id: "docs", label: "Documents needed" },
    { id: "countries", label: "Coverage" },
  ];

  return (
    <main className="bg-[#f7f4ee] text-[#10233d] min-h-screen font-sans">
      <NavBar />

      {/* Hero */}
      <section className="px-8 py-16 border-b border-[#e2ddd0]">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#d98f2b]/10 border border-[#d98f2b]/30 rounded-full px-3 py-1 text-xs text-[#a3690f] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d98f2b]" />
            Customs Clearing
          </div>
          <h1 className="text-4xl md:text-5xl font-medium leading-[1.1] mb-5">
            Clear your cargo,{" "}
            <span className="text-[#2955c8]">stress-free</span>
          </h1>
          <p className="text-[#5c6a7a] text-sm leading-relaxed max-w-lg">
            Submit your shipment details and our licensed agents handle every
            step — from duty calculation to final release across Zambia,
            Tanzania, and the DRC.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex border-b border-[#e2ddd0] px-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-4 text-xs whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === tab.id
                ? "border-[#2955c8] text-[#2955c8]"
                : "border-transparent text-[#5c6a7a] hover:text-[#10233d]"
            }`}
          >
            {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className="bg-[#2955c8]/10 text-[#2955c8] rounded-full px-2 py-0.5 text-[9px]">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="px-8 py-10">
        {/* ── New clearance form ── */}
        {activeTab === "new" && (
          <div className="max-w-2xl">
            <p className="text-[11px] tracking-[2px] text-[#2955c8] uppercase mb-1">
              01
            </p>
            <h2 className="text-2xl font-medium mb-2">
              Start a clearance request
            </h2>
            <p className="text-sm text-[#5c6a7a] mb-8">
              Fill in your shipment details and we&apos;ll assign a licensed
              agent within the hour.
            </p>

            {submitted && (
              <div className="mb-6 bg-[#2955c8]/10 border border-[#2955c8]/30 rounded-lg px-4 py-3 text-sm text-[#2955c8]">
                ✓ Request submitted! We will be in touch shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Shipment details */}
              <fieldset className="flex flex-col gap-4">
                <legend className="text-[10px] tracking-[2px] uppercase text-[#5c6a7a]/70 mb-1 pb-2 border-b border-[#e2ddd0] w-full">
                  Shipment details
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-[1.5px] text-[#5c6a7a]">
                      Cargo type
                    </label>
                    <select
                      value={form.cargoType}
                      onChange={(e) => updateForm("cargoType", e.target.value)}
                      className="bg-white border border-[#e2ddd0] rounded-md px-4 py-3 text-sm text-[#10233d] focus:outline-none focus:border-[#2955c8]/50"
                      required
                    >
                      <option value="">Select type</option>
                      <option>Motor vehicle</option>
                      <option>Commercial goods</option>
                      <option>Personal effects</option>
                      <option>Machinery &amp; equipment</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-[1.5px] text-[#5c6a7a]">
                      Country of origin
                    </label>
                    <select
                      value={form.origin}
                      onChange={(e) => updateForm("origin", e.target.value)}
                      className="bg-white border border-[#e2ddd0] rounded-md px-4 py-3 text-sm text-[#10233d] focus:outline-none focus:border-[#2955c8]/50"
                      required
                    >
                      <option value="">Select country</option>
                      <option>Japan</option>
                      <option>South Africa</option>
                      <option>UAE / Dubai</option>
                      <option>China</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-[1.5px] text-[#5c6a7a]">
                      Entry point
                    </label>
                    <select
                      value={form.entryPoint}
                      onChange={(e) => updateForm("entryPoint", e.target.value)}
                      className="bg-white border border-[#e2ddd0] rounded-md px-4 py-3 text-sm text-[#10233d] focus:outline-none focus:border-[#2955c8]/50"
                      required
                    >
                      <option value="">Select border</option>
                      <option>Nakonde (ZM/TZ)</option>
                      <option>Kasumbalesa (ZM/DRC)</option>
                      <option>Chirundu (ZM/ZW)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-[1.5px] text-[#5c6a7a]">
                      Estimated value (USD)
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      value={form.value}
                      onChange={(e) => updateForm("value", e.target.value)}
                      className="bg-white border border-[#e2ddd0] rounded-md px-4 py-3 text-sm text-[#10233d] placeholder:text-[#5c6a7a]/60 focus:outline-none focus:border-[#2955c8]/50"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Vehicle details */}
              {form.cargoType === "Motor vehicle" && (
                <fieldset className="flex flex-col gap-4">
                  <legend className="text-[10px] tracking-[2px] uppercase text-[#5c6a7a]/70 mb-1 pb-2 border-b border-[#e2ddd0] w-full">
                    Vehicle details
                  </legend>
                  <div className="grid grid-cols-3 gap-4">
                    {(["make", "model", "year"] as const).map((field) => (
                      <div key={field} className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase tracking-[1.5px] text-[#5c6a7a] capitalize">
                          {field}
                        </label>
                        <input
                          type="text"
                          placeholder=""
                          value={form[field]}
                          onChange={(e) => updateForm(field, e.target.value)}
                          className="bg-white border border-[#e2ddd0] rounded-md px-4 py-3 text-sm text-[#10233d] placeholder:text-[#5c6a7a]/60 focus:outline-none focus:border-[#2955c8]/50"
                        />
                      </div>
                    ))}
                  </div>
                </fieldset>
              )}

              {/* Contact */}
              <fieldset className="flex flex-col gap-4">
                <legend className="text-[10px] tracking-[2px] uppercase text-[#5c6a7a]/70 mb-1 pb-2 border-b border-[#e2ddd0] w-full">
                  Your details
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-[1.5px] text-[#5c6a7a]">
                      Full name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => updateForm("name", e.target.value)}
                      required
                      className="bg-white border border-[#e2ddd0] rounded-md px-4 py-3 text-sm text-[#10233d] placeholder:text-[#5c6a7a]/60 focus:outline-none focus:border-[#2955c8]/50"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-[1.5px] text-[#5c6a7a]">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="text"
                      placeholder="+260…"
                      value={form.phone}
                      onChange={(e) => updateForm("phone", e.target.value)}
                      required
                      className="bg-white border border-[#e2ddd0] rounded-md px-4 py-3 text-sm text-[#10233d] placeholder:text-[#5c6a7a]/60 focus:outline-none focus:border-[#2955c8]/50"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-[1.5px] text-[#5c6a7a]">
                      Additional notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Any special requirements, document notes, or questions…"
                      value={form.notes}
                      onChange={(e) => updateForm("notes", e.target.value)}
                      className="bg-white border border-[#e2ddd0] rounded-md px-4 py-3 text-sm text-[#10233d] placeholder:text-[#5c6a7a]/60 focus:outline-none focus:border-[#2955c8]/50 resize-none"
                    />
                  </div>
                </div>
              </fieldset>

              <button
                type="submit"
                className="bg-[#2955c8] text-white text-sm font-medium py-3 rounded-md hover:bg-[#1f45a8] transition-colors"
              >
                Submit clearance request →
              </button>
            </form>
          </div>
        )}

        {/* ── My cases ── */}
        {activeTab === "cases" && (
          <div className="max-w-2xl">
            <p className="text-[11px] tracking-[2px] text-[#2955c8] uppercase mb-1">
              Active cases
            </p>
            <h2 className="text-2xl font-medium mb-2">Your clearances</h2>
            <p className="text-sm text-[#5c6a7a] mb-8">
              Track the progress of all your active and recent clearance jobs.
            </p>
            <div className="flex flex-col gap-4">
              {CASES.map((c) => {
                const pct = Math.round((c.step / c.totalSteps) * 100);
                return (
                  <div
                    key={c.id}
                    className="bg-white border border-[#e2ddd0] rounded-xl p-5"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm font-medium">{c.title}</p>
                        <p className="text-[10px] text-[#5c6a7a] mt-0.5">
                          REF: {c.ref} · {c.border}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 ${statusBadge[c.status]}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {c.status}
                      </span>
                    </div>
                    <div className="h-1 bg-[#e2ddd0] rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full bg-[#2955c8] rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex gap-5 text-[10px] text-[#5c6a7a]">
                      <span>
                        Step{" "}
                        <strong className="text-[#10233d]">
                          {c.step} of {c.totalSteps}
                        </strong>
                      </span>
                      <span>
                        Agent: <strong className="text-[#10233d]">{c.agent}</strong>
                      </span>
                      <span>
                        {c.status === "Released"
                          ? "Released:"
                          : "Est. release:"}{" "}
                        <strong className="text-[#10233d]">{c.eta}</strong>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* How it works */}
            <div className="mt-10 bg-white border border-[#e2ddd0] rounded-xl p-7">
              <p className="text-[11px] tracking-[2px] text-[#2955c8] uppercase mb-5">
                How it works
              </p>
              <div className="flex flex-col gap-5">
                {HOW_IT_WORKS.map((s, i) => (
                  <div key={s.step} className="flex gap-4">
                    <div className="w-7 h-7 rounded-full bg-[#2955c8] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-white text-xs font-semibold">
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#10233d] mb-0.5">
                        {s.title}
                      </p>
                      <p className="text-xs text-[#5c6a7a]">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Documents needed ── */}
        {activeTab === "docs" && (
          <div className="max-w-2xl">
            <p className="text-[11px] tracking-[2px] text-[#2955c8] uppercase mb-1">
              Checklist
            </p>
            <h2 className="text-2xl font-medium mb-2">Documents to prepare</h2>
            <p className="text-sm text-[#5c6a7a] mb-8">
              Have these ready before submitting your request to speed up the
              process.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {DOCUMENTS.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-start gap-3 bg-white border border-[#e2ddd0] rounded-xl p-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#2955c8]/10 flex items-center justify-center shrink-0 text-base">
                    {doc.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#10233d] mb-0.5">
                      {doc.name}
                    </p>
                    <p className="text-xs text-[#5c6a7a]">{doc.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#d98f2b]/10 border border-[#d98f2b]/25 rounded-xl px-5 py-4 text-sm text-[#10233d]/80 leading-relaxed">
              💡 Missing a document? Our agents can often assist with obtaining
              replacements or equivalents. Include a note when submitting your
              request.
            </div>
          </div>
        )}

        {/* ── Coverage ── */}
        {activeTab === "countries" && (
          <div className="max-w-2xl">
            <p className="text-[11px] tracking-[2px] text-[#2955c8] uppercase mb-1">
              Coverage
            </p>
            <h2 className="text-2xl font-medium mb-2">Where we operate</h2>
            <p className="text-sm text-[#5c6a7a] mb-8">
              Licensed agents at the major posts along the Great North Road
              corridor.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COUNTRIES.map((c) => (
                <div
                  key={c.name}
                  className="bg-white border border-[#e2ddd0] rounded-xl p-5"
                >
                  <div className="text-2xl mb-3">{c.flag}</div>
                  <p className="text-sm font-medium mb-1">{c.name}</p>
                  <p className="text-xs text-[#5c6a7a] leading-relaxed mb-3">
                    {c.ports}
                  </p>
                  <span className="text-[9px] bg-[#2955c8]/10 text-[#2955c8] rounded px-2 py-1 tracking-wider">
                    {c.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── General enquiry ── */}
      <section className="px-8 py-14 border-t border-[#e2ddd0]">
        <p className="text-[11px] tracking-[2px] text-[#2955c8] uppercase mb-2">
          Still have questions?
        </p>
        <h2 className="text-2xl font-medium mb-2">General enquiry</h2>
        <p className="text-sm text-[#5c6a7a] mb-8 max-w-lg">
          Not quite what you were looking for? Send us a message and we&apos;ll
          get back to you directly.
        </p>
        <div className="max-w-md">
          <ContactForm />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#e2ddd0] px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-[#5c6a7a]">
          © 2026 GreatNorth Logistics and Freight Ltd. All rights reserved.
        </p>
        <div className="flex gap-5">
          {["Privacy", "Terms", "Services"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-xs text-[#5c6a7a] hover:text-[#10233d] transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}

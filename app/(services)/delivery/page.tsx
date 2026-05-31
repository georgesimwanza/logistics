"use client";

import { useState } from "react";
import NavBar from "@/app/components/NavBar";

// ── Types ──────────────────────────────────────────────────────────────────────

type TabId = "book" | "orders" | "track" | "fleet";

type ServiceType = "freight" | "vehicle" | "lastmile";

type ShipmentStatus = "In transit" | "At border" | "Delivered" | "Booked";

interface Shipment {
  id: string;
  ref: string;
  title: string;
  origin: string;
  destination: string;
  driver: string;
  eta: string;
  insured: boolean;
  status: ShipmentStatus;
}

interface TrackingStep {
  label: string;
  time: string;
  state: "done" | "active" | "pending";
}

interface FleetVehicle {
  icon: string;
  name: string;
  subtitle: string;
  specs: { label: string; value: string }[];
  available: boolean;
}

interface BookingForm {
  serviceType: ServiceType;
  pickup: string;
  delivery: string;
  date: string;
  weight: string;
  cargoType: string;
  units: string;
  insurance: string;
  name: string;
  phone: string;
  notes: string;
}

// ── Static data ────────────────────────────────────────────────────────────────

const SHIPMENTS: Shipment[] = [
  {
    id: "1",
    ref: "RKK-T-0091",
    title: "Toyota Land Cruiser 2020 — vehicle delivery",
    origin: "Dar es Salaam",
    destination: "Lusaka",
    driver: "Moses K.",
    eta: "Jun 25",
    insured: true,
    status: "In transit",
  },
  {
    id: "2",
    ref: "RKK-T-0088",
    title: "Building materials — 3 pallets",
    origin: "Nakonde",
    destination: "Ndola",
    driver: "Peter M.",
    eta: "Jun 24",
    insured: false,
    status: "At border",
  },
  {
    id: "3",
    ref: "RKK-T-0083",
    title: "Electronics — 12 boxes",
    origin: "Lubumbashi",
    destination: "Lusaka",
    driver: "Moses K.",
    eta: "Jun 18",
    insured: true,
    status: "Delivered",
  },
];

const TRACKING_STEPS: TrackingStep[] = [
  {
    label: "Picked up from origin",
    time: "Jun 23 · 07:14 · Dar es Salaam port",
    state: "done",
  },
  {
    label: "Departed Dar es Salaam",
    time: "Jun 23 · 10:30 · En route to border",
    state: "done",
  },
  {
    label: "Tunduma border checkpoint",
    time: "Jun 24 · Est. 14:00 · Awaiting crossing",
    state: "active",
  },
  { label: "Nakonde — Zambia entry", time: "Pending", state: "pending" },
  { label: "Delivered to Lusaka", time: "Est. Jun 25", state: "pending" },
];

const FLEET: FleetVehicle[] = [
  {
    icon: "🚛",
    name: "Heavy freight truck",
    subtitle: "Long-haul cross-border",
    specs: [
      { label: "Payload", value: "Up to 30 tonnes" },
      { label: "Routes", value: "ZM · TZ · DRC · ZW" },
      { label: "Tracking", value: "Real-time GPS" },
    ],
    available: true,
  },
  {
    icon: "🚗",
    name: "Car transporter",
    subtitle: "Vehicle delivery — drive or flatbed",
    specs: [
      { label: "Capacity", value: "1 – 4 vehicles" },
      { label: "Routes", value: "All regional routes" },
      { label: "Insurance", value: "Optional add-on" },
    ],
    available: true,
  },
  {
    icon: "🚐",
    name: "Mid-size van",
    subtitle: "Last-mile & local delivery",
    specs: [
      { label: "Payload", value: "Up to 1.5 tonnes" },
      { label: "Coverage", value: "Lusaka & surrounds" },
      { label: "Turnaround", value: "Same / next day" },
    ],
    available: false,
  },
  {
    icon: "🏗️",
    name: "Flatbed / lowbed",
    subtitle: "Machinery & oversize loads",
    specs: [
      { label: "Payload", value: "Up to 60 tonnes" },
      { label: "Use case", value: "Machinery, equipment" },
      { label: "Permit", value: "Escort arranged" },
    ],
    available: true,
  },
];

const SERVICE_TYPES: {
  id: ServiceType;
  icon: string;
  name: string;
  desc: string;
}[] = [
  {
    id: "freight",
    icon: "🚛",
    name: "Freight / cargo",
    desc: "Goods & pallets",
  },
  {
    id: "vehicle",
    icon: "🚗",
    name: "Vehicle delivery",
    desc: "Drive or flatbed",
  },
  {
    id: "lastmile",
    icon: "📦",
    name: "Last-mile delivery",
    desc: "Local drop-off",
  },
];

const EMPTY_FORM: BookingForm = {
  serviceType: "freight",
  pickup: "",
  delivery: "",
  date: "",
  weight: "",
  cargoType: "",
  units: "",
  insurance: "Yes — add insurance",
  name: "",
  phone: "",
  notes: "",
};

// ── Helpers ────────────────────────────────────────────────────────────────────

const statusBadge: Record<ShipmentStatus, string> = {
  "In transit": "bg-[#f0a830]/10 text-[#f0a830]",
  "At border": "bg-[#7ab8e8]/10 text-[#7ab8e8]",
  Delivered: "bg-[#b5cc18]/10 text-[#b5cc18]",
  Booked: "bg-white/6 text-white/40",
};

const inputCls =
  "bg-[#1a1a1a] border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#b5cc18]/50";

const labelCls = "text-[10px] uppercase tracking-[1.5px] text-white/35";

// ── Page ───────────────────────────────────────────────────────────────────────

export default function TransportationPage() {
  const [activeTab, setActiveTab] = useState<TabId>("book");
  const [form, setForm] = useState<BookingForm>(EMPTY_FORM);
  const [trackRef, setTrackRef] = useState("");
  const [trackingVisible, setTrackingVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateForm = (field: keyof BookingForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/transport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Booking failed. Please try again.");
      }

      setSubmitted(true);
      setForm(EMPTY_FORM);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrack = () => {
    if (trackRef.trim()) setTrackingVisible(true);
  };

  const activeCount = SHIPMENTS.filter((s) => s.status !== "Delivered").length;

  const tabs: { id: TabId; label: string; badge?: number }[] = [
    { id: "book", label: "Book transport" },
    { id: "orders", label: "My shipments", badge: activeCount },
    { id: "track", label: "Track shipment" },
    { id: "fleet", label: "Our fleet" },
  ];

  return (
    <main className="bg-[#111111] text-white min-h-screen font-sans">
      <NavBar />

      {/* Hero */}
      <section className="px-8 py-16 border-b border-white/10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#b5cc18]/10 border border-[#b5cc18]/30 rounded-full px-3 py-1 text-xs text-[#b5cc18] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b5cc18]" />
            Transportation &amp; Freight
          </div>
          <h1 className="text-4xl md:text-5xl font-medium leading-[1.1] mb-5">
            Move anything,{" "}
            <span className="text-[#b5cc18]">anywhere in the region</span>
          </h1>
          <p className="text-white/50 text-sm leading-relaxed max-w-lg mb-8">
            Cross-border road freight, vehicle delivery, and last-mile cargo —
            tracked in real time from pickup to drop-off.
          </p>
          <div className="flex gap-8">
            {[
              { val: "4", label: "Countries" },
              { val: "12+", label: "Border posts" },
              { val: "48h", label: "Avg. delivery" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-2xl font-medium text-[#b5cc18]">
                  {s.val}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/35">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex border-b border-white/10 px-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-4 text-xs whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === tab.id
                ? "border-[#b5cc18] text-[#b5cc18]"
                : "border-transparent text-white/40 hover:text-white/70"
            }`}
          >
            {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className="bg-[#b5cc18]/15 text-[#b5cc18] rounded-full px-2 py-0.5 text-[9px]">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="px-8 py-10">
        {/* ── Book transport ── */}
        {activeTab === "book" && (
          <div className="max-w-2xl">
            <p className="text-[11px] tracking-[2px] text-[#b5cc18] uppercase mb-1">
              03
            </p>
            <h2 className="text-2xl font-medium mb-2">Book a transport</h2>
            <p className="text-sm text-white/45 mb-8">
              Select your service type, fill in the details, and well confirm
              within the hour.
            </p>

            {submitted && (
              <div className="mb-6 bg-[#b5cc18]/10 border border-[#b5cc18]/30 rounded-lg px-4 py-3 text-sm text-[#b5cc18]">
                ✓ Booking received! Well confirm shortly.
              </div>
            )}

            {submitError && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400">
                ✕ {submitError}
              </div>
            )}

            {/* Service type selector */}
            <p className="text-[10px] uppercase tracking-[2px] text-white/25 mb-3 pb-2 border-b border-white/6">
              Service type
            </p>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {SERVICE_TYPES.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => updateForm("serviceType", st.id)}
                  className={`rounded-xl p-4 text-center border transition-colors ${
                    form.serviceType === st.id
                      ? "border-[#b5cc18] bg-[#b5cc18]/6"
                      : "border-white/8 bg-[#1a1a1a] hover:border-white/20"
                  }`}
                >
                  <div className="text-2xl mb-2">{st.icon}</div>
                  <div className="text-xs font-medium mb-1">{st.name}</div>
                  <div className="text-[10px] text-white/35">{st.desc}</div>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Route */}
              <fieldset className="flex flex-col gap-4">
                <legend className="text-[10px] uppercase tracking-[2px] text-white/25 mb-1 pb-2 border-b border-white/6 w-full">
                  Route
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Pickup location</label>
                    <select
                      value={form.pickup}
                      onChange={(e) => updateForm("pickup", e.target.value)}
                      className={inputCls}
                      required
                    >
                      <option value="">Select origin</option>
                      <option>Nakonde, Zambia</option>
                      <option>Lusaka, Zambia</option>
                      <option>Dar es Salaam, Tanzania</option>
                      <option>Lubumbashi, DRC</option>
                      <option>Harare, Zimbabwe</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Delivery location</label>
                    <select
                      value={form.delivery}
                      onChange={(e) => updateForm("delivery", e.target.value)}
                      className={inputCls}
                      required
                    >
                      <option value="">Select destination</option>
                      <option>Lusaka, Zambia</option>
                      <option>Nakonde, Zambia</option>
                      <option>Ndola, Zambia</option>
                      <option>Dar es Salaam, Tanzania</option>
                      <option>Lubumbashi, DRC</option>
                      <option>Harare, Zimbabwe</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Pickup date</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => updateForm("date", e.target.value)}
                      className={inputCls}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Cargo weight (kg)</label>
                    <input
                      type="text"
                      placeholder="e.g. 1,200"
                      value={form.weight}
                      onChange={(e) => updateForm("weight", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Cargo details */}
              <fieldset className="flex flex-col gap-4">
                <legend className="text-[10px] uppercase tracking-[2px] text-white/25 mb-1 pb-2 border-b border-white/6 w-full">
                  Cargo details
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Cargo type</label>
                    <select
                      value={form.cargoType}
                      onChange={(e) => updateForm("cargoType", e.target.value)}
                      className={inputCls}
                      required
                    >
                      <option value="">Select</option>
                      <option>General goods</option>
                      <option>Motor vehicle</option>
                      <option>Machinery</option>
                      <option>Electronics</option>
                      <option>Building materials</option>
                      <option>Food &amp; perishables</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>No. of units / pallets</label>
                    <input
                      type="text"
                      placeholder="e.g. 4"
                      value={form.units}
                      onChange={(e) => updateForm("units", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Insurance needed?</label>
                    <select
                      value={form.insurance}
                      onChange={(e) => updateForm("insurance", e.target.value)}
                      className={inputCls}
                    >
                      <option>Yes — add insurance</option>
                      <option>No — at own risk</option>
                    </select>
                  </div>
                </div>
              </fieldset>

              {/* Contact */}
              <fieldset className="flex flex-col gap-4">
                <legend className="text-[10px] uppercase tracking-[2px] text-white/25 mb-1 pb-2 border-b border-white/6 w-full">
                  Your details
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Full name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => updateForm("name", e.target.value)}
                      required
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Phone / WhatsApp</label>
                    <input
                      type="text"
                      placeholder="+260…"
                      value={form.phone}
                      onChange={(e) => updateForm("phone", e.target.value)}
                      required
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className={labelCls}>Additional instructions</label>
                    <textarea
                      rows={3}
                      placeholder="Fragile cargo, special handling, delivery hours, gate codes…"
                      value={form.notes}
                      onChange={(e) => updateForm("notes", e.target.value)}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                </div>
              </fieldset>

              <button
                type="submit"
                disabled={submitting}
                className="bg-[#b5cc18] text-[#111] text-sm font-medium py-3 rounded-md hover:bg-[#c8e01a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending…" : "Request transport →"}
              </button>
            </form>
          </div>
        )}

        {/* ── My shipments ── */}
        {activeTab === "orders" && (
          <div className="max-w-2xl">
            <p className="text-[11px] tracking-[2px] text-[#b5cc18] uppercase mb-1">
              Active &amp; recent
            </p>
            <h2 className="text-2xl font-medium mb-2">Your shipments</h2>
            <p className="text-sm text-white/45 mb-8">
              Track the live position and status of all your freight and
              deliveries.
            </p>
            <div className="flex flex-col gap-4">
              {SHIPMENTS.map((s) => (
                <div
                  key={s.id}
                  className="bg-[#1a1a1a] border border-white/8 rounded-xl p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium">{s.title}</p>
                      <p className="text-[10px] text-white/35 mt-0.5">
                        REF: {s.ref}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 ${statusBadge[s.status]}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {s.status}
                    </span>
                  </div>
                  {/* Route row */}
                  <div className="flex items-center gap-3 mb-3 text-xs text-white/50">
                    <span className="w-2 h-2 rounded-full border-2 border-[#b5cc18] shrink-0" />
                    <span>{s.origin}</span>
                    <div className="flex-1 h-px bg-white/10 relative">
                      <span className="absolute right-0 -top-2 text-white/20 text-xs">
                        →
                      </span>
                    </div>
                    <span className="w-2 h-2 rounded-full border border-white/30 bg-white/15 shrink-0" />
                    <span>{s.destination}</span>
                  </div>
                  <div className="flex gap-5 text-[10px] text-white/35">
                    <span>
                      Driver:{" "}
                      <strong className="text-white/60">{s.driver}</strong>
                    </span>
                    <span>
                      {s.status === "Delivered"
                        ? "Delivered:"
                        : "Est. arrival:"}{" "}
                      <strong className="text-white/60">{s.eta}</strong>
                    </span>
                    <span>
                      Insured:{" "}
                      <strong className="text-white/60">
                        {s.insured ? "Yes" : "No"}
                      </strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Track shipment ── */}
        {activeTab === "track" && (
          <div className="max-w-2xl">
            <p className="text-[11px] tracking-[2px] text-[#b5cc18] uppercase mb-1">
              Live tracking
            </p>
            <h2 className="text-2xl font-medium mb-2">Track your shipment</h2>
            <p className="text-sm text-white/45 mb-8">
              Enter your reference number to see the latest checkpoint updates.
            </p>

            <div className="bg-[#161616] border border-white/8 rounded-xl p-6">
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Enter reference — e.g. RKK-T-0091"
                  value={trackRef}
                  onChange={(e) => setTrackRef(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                  className={`${inputCls} flex-1`}
                />
                <button
                  onClick={handleTrack}
                  className="bg-[#b5cc18] text-[#111] text-sm font-medium px-5 rounded-md hover:bg-[#c8e01a] transition-colors whitespace-nowrap"
                >
                  Track →
                </button>
              </div>

              {trackingVisible && (
                <>
                  <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/6">
                    <div>
                      <p className="text-sm font-medium">
                        Toyota Land Cruiser 2020
                      </p>
                      <p className="text-[10px] text-white/35 mt-0.5">
                        RKK-T-0091 · Dar es Salaam → Lusaka
                      </p>
                    </div>
                    <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-[#f0a830]/10 text-[#f0a830] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      In transit
                    </span>
                  </div>

                  <div className="flex flex-col gap-0">
                    {TRACKING_STEPS.map((step, i) => (
                      <div key={i} className="flex gap-3 pb-5 relative">
                        {i < TRACKING_STEPS.length - 1 && (
                          <div className="absolute left-[11px] top-6 bottom-0 w-px bg-white/7" />
                        )}
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 z-10 ${
                            step.state === "done"
                              ? "bg-[#b5cc18] text-[#111]"
                              : step.state === "active"
                                ? "bg-[#b5cc18]/15 border border-[#b5cc18] text-[#b5cc18]"
                                : "bg-[#222] border border-white/10 text-white/25"
                          }`}
                        >
                          {step.state === "done" ? "✓" : i + 1}
                        </div>
                        <div className="pt-0.5">
                          <p
                            className={`text-sm font-medium mb-0.5 ${
                              step.state === "active"
                                ? "text-[#b5cc18]"
                                : step.state === "pending"
                                  ? "text-white/30"
                                  : ""
                            }`}
                          >
                            {step.label}
                          </p>
                          <p
                            className={`text-xs ${step.state === "pending" ? "text-white/20" : "text-white/35"}`}
                          >
                            {step.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── Fleet ── */}
        {activeTab === "fleet" && (
          <div className="max-w-2xl">
            <p className="text-[11px] tracking-[2px] text-[#b5cc18] uppercase mb-1">
              Our vehicles
            </p>
            <h2 className="text-2xl font-medium mb-2">Fleet &amp; capacity</h2>
            <p className="text-sm text-white/45 mb-8">
              We match the right vehicle to your cargo type and route.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FLEET.map((v) => (
                <div
                  key={v.name}
                  className="bg-[#1a1a1a] border border-white/8 rounded-xl p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#b5cc18]/10 flex items-center justify-center text-xl">
                      {v.icon}
                    </div>
                    <span
                      className={`text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                        v.available
                          ? "bg-[#b5cc18]/10 text-[#b5cc18]"
                          : "bg-[#f0a830]/10 text-[#f0a830]"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {v.available ? "Available" : "On route"}
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-1">{v.name}</p>
                  <p className="text-xs text-white/35 mb-4">{v.subtitle}</p>
                  <div className="flex flex-col gap-2">
                    {v.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex justify-between text-xs"
                      >
                        <span className="text-white/35">{spec.label}</span>
                        <span className="text-white/65">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

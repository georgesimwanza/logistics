import Link from "next/link";
import { Oswald, Inter, JetBrains_Mono } from "next/font/google";
import ContactForm from "@/app/components/contactForm";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

// ── Design tokens ──
// Paper   #f7f4ee   background
// Ink     #10233d   primary text / headlines
// Highway #2955c8   primary accent — the route, CTAs, links
// Amber   #d98f2b   secondary accent — customs / clearance touches, used sparingly
// Slate   #5c6a7a   muted body text
// Line    #e2ddd0   hairline borders on paper

const ROUTE = [
  { code: "TZ", name: "Dar es Salaam", note: "Port of origin" },
  { code: "TZ/ZM", name: "Tunduma – Nakonde", note: "Border post" },
  { code: "ZM", name: "Lusaka", note: "Inland hub" },
  { code: "ZM/CD", name: "Kasumbalesa", note: "Border post" },
  { code: "CD", name: "Lubumbashi", note: "Copperbelt terminus" },
];

const SERVICES = [
  {
    title: "Vehicle buying & selling",
    desc: "We source and procure vehicles on your behalf, handling paperwork and inspections from start to finish.",
    icon: (
      <path d="M4 16v-3.5L6 8h12l2 4.5V16M4 16h16M4 16a1.5 1.5 0 0 0 3 0M17 16a1.5 1.5 0 0 0 3 0M7 12h10" />
    ),
  },
  {
    title: "Customs clearing",
    desc: "Fast, compliant clearance with licensed agents who work the Nakonde and Kasumbalesa posts daily.",
    icon: <path d="M5 4h14v16l-3-2-2 2-2-2-2 2-2-2-3 2V4Zm3 5h8M8 12h8M8 15h5" />,
  },
  {
    title: "Freight forwarding",
    desc: "Reliable movement of goods and vehicles across borders, with real-time updates along the corridor.",
    icon: <path d="M3 16V8h9l3 4h6v4M3 16a2 2 0 0 0 4 0M14 16a2 2 0 0 0 4 0M3 16h11m4 0h3" />,
  },
  {
    title: "Shipment tracking",
    desc: "Know where your cargo sits on the route at every stage, from Dar es Salaam to Lubumbashi.",
    icon: <path d="M12 21s7-6.2 7-11.2A7 7 0 0 0 5 9.8C5 14.8 12 21 12 21Zm0-9a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" />,
  },
];

const WHY = [
  {
    title: "Licensed agents",
    desc: "Fully licensed and bonded, compliant with Zambian, Tanzanian, and DRC customs authorities.",
  },
  {
    title: "Transparent pricing",
    desc: "A full cost breakdown before we start — duties, clearance fees, and transport, no surprises at the border.",
  },
  {
    title: "Fast turnaround",
    desc: "We move quickly so your vehicles and cargo aren't sitting idle at Nakonde or Kasumbalesa.",
  },
];

export default function Home() {
  return (
    <main
      className={`${oswald.variable} ${inter.variable} ${mono.variable} bg-[#f7f4ee] text-[#10233d] min-h-screen font-[family-name:var(--font-body)]`}
    >
      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-[#e2ddd0]">
        <div className="flex items-center gap-3">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <rect width="34" height="34" rx="8" fill="#2955c8" />
            <path
              d="M17 8c-3.3 0-6 2.6-6 6 0 4.4 6 12 6 12s6-7.6 6-12c0-3.4-2.7-6-6-6Z"
              fill="#f7f4ee"
            />
            <circle cx="17" cy="14" r="2.2" fill="#2955c8" />
          </svg>
          <span className="text-sm font-[family-name:var(--font-display)] font-medium tracking-[1.5px] uppercase">
            GreatNorth <span className="text-[#2955c8]">Logistics &amp; Freight</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Services", href: "#services" },
            { label: "Route", href: "/coming-soon" },
            { label: "Track", href: "/coming-soon" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-[#5c6a7a] hover:text-[#10233d] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
        <Link
          href="/login"
          className="bg-[#2955c8] text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-[#1f45a8] transition-colors"
        >
          Get started
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-40 -top-40 w-[560px] h-[560px] rounded-full bg-[#2955c8]/[0.06]"
          aria-hidden
        />
        <div className="relative grid md:grid-cols-2 gap-10 px-8 py-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#d98f2b]/10 border border-[#d98f2b]/30 rounded-full px-3 py-1 text-xs text-[#a3690f] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d98f2b]" />
              Licensed &amp; bonded clearing agents
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-medium leading-[1.1] mb-5">
              Clearing &amp; forwarding, the length of the{" "}
              <span className="text-[#2955c8]">Great North Road.</span>
            </h1>
            <p className="text-[#5c6a7a] text-sm leading-relaxed mb-8 max-w-md">
              GreatNorth Logistics and Freight moves vehicles and cargo across
              the Dar es Salaam–Nakonde–Lusaka–Kasumbalesa corridor — customs
              clearance, freight forwarding, and vehicle sourcing, handled
              end to end.
            </p>
            <div className="flex gap-3">
              <a
                href="#contact"
                className="bg-[#2955c8] text-white text-sm font-medium px-6 py-3 rounded-md hover:bg-[#1f45a8] transition-colors"
              >
                Get a quote
              </a>
              <a
                href="/coming-soon"
                className="border border-[#10233d]/15 text-[#10233d] text-sm px-6 py-3 rounded-md hover:bg-[#10233d]/5 transition-colors"
              >
                Track shipment
              </a>
            </div>
          </div>

          {/* Signature element — the corridor */}
          <div className="bg-white border border-[#e2ddd0] rounded-xl p-7">
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[2px] text-[#5c6a7a] uppercase mb-6">
              The corridor · 5 stops · 3 countries
            </p>
            <div className="relative pl-6">
              <div className="absolute left-[7px] top-1 bottom-1 border-l-2 border-dashed border-[#2955c8]/30" />
              <div className="flex flex-col gap-5">
                {ROUTE.map((stop, i) => (
                  <div key={stop.name} className="relative flex items-start gap-3">
                    <span
                      className={`absolute -left-6 mt-1 w-3.5 h-3.5 rounded-full border-2 ${
                        i === 0 || i === ROUTE.length - 1
                          ? "bg-[#2955c8] border-[#2955c8]"
                          : "bg-white border-[#2955c8]"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium leading-tight">{stop.name}</p>
                      <p className="font-[family-name:var(--font-mono)] text-[11px] text-[#5c6a7a]">
                        {stop.code} · {stop.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 mx-8 rounded-xl overflow-hidden border border-[#e2ddd0] mb-2 bg-white">
        {[
          { num: "500+", label: "Vehicles cleared" },
          { num: "2", label: "Border posts covered" },
          { num: "24/7", label: "Dispatch support" },
        ].map((s, i) => (
          <div
            key={i}
            className="px-6 py-5 border-r border-[#e2ddd0] last:border-r-0"
          >
            <p className="font-[family-name:var(--font-display)] text-2xl font-medium text-[#2955c8] mb-1">
              {s.num}
            </p>
            <p className="text-xs text-[#5c6a7a]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Services ── */}
      <section id="services" className="px-8 py-14">
        <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[2px] text-[#2955c8] uppercase mb-2">
          What we do
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium mb-2">
          Our services
        </h2>
        <p className="text-sm text-[#5c6a7a] mb-8">
          End-to-end logistics for the Zambia–Tanzania–DRC corridor
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="bg-white border border-[#e2ddd0] rounded-xl p-6 hover:border-[#2955c8]/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#2955c8]/10 flex items-center justify-center mb-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2955c8"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {s.icon}
                </svg>
              </div>
              <h3 className="text-sm font-medium mb-2">{s.title}</h3>
              <p className="text-xs text-[#5c6a7a] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why GreatNorth ── */}
      <section className="px-8 pb-14">
        <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[2px] text-[#2955c8] uppercase mb-2">
          Why GreatNorth
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium mb-2">
          Built on trust
        </h2>
        <p className="text-sm text-[#5c6a7a] mb-8">What sets us apart</p>
        <div className="grid md:grid-cols-3 gap-4">
          {WHY.map((w) => (
            <div
              key={w.title}
              className="bg-white border border-[#e2ddd0] rounded-xl p-5"
            >
              <div className="w-2 h-2 rounded-full bg-[#d98f2b] mb-4" />
              <h3 className="text-sm font-medium mb-2">{w.title}</h3>
              <p className="text-xs text-[#5c6a7a] leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA strip ── */}
      <div className="mx-8 mb-14 bg-[#2955c8] rounded-xl p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-medium text-white max-w-sm leading-snug">
          Ready to move your cargo or vehicle? Let&apos;s talk.
        </h2>
        <a
          href="#contact"
          className="bg-white text-[#2955c8] text-sm font-medium px-6 py-3 rounded-md hover:bg-[#f7f4ee] transition-colors whitespace-nowrap"
        >
          Contact us →
        </a>
      </div>

      {/* ── Contact ── */}
      <section id="contact" className="px-8 pb-16">
        <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[2px] text-[#2955c8] uppercase mb-2">
          Get in touch
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium mb-2">
          Contact us
        </h2>
        <p className="text-sm text-[#5c6a7a] mb-8">
          Available on call, WhatsApp, and email
        </p>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-5">
            {[
              {
                label: "Call / WhatsApp",
                lines: [
                  "+260 777 547 157",
                ],
              },
              { label: "Email", lines: ["simwanzageorge200@gmail.com"] },
              { label: "Location", lines: ["Nakonde Hospital Junction"] },
            ].map((c) => (
              <div key={c.label} className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#2955c8]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#2955c8] text-xs">✦</span>
                </div>
                <div>
                  <p className="text-xs text-[#5c6a7a] mb-1">{c.label}</p>
                  {c.lines.map((l) => (
                    <p
                      key={l}
                      className="text-sm text-[#10233d] leading-relaxed font-[family-name:var(--font-mono)]"
                    >
                      {l}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
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

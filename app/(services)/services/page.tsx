"use client";
import NavBar from "@/app/components/NavBar";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="bg-[#f7f4ee] text-[#10233d] min-h-screen font-sans">
      <NavBar />
      {/* ── Hero ── */}
      <section className="px-8 py-16 border-b border-[#e2ddd0]">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#d98f2b]/10 border border-[#d98f2b]/30 rounded-full px-3 py-1 text-xs text-[#a3690f] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d98f2b]" />
            Explore our services
          </div>
          <h1 className="text-4xl md:text-5xl font-medium leading-[1.1] mb-5">
            Everything you need,{" "}
            <span className="text-[#2955c8]">under one roof</span>
          </h1>
          <p className="text-[#5c6a7a] text-sm leading-relaxed max-w-lg">
            From buying your next vehicle to clearing it through customs and
            delivering it to your door — GreatNorth Logistics and Freight
            handles every step with care and expertise.
          </p>
        </div>
      </section>

      {/* ── Car Selling Service ── */}
      <section id="car-sales" className="px-8 py-14 border-b border-[#e2ddd0]">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[11px] tracking-[2px] text-[#2955c8] uppercase mb-2">
              01
            </p>
            <h2 className="text-2xl font-medium mb-4">
              Car Buying &amp; Selling
            </h2>
            <p className="text-sm text-[#5c6a7a] leading-relaxed mb-6">
              Whether you&apos;re looking to purchase a vehicle or sell one, our
              team handles the entire process. We source quality vehicles,
              verify documentation, negotiate on your behalf, and ensure a
              smooth, transparent transaction from start to finish.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                "Vehicle sourcing &amp; procurement",
                "Full inspection &amp; verification",
                "Paperwork &amp; title transfer",
                "Competitive pricing &amp; negotiation",
                "Import &amp; export facilitation",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-[#10233d]/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2955c8] shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
            <Link
              href={"/car_selling"}
              className="inline-flex items-center gap-2 bg-[#2955c8] text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-[#1f45a8] transition-colors"
            >
              Enquire about a vehicle →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "🚗", label: "New vehicles" },
              { icon: "🔁", label: "Used vehicles" },
              { icon: "📄", label: "Documentation" },
              { icon: "🤝", label: "Deal brokering" },
            ].map((c) => (
              <div
                key={c.label}
                className="bg-white border border-[#e2ddd0] rounded-xl p-5 flex flex-col gap-3"
              >
                <span className="text-2xl">{c.icon}</span>
                <p className="text-sm text-[#5c6a7a]">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clearing Service ── */}
      <section id="clearing" className="px-8 py-14 border-b border-[#e2ddd0]">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="order-2 md:order-1">
            <div className="bg-white border border-[#e2ddd0] rounded-xl p-8">
              <p className="text-[11px] tracking-[2px] text-[#2955c8] uppercase mb-4">
                How it works
              </p>
              {[
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
              ].map((s) => (
                <div key={s.step} className="flex gap-4 mb-5 last:mb-0">
                  <div className="w-7 h-7 rounded-full bg-[#2955c8] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-xs font-semibold">
                      {s.step}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#10233d] mb-0.5">
                      {s.title}
                    </p>
                    <p
                      className="text-xs text-[#5c6a7a]"
                      dangerouslySetInnerHTML={{ __html: s.desc }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <p className="text-[11px] tracking-[2px] text-[#2955c8] uppercase mb-2">
              02
            </p>
            <h2 className="text-2xl font-medium mb-4">Customs Clearing</h2>
            <p className="text-sm text-[#5c6a7a] leading-relaxed mb-6">
              Navigating customs can be complex and time-consuming. Our licensed
              clearing agents know the regulations inside out across Zambia,
              Tanzania, DRC, and beyond — ensuring fast, compliant clearance
              every time.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                "Licensed customs agents",
                "Multi-country expertise",
                "Duty &amp; tax calculation",
                "Compliance &amp; risk management",
                "Expedited clearance options",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-[#10233d]/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2955c8] shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
            <Link
              href="/clearance"
              className="inline-flex items-center gap-2 bg-[#2955c8] text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-[#1f45a8] transition-colors"
            >
              Start clearing →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Transportation Service ── */}
      <section
        id="transportation"
        className="px-8 py-14 border-b border-[#e2ddd0]"
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[11px] tracking-[2px] text-[#2955c8] uppercase mb-2">
              03
            </p>
            <h2 className="text-2xl font-medium mb-4">
              Transportation &amp; Freight
            </h2>
            <p className="text-sm text-[#5c6a7a] leading-relaxed mb-6">
              Once cleared, your vehicle or cargo needs to reach its destination
              safely. We coordinate reliable road freight across borders with
              real-time tracking so you always know where your shipment is.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                "Cross-border road freight",
                "Vehicle transportation",
                "Real-time shipment tracking",
                "Last-mile delivery",
                "Cargo insurance options",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-[#10233d]/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2955c8] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/delivery"
              className="inline-flex items-center gap-2 bg-[#2955c8] text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-[#1f45a8] transition-colors"
            >
              Book transport →
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {[
              {
                icon: "🛣️",
                title: "Cross-border routes",
                desc: "Zambia · Tanzania · DRC and beyond.",
              },
              {
                icon: "📍",
                title: "Live tracking",
                desc: "Get updates at every checkpoint via call or our portal.",
              },
              {
                icon: "🔒",
                title: "Insured cargo",
                desc: "Optional cargo insurance for full peace of mind.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white border border-[#e2ddd0] rounded-xl p-5 flex gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-[#2955c8]/10 flex items-center justify-center shrink-0 text-lg">
                  {f.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#10233d] mb-1">
                    {f.title}
                  </p>
                  <p className="text-xs text-[#5c6a7a] leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="mx-8 my-14 bg-[#2955c8] rounded-xl p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-medium text-white leading-snug mb-1">
            Not sure which service you need?
          </h2>
          <p className="text-sm text-white/70">
            Our team will guide you through the right solution.
          </p>
        </div>
        <a
          href="#contact"
          className="bg-white text-[#2955c8] text-sm font-medium px-6 py-3 rounded-md hover:bg-[#f7f4ee] transition-colors whitespace-nowrap"
        >
          Talk to us →
        </a>
      </div>

      {/* ── Contact ── */}
      <section id="contact" className="px-8 pb-16">
        <p className="text-[11px] tracking-[2px] text-[#2955c8] uppercase mb-2">
          Get in touch
        </p>
        <h2 className="text-2xl font-medium mb-2">Contact us</h2>
        <p className="text-sm text-[#5c6a7a] mb-8">
          Available on call, WhatsApp, and email
        </p>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-5">
            {[
              {
                label: "Call / WhatsApp",
                lines: ["+260 777 547 157"],
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
                    <p key={l} className="text-sm text-[#10233d] leading-relaxed">
                      {l}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <form className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your name"
              className="bg-white border border-[#e2ddd0] rounded-md px-4 py-3 text-sm text-[#10233d] placeholder:text-[#5c6a7a]/60 focus:outline-none focus:border-[#2955c8]/50"
            />
            <input
              type="text"
              placeholder="Phone or email"
              className="bg-white border border-[#e2ddd0] rounded-md px-4 py-3 text-sm text-[#10233d] placeholder:text-[#5c6a7a]/60 focus:outline-none focus:border-[#2955c8]/50"
            />
            <select className="bg-white border border-[#e2ddd0] rounded-md px-4 py-3 text-sm text-[#5c6a7a] focus:outline-none focus:border-[#2955c8]/50">
              <option value="">Select a service</option>
              <option value="car-sales">Car Buying &amp; Selling</option>
              <option value="clearing">Customs Clearing</option>
              <option value="transport">Transportation &amp; Freight</option>
            </select>
            <textarea
              rows={4}
              placeholder="Tell us more about your needs..."
              className="bg-white border border-[#e2ddd0] rounded-md px-4 py-3 text-sm text-[#10233d] placeholder:text-[#5c6a7a]/60 focus:outline-none focus:border-[#2955c8]/50 resize-none"
            />
            <button
              type="submit"
              className="bg-[#2955c8] text-white text-sm font-medium py-3 rounded-md hover:bg-[#1f45a8] transition-colors"
            >
              Send message
            </button>
          </form>
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

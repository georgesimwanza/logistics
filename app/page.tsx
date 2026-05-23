import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#111111] text-white min-h-screen font-sans">
      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#b5cc18] flex items-center justify-center">
            <span className="text-[#111] font-semibold text-base leading-none">
              R
            </span>
          </div>
          <span className="text-sm font-medium tracking-[2px] uppercase">
            RKK Logistics
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Services", "Fleet", "Track", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        <Link
          href="/login"
          className="bg-[#b5cc18] text-[#111] text-sm font-medium px-4 py-2 rounded-md hover:bg-[#c8e01a] transition-colors"
        >
          Get started
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section className="grid md:grid-cols-2 gap-8 px-8 py-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#b5cc18]/10 border border-[#b5cc18]/30 rounded-full px-3 py-1 text-xs text-[#b5cc18] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b5cc18]" />
            Licensed &amp; bonded clearing agents
          </div>
          <h1 className="text-4xl md:text-5xl font-medium leading-[1.1] mb-5">
            Clearing &amp; Forwarding{" "}
            <span className="text-[#b5cc18]">
              Solutions Delivered With Care
            </span>
          </h1>
          <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md">
            Experts in vehicle buying, selling, clearing, and forwarding. Fast,
            reliable, and transparent logistics across borders.
          </p>
          <div className="flex gap-3">
            <a
              href="#contact"
              className="bg-[#b5cc18] text-[#111] text-sm font-medium px-6 py-3 rounded-md hover:bg-[#c8e01a] transition-colors"
            >
              Get a quote
            </a>
            <a
              href="#track"
              className="border border-white/20 text-white text-sm px-6 py-3 rounded-md hover:bg-white/5 transition-colors"
            >
              Track shipment
            </a>
          </div>
        </div>
        <div className="bg-[#b5cc18]/5 border border-[#b5cc18]/15 rounded-xl p-10 flex flex-col items-center justify-center min-h-[240px]">
          <div className="w-20 h-20 rounded-full bg-[#b5cc18] flex items-center justify-center mb-5">
            <span className="text-4xl font-semibold text-[#111]">R</span>
          </div>
          <p className="text-xs tracking-[2.5px] text-white/40 uppercase text-center">
            RKK Logistics Limited
          </p>
          <p className="text-xs text-white/25 mt-1 text-center">
            Nakonde Hospital Junction
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 mx-8 rounded-xl overflow-hidden border border-white/10 mb-2">
        {[
          { num: "500+", label: "Vehicles cleared" },
          { num: "24/7", label: "Support available" },
          { num: "4 countries", label: "Operational reach" },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-[#1a1a1a] px-6 py-5 border-r border-white/10 last:border-r-0"
          >
            <p className="text-2xl font-medium text-[#b5cc18] mb-1">{s.num}</p>
            <p className="text-xs text-white/40">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Services ── */}
      <section id="services" className="px-8 py-14">
        <p className="text-[11px] tracking-[2px] text-[#b5cc18] uppercase mb-2">
          What we do
        </p>
        <h2 className="text-2xl font-medium mb-2">Our services</h2>
        <p className="text-sm text-white/45 mb-8">
          End-to-end logistics solutions tailored for your needs
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              icon: "🚗",
              title: "Vehicle buying & selling",
              desc: "We source and procure vehicles on your behalf, handling all paperwork and inspections from start to finish.",
            },
            {
              icon: "📋",
              title: "Customs clearing",
              desc: "Fast, compliant customs clearance with experienced agents who know the process inside out.",
            },
            {
              icon: "🚚",
              title: "Freight forwarding",
              desc: "Reliable movement of goods and vehicles across borders with real-time updates along the way.",
            },
            {
              icon: "📍",
              title: "Shipment tracking",
              desc: "Know where your cargo is at every stage with our tracking portal accessible to you and your team.",
            },
          ].map((s) => (
            <div
              key={s.title}
              className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 hover:border-[#b5cc18]/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#b5cc18]/10 flex items-center justify-center mb-4 text-lg">
                {s.icon}
              </div>
              <h3 className="text-sm font-medium text-white mb-2">{s.title}</h3>
              <p className="text-xs text-white/45 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why RKK ── */}
      <section className="px-8 pb-14">
        <p className="text-[11px] tracking-[2px] text-[#b5cc18] uppercase mb-2">
          Why RKK
        </p>
        <h2 className="text-2xl font-medium mb-2">Built on trust</h2>
        <p className="text-sm text-white/45 mb-8">What sets us apart</p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              n: "01",
              title: "Licensed agents",
              desc: "All our clearing agents are fully licensed and compliant with regional customs authorities.",
            },
            {
              n: "02",
              title: "Transparent pricing",
              desc: "No hidden fees. You get a full breakdown before we start — and we stick to it.",
            },
            {
              n: "03",
              title: "Fast turnaround",
              desc: "We move quickly so your vehicles and cargo aren't sitting idle at the border.",
            },
          ].map((w) => (
            <div
              key={w.n}
              className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5"
            >
              <p className="text-3xl font-medium text-[#b5cc18]/20 mb-3">
                {w.n}
              </p>
              <h3 className="text-sm font-medium text-white mb-2">{w.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA strip ── */}
      <div className="mx-8 mb-14 bg-[#b5cc18] rounded-xl p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <h2 className="text-xl font-medium text-[#111] max-w-sm leading-snug">
          Ready to move your cargo or vehicle? Let&apos;s talk.
        </h2>
        <a
          href="#contact"
          className="bg-[#111] text-[#b5cc18] text-sm font-medium px-6 py-3 rounded-md hover:bg-[#222] transition-colors whitespace-nowrap"
        >
          Contact us →
        </a>
      </div>

      {/* ── Contact ── */}
      <section id="contact" className="px-8 pb-16">
        <p className="text-[11px] tracking-[2px] text-[#b5cc18] uppercase mb-2">
          Get in touch
        </p>
        <h2 className="text-2xl font-medium mb-2">Contact us</h2>
        <p className="text-sm text-white/45 mb-8">
          Available on call, WhatsApp, and email
        </p>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-5">
            {[
              {
                label: "Call / WhatsApp",
                lines: [
                  "+260 978 136 121",
                  "+260 970 318 410",
                  "+243 977 668 203",
                  "+255 748 450 691",
                ],
              },
              { label: "Email", lines: ["Justusjosams@gmail.com"] },
              { label: "Location", lines: ["Nakonde Hospital Junction"] },
            ].map((c) => (
              <div key={c.label} className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#b5cc18]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#b5cc18] text-xs">✦</span>
                </div>
                <div>
                  <p className="text-xs text-white/35 mb-1">{c.label}</p>
                  {c.lines.map((l) => (
                    <p key={l} className="text-sm text-white leading-relaxed">
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
              className="bg-[#1a1a1a] border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#b5cc18]/50"
            />
            <input
              type="text"
              placeholder="Phone or email"
              className="bg-[#1a1a1a] border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#b5cc18]/50"
            />
            <textarea
              rows={4}
              placeholder="Tell us about your shipment or vehicle..."
              className="bg-[#1a1a1a] border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#b5cc18]/50 resize-none"
            />
            <button
              type="submit"
              className="bg-[#b5cc18] text-[#111] text-sm font-medium py-3 rounded-md hover:bg-[#c8e01a] transition-colors"
            >
              Send message
            </button>
          </form>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/25">
          © 2025 RKK Logistics Limited. All rights reserved.
        </p>
        <div className="flex gap-5">
          {["Privacy", "Terms", "Services"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-xs text-white/25 hover:text-white/50 transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}

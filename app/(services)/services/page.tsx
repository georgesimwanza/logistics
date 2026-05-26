import Link from "next/link";

// 🔁 Replace this with real auth data later (e.g. useSession, useUser, context)
const dummyUser = {
  name: "George Simwanza",
  email: "george@example.com",
  avatar: "https://i.pravatar.cc/150?u=george",
};

export default function ServicesPage() {
  const user = dummyUser;

  return (
    <main className="bg-[#111111] text-white min-h-screen font-sans">
      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#b5cc18] flex items-center justify-center">
            <span className="text-[#111] font-semibold text-base leading-none">
              R
            </span>
          </div>
          <span className="text-sm font-medium tracking-[2px] uppercase">
            RKK Logistics
          </span>
        </Link>
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
        {/* ── User profile chip ── */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs font-medium text-white leading-tight">
              {user.name}
            </span>
            <span className="text-[11px] text-white/40">{user.email}</span>
          </div>
          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#b5cc18]/40 ring-offset-2 ring-offset-[#111]">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="px-8 py-16 border-b border-white/10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#b5cc18]/10 border border-[#b5cc18]/30 rounded-full px-3 py-1 text-xs text-[#b5cc18] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b5cc18]" />
            Explore our services
          </div>
          <h1 className="text-4xl md:text-5xl font-medium leading-[1.1] mb-5">
            Everything you need,{" "}
            <span className="text-[#b5cc18]">under one roof</span>
          </h1>
          <p className="text-white/50 text-sm leading-relaxed max-w-lg">
            From buying your next vehicle to clearing it through customs and
            delivering it to your door — RKK Logistics handles every step with
            care and expertise.
          </p>
        </div>
      </section>

      {/* ── Car Selling Service ── */}
      <section id="car-sales" className="px-8 py-14 border-b border-white/10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[11px] tracking-[2px] text-[#b5cc18] uppercase mb-2">
              01
            </p>
            <h2 className="text-2xl font-medium mb-4">
              Car Buying &amp; Selling
            </h2>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
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
                  className="flex items-center gap-3 text-sm text-white/70"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b5cc18] shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
            <Link
              href={"/car_selling"}
              className="inline-flex items-center gap-2 bg-[#b5cc18] text-[#111] text-sm font-medium px-5 py-2.5 rounded-md hover:bg-[#c8e01a] transition-colors"
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
                className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 flex flex-col gap-3"
              >
                <span className="text-2xl">{c.icon}</span>
                <p className="text-sm text-white/70">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clearing Service ── */}
      <section id="clearing" className="px-8 py-14 border-b border-white/10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="order-2 md:order-1">
            <div className="bg-[#b5cc18]/5 border border-[#b5cc18]/15 rounded-xl p-8">
              <p className="text-[11px] tracking-[2px] text-[#b5cc18] uppercase mb-4">
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
                  title: "Release &amp; handover",
                  desc: "Your vehicle or cargo is cleared and handed over.",
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 mb-5 last:mb-0">
                  <div className="w-7 h-7 rounded-full bg-[#b5cc18] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#111] text-xs font-semibold">
                      {s.step}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-0.5">
                      {s.title}
                    </p>
                    <p
                      className="text-xs text-white/40"
                      dangerouslySetInnerHTML={{ __html: s.desc }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <p className="text-[11px] tracking-[2px] text-[#b5cc18] uppercase mb-2">
              02
            </p>
            <h2 className="text-2xl font-medium mb-4">Customs Clearing</h2>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
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
                  className="flex items-center gap-3 text-sm text-white/70"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b5cc18] shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#b5cc18] text-[#111] text-sm font-medium px-5 py-2.5 rounded-md hover:bg-[#c8e01a] transition-colors"
            >
              Start clearing →
            </a>
          </div>
        </div>
      </section>

      {/* ── Transportation Service ── */}
      <section
        id="transportation"
        className="px-8 py-14 border-b border-white/10"
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[11px] tracking-[2px] text-[#b5cc18] uppercase mb-2">
              03
            </p>
            <h2 className="text-2xl font-medium mb-4">
              Transportation &amp; Freight
            </h2>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
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
                  className="flex items-center gap-3 text-sm text-white/70"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b5cc18] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#b5cc18] text-[#111] text-sm font-medium px-5 py-2.5 rounded-md hover:bg-[#c8e01a] transition-colors"
            >
              Book transport →
            </a>
          </div>
          <div className="flex flex-col gap-3">
            {[
              {
                icon: "🛣️",
                title: "Cross-border routes",
                desc: "Zambia · Tanzania · DRC · Zimbabwe and beyond.",
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
                className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 flex gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-[#b5cc18]/10 flex items-center justify-center shrink-0 text-lg">
                  {f.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">
                    {f.title}
                  </p>
                  <p className="text-xs text-white/40 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="mx-8 my-14 bg-[#b5cc18] rounded-xl p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-medium text-[#111] leading-snug mb-1">
            Not sure which service you need?
          </h2>
          <p className="text-sm text-[#111]/60">
            Our team will guide you through the right solution.
          </p>
        </div>
        <a
          href="#contact"
          className="bg-[#111] text-[#b5cc18] text-sm font-medium px-6 py-3 rounded-md hover:bg-[#222] transition-colors whitespace-nowrap"
        >
          Talk to us →
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
            <select className="bg-[#1a1a1a] border border-white/10 rounded-md px-4 py-3 text-sm text-white/50 focus:outline-none focus:border-[#b5cc18]/50">
              <option value="">Select a service</option>
              <option value="car-sales">Car Buying &amp; Selling</option>
              <option value="clearing">Customs Clearing</option>
              <option value="transport">Transportation &amp; Freight</option>
            </select>
            <textarea
              rows={4}
              placeholder="Tell us more about your needs..."
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

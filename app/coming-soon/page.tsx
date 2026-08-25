import Link from "next/link";
import NavBar from "@/app/components/NavBar";

export default function ComingSoonPage() {
  return (
    <main className="bg-[#f7f4ee] text-[#10233d] min-h-screen font-sans flex flex-col">
      <NavBar />

      <section className="flex-1 flex flex-col items-center justify-center px-8 py-20 text-center">
        <div className="relative mb-8">
          <div className="w-16 h-16 rounded-full bg-[#2955c8]/10 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2955c8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21s7-6.2 7-11.2A7 7 0 0 0 5 9.8C5 14.8 12 21 12 21Zm0-9a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" />
            </svg>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 bg-[#d98f2b]/10 border border-[#d98f2b]/30 rounded-full px-3 py-1 text-xs text-[#a3690f] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d98f2b]" />
          Under construction
        </div>

        <h1 className="text-3xl md:text-4xl font-medium leading-tight mb-3">
          Coming soon
        </h1>
        <p className="text-[#5c6a7a] text-sm leading-relaxed max-w-md mb-8">
          We&apos;re still building this out. In the meantime, you can book a
          shipment or check on an existing one from the transportation page.
        </p>

        <div className="flex gap-3">
          <Link
            href="/"
            className="border border-[#10233d]/15 text-[#10233d] text-sm px-6 py-3 rounded-md hover:bg-[#10233d]/5 transition-colors"
          >
            ← Back home
          </Link>
          <Link
            href="/services"
            className="bg-[#2955c8] text-white text-sm font-medium px-6 py-3 rounded-md hover:bg-[#1f45a8] transition-colors"
          >
            Go to services →
          </Link>
        </div>
      </section>

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

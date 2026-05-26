"use client";
import { useState } from "react";
import Link from "next/link";

const dummyUser = {
  name: "George Simwanza",
  email: "george@example.com",
  avatar: "https://i.pravatar.cc/150?u=george",
};

const cars = [
  {
    id: 1,
    make: "Mercedes-Benz",
    model: "A Class",
    year: 2014,
    price: 8995,
    mileage: "98,000",
    acceleration: "9.3s",
    mpg: "64.2",
    fuel: "Diesel",
    image:
      "https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?w=600&q=80",
    badge: "Popular",
  },
  {
    id: 2,
    make: "Land Rover",
    model: "Range Rover Evoque",
    year: 2013,
    price: 15250,
    mileage: "81,000",
    acceleration: "8s",
    mpg: "43.5",
    fuel: "Diesel",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80",
    badge: "4x4",
  },
  {
    id: 3,
    make: "Jaguar",
    model: "XF",
    year: 2018,
    price: 17250,
    mileage: "15,000",
    acceleration: "9.5s",
    mpg: "49",
    fuel: "Petrol",
    image:
      "https://images.unsplash.com/photo-1555353540-64580b51c258?w=600&q=80",
    badge: "Low Miles",
  },
  {
    id: 4,
    make: "Jaguar",
    model: "XK",
    year: 2016,
    price: 28500,
    mileage: "25,000",
    acceleration: "5.9s",
    mpg: "25",
    fuel: "Petrol",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",
    badge: "Performance",
  },
  {
    id: 5,
    make: "BMW",
    model: "3 Series",
    year: 2019,
    price: 22500,
    mileage: "34,000",
    acceleration: "6.1s",
    mpg: "55",
    fuel: "Diesel",
    image:
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=600&q=80",
    badge: "New In",
  },
  {
    id: 6,
    make: "Audi",
    model: "Q5",
    year: 2020,
    price: 31000,
    mileage: "22,000",
    acceleration: "7.2s",
    mpg: "40",
    fuel: "Diesel",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80",
    badge: "Premium",
  },
];

const makes = ["All", "Mercedes-Benz", "Land Rover", "Jaguar", "BMW", "Audi"];
const fuels = ["All", "Petrol", "Diesel"];

export default function CarsPage() {
  const user = dummyUser;
  const [selectedMake, setSelectedMake] = useState("All");
  const [selectedFuel, setSelectedFuel] = useState("All");
  const [maxPrice, setMaxPrice] = useState(50000);

  const filtered = cars.filter((c) => {
    if (selectedMake !== "All" && c.make !== selectedMake) return false;
    if (selectedFuel !== "All" && c.fuel !== selectedFuel) return false;
    if (c.price > maxPrice) return false;
    return true;
  });

  return (
    <main className="bg-[#111111] text-white min-h-screen font-sans">
      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10 sticky top-0 z-50 bg-[#111111]/95 backdrop-blur">
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/80 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1400&q=80"
          alt="Cars"
          className="w-full h-[340px] object-cover object-center"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-8">
          <div className="inline-flex items-center gap-2 bg-[#b5cc18]/10 border border-[#b5cc18]/30 rounded-full px-3 py-1 text-xs text-[#b5cc18] mb-4 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b5cc18]" />
            Quality pre-owned vehicles
          </div>
          <h1 className="text-4xl md:text-5xl font-medium leading-tight mb-3">
            Browse Our <span className="text-[#b5cc18]">Latest Stock</span>
          </h1>
          <p className="text-white/50 text-sm max-w-md leading-relaxed">
            Hand-picked vehicles, fully inspected and cleared. Ready to drive.
          </p>
        </div>
      </section>

      {/* ── Filters ── */}
      <div className="px-8 py-5 border-b border-white/10 bg-[#151515]">
        <div className="flex flex-wrap gap-6 items-end">
          {/* Make filter */}
          <div>
            <p className="text-[10px] text-white/35 tracking-[2px] uppercase mb-2">
              Make
            </p>
            <div className="flex flex-wrap gap-2">
              {makes.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMake(m)}
                  className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                    selectedMake === m
                      ? "bg-[#b5cc18] text-[#111] font-medium"
                      : "bg-white/5 text-white/50 hover:bg-white/10"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          {/* Fuel filter */}
          <div>
            <p className="text-[10px] text-white/35 tracking-[2px] uppercase mb-2">
              Fuel
            </p>
            <div className="flex gap-2">
              {fuels.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFuel(f)}
                  className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                    selectedFuel === f
                      ? "bg-[#b5cc18] text-[#111] font-medium"
                      : "bg-white/5 text-white/50 hover:bg-white/10"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          {/* Price filter */}
          <div className="flex-1 min-w-[200px]">
            <p className="text-[10px] text-white/35 tracking-[2px] uppercase mb-2">
              Max price:{" "}
              <span className="text-[#b5cc18]">
                ${maxPrice.toLocaleString()}
              </span>
            </p>
            <input
              type="range"
              min={5000}
              max={50000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#b5cc18] cursor-pointer"
            />
          </div>
          <p className="text-xs text-white/30 pb-1">
            {filtered.length} vehicle{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* ── Car Grid ── */}
      <section className="px-8 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/30 text-sm">
            No vehicles match your filters. Try adjusting them.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((car) => (
              <div
                key={car.id}
                className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden hover:border-[#b5cc18]/40 transition-all group"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#b5cc18] text-[#111] text-[10px] font-semibold px-2 py-1 rounded-md">
                    {car.badge}
                  </span>
                  <span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                    {car.fuel}
                  </span>
                </div>
                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="text-[11px] text-white/40">{car.make}</p>
                      <h3 className="text-base font-medium text-white">
                        {car.model}
                      </h3>
                    </div>
                    <p className="text-[#b5cc18] font-medium text-base">
                      ${car.price.toLocaleString()}
                    </p>
                  </div>
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 mt-4 mb-5">
                    {[
                      { icon: "📅", val: car.year },
                      { icon: "🛣️", val: `${car.mileage} mi` },
                      { icon: "⚡", val: `${car.acceleration}` },
                      { icon: "⛽", val: `${car.mpg} mpg` },
                    ]
                      .slice(0, 3)
                      .map((s, i) => (
                        <div
                          key={i}
                          className="bg-white/5 rounded-lg px-2 py-2 flex flex-col items-center gap-1"
                        >
                          <span className="text-base">{s.icon}</span>
                          <span className="text-[11px] text-white/60">
                            {s.val}
                          </span>
                        </div>
                      ))}
                  </div>
                  <button className="w-full border border-[#b5cc18]/40 text-[#b5cc18] text-sm py-2.5 rounded-lg hover:bg-[#b5cc18] hover:text-[#111] transition-colors font-medium">
                    View Vehicle
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Sell Your Car CTA ── */}
      <div className="mx-8 mb-14 bg-[#b5cc18] rounded-xl p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-medium text-[#111] leading-snug mb-1">
            Want to sell your vehicle?
          </h2>
          <p className="text-sm text-[#111]/60">
            We handle the whole process — valuation, paperwork, and finding a
            buyer.
          </p>
        </div>
        <a
          href="#contact"
          className="bg-[#111] text-[#b5cc18] text-sm font-medium px-6 py-3 rounded-md hover:bg-[#222] transition-colors whitespace-nowrap"
        >
          Sell your car →
        </a>
      </div>

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

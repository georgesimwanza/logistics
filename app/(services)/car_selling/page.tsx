"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import NavBar from "@/app/components/NavBar";
import ContactForm from "@/app/components/contactForm";

const makes = ["All", "Mercedes-Benz", "Land Rover", "Jaguar", "BMW", "Audi"];
const fuels = ["All", "Petrol", "Diesel"];

type Car = {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: string;
  acceleration: string;
  mpg: string;
  fuel: string;
  image: string;
  badge: string;
};

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMake, setSelectedMake] = useState("All");
  const [selectedFuel, setSelectedFuel] = useState("All");
  const [maxPrice, setMaxPrice] = useState(50000);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/api/cars");
        const { data } = await res.json();
        setCars(data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filtered = cars.filter((c) => {
    if (selectedMake !== "All" && c.make !== selectedMake) return false;
    if (selectedFuel !== "All" && c.fuel !== selectedFuel) return false;
    if (c.price > maxPrice) return false;
    return true;
  });

  return (
    <main className="bg-[#f7f4ee] text-[#10233d] min-h-screen font-sans">
      <NavBar />
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7f4ee] via-[#f7f4ee]/85 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1400&q=80"
          alt="Cars"
          className="w-full h-[340px] object-cover object-center"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-8">
          <div className="inline-flex items-center gap-2 bg-[#d98f2b]/10 border border-[#d98f2b]/30 rounded-full px-3 py-1 text-xs text-[#a3690f] mb-4 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d98f2b]" />
            Quality pre-owned vehicles
          </div>
          <h1 className="text-4xl md:text-5xl font-medium leading-tight mb-3">
            Browse Our <span className="text-[#2955c8]">Latest Stock</span>
          </h1>
          <p className="text-[#5c6a7a] text-sm max-w-md leading-relaxed">
            Hand-picked vehicles, fully inspected and cleared. Ready to drive.
          </p>
        </div>
      </section>

      {/* ── Filters ── */}
      <div className="px-8 py-5 border-b border-[#e2ddd0] bg-white">
        <div className="flex flex-wrap gap-6 items-end">
          {/* Make filter */}
          <div>
            <p className="text-[10px] text-[#5c6a7a] tracking-[2px] uppercase mb-2">
              Make
            </p>
            <div className="flex flex-wrap gap-2">
              {makes.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMake(m)}
                  className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                    selectedMake === m
                      ? "bg-[#2955c8] text-white font-medium"
                      : "bg-[#f7f4ee] text-[#5c6a7a] hover:bg-[#e2ddd0]"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          {/* Fuel filter */}
          <div>
            <p className="text-[10px] text-[#5c6a7a] tracking-[2px] uppercase mb-2">
              Fuel
            </p>
            <div className="flex gap-2">
              {fuels.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFuel(f)}
                  className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                    selectedFuel === f
                      ? "bg-[#2955c8] text-white font-medium"
                      : "bg-[#f7f4ee] text-[#5c6a7a] hover:bg-[#e2ddd0]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          {/* Price filter */}
          <div className="flex-1 min-w-[200px]">
            <p className="text-[10px] text-[#5c6a7a] tracking-[2px] uppercase mb-2">
              Max price:{" "}
              <span className="text-[#2955c8]">
                K{maxPrice.toLocaleString()}
              </span>
            </p>
            <input
              type="range"
              min={50000}
              max={500000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#2955c8] cursor-pointer"
            />
          </div>
          <p className="text-xs text-[#5c6a7a] pb-1">
            {loading
              ? "Loading..."
              : `${filtered.length} vehicle${filtered.length !== 1 ? "s" : ""} found`}
          </p>
        </div>
      </div>

      {/* ── Car Grid ── */}
      <section className="px-8 py-10">
        {loading ? (
          <div className="text-center py-20 text-[#5c6a7a] text-sm">
            Loading vehicles...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-[#5c6a7a] text-sm">
            No vehicles match your filters. Try adjusting them.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((car) => (
              <div
                key={car._id}
                className="bg-white border border-[#e2ddd0] rounded-xl overflow-hidden hover:border-[#2955c8]/40 transition-all group"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#2955c8] text-white text-[10px] font-semibold px-2 py-1 rounded-md">
                    {car.badge}
                  </span>
                  <span className="absolute top-3 right-3 bg-[#10233d]/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                    {car.fuel}
                  </span>
                </div>
                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="text-[11px] text-[#5c6a7a]">{car.make}</p>
                      <h3 className="text-base font-medium text-[#10233d]">
                        {car.model}
                      </h3>
                    </div>
                    <p className="text-[#2955c8] font-medium text-base">
                      ${car.price.toLocaleString()}
                    </p>
                  </div>
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 mt-4 mb-5">
                    {[
                      { icon: "📅", val: car.year },
                      { icon: "🛣️", val: `${car.mileage} mi` },
                      { icon: "⚡", val: `${car.acceleration}` },
                    ].map((s, i) => (
                      <div
                        key={i}
                        className="bg-[#f7f4ee] rounded-lg px-2 py-2 flex flex-col items-center gap-1"
                      >
                        <span className="text-base">{s.icon}</span>
                        <span className="text-[11px] text-[#5c6a7a]">
                          {s.val}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full border border-[#2955c8]/40 text-[#2955c8] text-sm py-2.5 rounded-lg hover:bg-[#2955c8] hover:text-white transition-colors font-medium">
                    View Vehicle
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Sell Your Car CTA ── */}
      <div className="mx-8 mb-14 bg-[#2955c8] rounded-xl p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-medium text-white leading-snug mb-1">
            Want to sell your vehicle?
          </h2>
          <p className="text-sm text-white/70">
            We handle the whole process — valuation, paperwork, and finding a
            buyer.
          </p>
        </div>
        <a
          href="#contact"
          className="bg-white text-[#2955c8] text-sm font-medium px-6 py-3 rounded-md hover:bg-[#f7f4ee] transition-colors whitespace-nowrap"
        >
          Sell your car →
        </a>
      </div>

      {/* ── General enquiry ── */}
      <section id="contact" className="px-8 py-14 border-t border-[#e2ddd0]">
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

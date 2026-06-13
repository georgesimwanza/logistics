"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import NavBar from "@/app/components/NavBar";

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
  images: string[];
  badge: string;
};

export default function CarViewPage() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`/api/cars/${id}`);
        const { data } = await res.json();
        setCar(data);
      } catch (err) {
        console.error("Failed to fetch car:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCar();
  }, [id]);

  const prev = () =>
    setActiveIndex((i) => (i === 0 ? (car?.images.length ?? 1) - 1 : i - 1));
  const next = () =>
    setActiveIndex((i) => (i === (car?.images.length ?? 1) - 1 ? 0 : i + 1));

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    setTouchStart(null);
  };

  // Scroll active thumbnail into view
  useEffect(() => {
    const el = thumbnailRef.current?.children[activeIndex] as HTMLElement;
    el?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  if (loading) {
    return (
      <main className="bg-[#111111] min-h-screen text-white font-sans">
        <NavBar />
        <div className="flex items-center justify-center h-[70vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-[#b5cc18]/30 border-t-[#b5cc18] rounded-full animate-spin" />
            <p className="text-white/30 text-sm tracking-widest uppercase">
              Loading vehicle
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!car) {
    return (
      <main className="bg-[#111111] min-h-screen text-white font-sans">
        <NavBar />
        <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
          <p className="text-white/30 text-lg">Vehicle not found.</p>
          <Link
            href="/cars"
            className="text-[#b5cc18] text-sm underline underline-offset-4"
          >
            ← Back to stock
          </Link>
        </div>
      </main>
    );
  }

  const specs = [
    { label: "Year", value: car.year, icon: "📅" },
    { label: "Mileage", value: `${car.mileage} mi`, icon: "🛣️" },
    { label: "0–60 mph", value: `${car.acceleration}`, icon: "⚡" },
    { label: "Fuel", value: car.fuel, icon: "⛽" },
    { label: "MPG", value: car.mpg, icon: "🌿" },
  ];

  return (
    <main className="bg-[#111111] text-white min-h-screen font-sans">
      <NavBar />

      {/* ── Breadcrumb ── */}
      <div className="px-6 md:px-10 pt-6 pb-2 flex items-center gap-2 text-xs text-white/30">
        <Link href="/cars" className="hover:text-[#b5cc18] transition-colors">
          Stock
        </Link>
        <span>/</span>
        <span className="text-white/50">{car.make}</span>
        <span>/</span>
        <span className="text-white/70">{car.model}</span>
      </div>

      <div className="px-6 md:px-10 pb-16 grid lg:grid-cols-[1fr_420px] gap-10 mt-4">
        {/* ══ LEFT: Image Carousel ══ */}
        <div className="flex flex-col gap-4">
          {/* Main image */}
          <div
            className="relative rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/10 cursor-zoom-in select-none"
            style={{ aspectRatio: "16/9" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={() => setIsZoomed(true)}
          >
            {car.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${car.make} ${car.model} – view ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  i === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Gradient overlay bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent pointer-events-none" />

            {/* Badge */}
            <span className="absolute top-4 left-4 bg-[#b5cc18] text-[#111] text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wide uppercase z-10">
              {car.badge}
            </span>

            {/* Image counter */}
            <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white/70 text-xs px-3 py-1 rounded-full z-10">
              {activeIndex + 1} / {car.images.length}
            </span>

            {/* Prev / Next */}
            {car.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-[#b5cc18] hover:text-[#111] transition-all z-10"
                  aria-label="Previous image"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-[#b5cc18] hover:text-[#111] transition-all z-10"
                  aria-label="Next image"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {car.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(i);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-5 h-1.5 bg-[#b5cc18]"
                      : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          {car.images.length > 1 && (
            <div
              ref={thumbnailRef}
              className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none"
            >
              {car.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    i === activeIndex
                      ? "border-[#b5cc18] scale-100 opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ══ RIGHT: Details Panel ══ */}
        <div className="flex flex-col gap-6">
          {/* Title & Price */}
          <div>
            <p className="text-[11px] text-[#b5cc18]/70 tracking-[3px] uppercase mb-1">
              {car.make}
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-white leading-tight mb-3">
              {car.model}
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-[#b5cc18]">
                K{Number(car.price).toLocaleString()}
              </span>
              <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded-md">
                {car.fuel}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/8" />

          {/* Specs grid */}
          <div>
            <p className="text-[10px] text-white/30 tracking-[2.5px] uppercase mb-3">
              Specifications
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="bg-[#1a1a1a] border border-white/8 rounded-xl px-4 py-3 flex items-center gap-3"
                >
                  <span className="text-xl">{s.icon}</span>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wide">
                      {s.label}
                    </p>
                    <p className="text-sm text-white font-medium">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/8" />

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3">
            <a
              href="tel:+260000000000"
              className="w-full bg-[#b5cc18] text-[#111] text-sm font-semibold py-3.5 rounded-xl hover:bg-[#c8e020] active:scale-[0.98] transition-all text-center"
            >
              📞 Call to Enquire
            </a>
            <a
              href="https://wa.me/260000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#1a1a1a] border border-white/10 text-white text-sm font-medium py-3.5 rounded-xl hover:border-[#b5cc18]/40 hover:text-[#b5cc18] active:scale-[0.98] transition-all text-center"
            >
              💬 WhatsApp Us
            </a>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              { icon: "✅", text: "Fully Inspected" },
              { icon: "📋", text: "Clear Title" },
              { icon: "🔧", text: "Service History" },
            ].map((b) => (
              <div
                key={b.text}
                className="flex flex-col items-center gap-1.5 bg-white/3 border border-white/6 rounded-lg py-3 text-center"
              >
                <span className="text-lg">{b.icon}</span>
                <p className="text-[10px] text-white/40 leading-tight">
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Lightbox / Zoom Modal ── */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl transition-colors"
            onClick={() => setIsZoomed(false)}
            aria-label="Close"
          >
            ✕
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-[#b5cc18] hover:text-[#111] flex items-center justify-center text-white transition-all"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <img
            src={car.images[activeIndex]}
            alt={`${car.make} ${car.model}`}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-[#b5cc18] hover:text-[#111] flex items-center justify-center text-white transition-all"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Thumbnail strip in lightbox */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {car.images.map((src, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(i);
                }}
                className={`w-12 h-9 rounded-md overflow-hidden border-2 transition-all ${
                  i === activeIndex
                    ? "border-[#b5cc18]"
                    : "border-transparent opacity-50"
                }`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

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

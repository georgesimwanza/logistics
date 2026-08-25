"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Fleet", href: "/transportation#fleet" },
  { label: "Track", href: "/transportation#track" },
  { label: "Contact", href: "/services#contact" },
];

function getInitials(name?: string | null, email?: string | null) {
  if (name && name.trim()) {
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }
  if (email) return email[0].toUpperCase();
  return "?";
}

export default function NavBar() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const loading = status === "loading";

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-[#e2ddd0] bg-[#f7f4ee]">
      <Link href="/" className="flex items-center gap-3">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <rect width="34" height="34" rx="8" fill="#2955c8" />
          <path
            d="M17 8c-3.3 0-6 2.6-6 6 0 4.4 6 12 6 12s6-7.6 6-12c0-3.4-2.7-6-6-6Z"
            fill="#f7f4ee"
          />
          <circle cx="17" cy="14" r="2.2" fill="#2955c8" />
        </svg>
        <span className="text-sm font-medium tracking-[1.5px] uppercase text-[#10233d]">
          GreatNorth <span className="text-[#2955c8]">Logistics &amp; Freight</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-sm text-[#5c6a7a] hover:text-[#10233d] transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {loading ? (
          <>
            <div className="hidden md:flex flex-col items-end gap-1.5">
              <div className="w-24 h-3 rounded bg-[#e2ddd0] animate-pulse" />
              <div className="w-32 h-2.5 rounded bg-[#e2ddd0] animate-pulse" />
            </div>
            <div className="w-9 h-9 rounded-full bg-[#e2ddd0] animate-pulse" />
          </>
        ) : user ? (
          <>
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-medium text-[#10233d] leading-tight">
                {user.name ?? "Account"}
              </span>
              {user.email && (
                <span className="text-[11px] text-[#5c6a7a]">{user.email}</span>
              )}
            </div>
            <div className="w-9 h-9 rounded-full bg-[#2955c8] text-white text-xs font-semibold flex items-center justify-center ring-2 ring-[#2955c8]/30 ring-offset-2 ring-offset-[#f7f4ee]">
              {getInitials(user.name, user.email)}
            </div>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-[#2955c8] text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-[#1f45a8] transition-colors"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}

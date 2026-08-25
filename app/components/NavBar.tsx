"use client";
import Link from "next/link";

const dummyUser = {
  name: "George Simwanza",
  email: "george@example.com",
  avatar: "https://i.pravatar.cc/150?u=george",
};

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Fleet", href: "/transportation#fleet" },
  { label: "Track", href: "/transportation#track" },
  { label: "Contact", href: "/services#contact" },
];

export default function NavBar() {
  const user = dummyUser;
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
        <div className="hidden md:flex flex-col items-end">
          <span className="text-xs font-medium text-[#10233d] leading-tight">
            {user.name}
          </span>
          <span className="text-[11px] text-[#5c6a7a]">{user.email}</span>
        </div>
        <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#2955c8]/40 ring-offset-2 ring-offset-[#f7f4ee]">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}

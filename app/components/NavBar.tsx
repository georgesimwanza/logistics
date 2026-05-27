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
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            {link.label}
          </Link>
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
  );
}

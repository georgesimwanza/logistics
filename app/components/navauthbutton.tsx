"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

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

export default function NavAuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="w-24 h-9 rounded-md bg-[#e2ddd0] animate-pulse" />;
  }

  if (session?.user) {
    return (
      <Link
        href="/services"
        className="flex items-center gap-2 bg-white border border-[#e2ddd0] text-[#10233d] text-sm font-medium pl-2 pr-4 py-1.5 rounded-md hover:border-[#2955c8]/40 transition-colors"
      >
        <span className="w-6 h-6 rounded-full bg-[#2955c8] text-white text-[10px] font-semibold flex items-center justify-center">
          {getInitials(session.user.name, session.user.email)}
        </span>
        {session.user.name ?? "Dashboard"}
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="bg-[#2955c8] text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-[#1f45a8] transition-colors"
    >
      Get started
    </Link>
  );
}

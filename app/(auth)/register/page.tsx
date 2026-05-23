"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState<"customer" | "staff">("customer");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [location, setLocation] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setRegError("");
    setRegSuccess("");
    setLoading(true);

    // Password validation
    if (password !== confirmPassword) {
      setRegError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          number,
          location,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setRegSuccess(data.message || "Registered successfully!");

        // Clear form
        setUsername("");
        setEmail("");
        setNumber("");
        setLocation("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setRegError(data.error || "Registration failed.");
      }
    } catch {
      setRegError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#111111] flex">
      {/* ── Left panel (branding) ── */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 bg-[#b5cc18] p-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#111] flex items-center justify-center">
            <span className="text-[#b5cc18] font-semibold text-base leading-none">
              R
            </span>
          </div>

          <span className="text-sm font-medium tracking-[2px] uppercase text-[#111]">
            RKK Logistics
          </span>
        </div>

        <div>
          <p className="text-[#111] text-3xl font-medium leading-snug mb-4">
            Join RKK.
            <br />
            Start tracking today.
          </p>

          <p className="text-[#111]/60 text-sm leading-relaxed">
            Create your account to access fleet management, delivery tracking,
            and clearing &amp; forwarding services.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {[
            "Track your shipments in real time",
            "Manage your fleet from one dashboard",
            "Get quotes and clear vehicles fast",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#111]/15 flex items-center justify-center shrink-0">
                <span className="text-[#111] text-xs">✓</span>
              </div>

              <p className="text-[#111]/70 text-sm">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <div className="flex items-center gap-3 mb-10 lg:hidden">
          <div className="w-9 h-9 rounded-full bg-[#b5cc18] flex items-center justify-center">
            <span className="text-[#111] font-semibold text-base leading-none">
              R
            </span>
          </div>

          <span className="text-sm font-medium tracking-[2px] uppercase text-white">
            RKK Logistics
          </span>
        </div>

        <div className="w-full max-w-[420px]">
          <h1 className="text-2xl font-medium text-white mb-1">
            Create account
          </h1>

          <p className="text-sm text-white/40 mb-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#b5cc18] hover:underline">
              Sign in
            </Link>
          </p>

          {/* Role toggle */}
          <div className="flex bg-[#1a1a1a] border border-white/10 rounded-lg p-1 mb-6">
            {(["customer", "staff"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors capitalize ${
                  role === r
                    ? "bg-[#b5cc18] text-[#111]"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {r === "customer" ? "Customer" : "Staff / Admin"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username + Email */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  className="block text-xs text-white/50 mb-1.5"
                  htmlFor="username"
                >
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  required
                  placeholder="enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#b5cc18]/60 transition-colors"
                />
              </div>

              <div>
                <label
                  className="block text-xs text-white/50 mb-1.5"
                  htmlFor="email"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#b5cc18]/60 transition-colors"
                />
              </div>
            </div>

            {/* Phone number */}
            <div>
              <label
                className="block text-xs text-white/50 mb-1.5"
                htmlFor="phone"
              >
                Phone number
              </label>

              <div className="flex gap-2">
                <div className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-3 flex items-center text-sm text-white/50 shrink-0">
                  +260
                </div>

                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="978 136 121"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#b5cc18]/60 transition-colors"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label
                className="block text-xs text-white/50 mb-1.5"
                htmlFor="location"
              >
                Location
              </label>

              <input
                id="location"
                type="text"
                required
                placeholder="e.g. Lusaka, Zambia"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#b5cc18]/60 transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-xs text-white/50 mb-1.5"
                htmlFor="password"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 pr-12 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#b5cc18]/60 transition-colors"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                className="block text-xs text-white/50 mb-1.5"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#b5cc18]/60 transition-colors"
              />
            </div>

            {/* Error / Success messages */}
            {regError && <p className="text-red-500 text-sm">{regError}</p>}

            {regSuccess && (
              <p className="text-green-500 text-sm">{regSuccess}</p>
            )}

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                className="mt-0.5 accent-[#b5cc18] w-4 h-4 shrink-0"
              />

              <span className="text-xs text-white/40 leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-[#b5cc18] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#b5cc18] hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full bg-[#b5cc18] text-[#111] font-medium text-sm py-3 rounded-lg hover:bg-[#c8e01a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-xs text-white/20 text-center mt-8">
            © 2026 RKK Logistics Limited
          </p>
        </div>
      </div>
    </main>
  );
}

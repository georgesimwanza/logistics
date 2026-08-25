"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setLoginError("");
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setLoginError("Invalid username or password.");
      } else {
        router.push("/services");
      }
    } catch {
      setLoginError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f4ee] flex">
      {/* ── Left panel (branding) ── */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 bg-[#2955c8] p-10">
        <div className="flex items-center gap-3">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <rect width="34" height="34" rx="8" fill="white" />
            <path
              d="M17 8c-3.3 0-6 2.6-6 6 0 4.4 6 12 6 12s6-7.6 6-12c0-3.4-2.7-6-6-6Z"
              fill="#2955c8"
            />
            <circle cx="17" cy="14" r="2.2" fill="white" />
          </svg>
          <span className="text-sm font-medium tracking-[1.5px] uppercase text-white">
            GreatNorth Logistics &amp; Freight
          </span>
        </div>

        <div>
          <p className="text-white text-3xl font-medium leading-snug mb-4">
            Welcome back.
            <br />
            Let&apos;s move things forward.
          </p>
          <p className="text-white/70 text-sm leading-relaxed">
            Clearing &amp; forwarding, the length of the Great North Road. Log
            in to manage your fleet, track deliveries, and more.
          </p>
        </div>

        <div className="flex gap-6">
          {[
            ["500+", "Vehicles cleared"],
            ["24/7", "Support"],
            ["3", "Countries"],
          ].map(([num, label]) => (
            <div key={label}>
              <p className="text-white text-xl font-medium">{num}</p>
              <p className="text-white/60 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <div className="flex items-center gap-3 mb-10 lg:hidden">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <rect width="34" height="34" rx="8" fill="#2955c8" />
            <path
              d="M17 8c-3.3 0-6 2.6-6 6 0 4.4 6 12 6 12s6-7.6 6-12c0-3.4-2.7-6-6-6Z"
              fill="#f7f4ee"
            />
            <circle cx="17" cy="14" r="2.2" fill="#2955c8" />
          </svg>
          <span className="text-sm font-medium tracking-[1.5px] uppercase text-[#10233d]">
            GreatNorth Logistics &amp; Freight
          </span>
        </div>

        <div className="w-full max-w-[400px]">
          <h1 className="text-2xl font-medium text-[#10233d] mb-1">Sign in</h1>
          <p className="text-sm text-[#5c6a7a] mb-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#2955c8] hover:underline">
              Create one
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label
                className="block text-xs text-[#5c6a7a] mb-1.5"
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
                className="w-full bg-white border border-[#e2ddd0] rounded-lg px-4 py-3 text-sm text-[#10233d] placeholder:text-[#5c6a7a]/50 focus:outline-none focus:border-[#2955c8]/60 transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-[#5c6a7a]" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-xs text-[#2955c8] hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-[#e2ddd0] rounded-lg px-4 py-3 pr-12 text-sm text-[#10233d] placeholder:text-[#5c6a7a]/50 focus:outline-none focus:border-[#2955c8]/60 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5c6a7a]/60 hover:text-[#10233d] transition-colors text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error */}
            {loginError && (
              <p className="text-red-600 text-xs -mt-1">{loginError}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-[#2955c8] text-white font-medium text-sm py-3 rounded-lg hover:bg-[#1f45a8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-xs text-[#5c6a7a]/70 text-center mt-8">
            © 2026 GreatNorth Logistics and Freight Ltd
          </p>
        </div>
      </div>
    </main>
  );
}

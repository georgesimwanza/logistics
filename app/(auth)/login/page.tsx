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
            Welcome back.
            <br />
            Let&apos;s move things forward.
          </p>
          <p className="text-[#111]/60 text-sm leading-relaxed">
            Clearing &amp; Forwarding Solutions Delivered With Care. Log in to
            manage your fleet, track deliveries, and more.
          </p>
        </div>

        <div className="flex gap-6">
          {[
            ["500+", "Vehicles cleared"],
            ["24/7", "Support"],
            ["4", "Countries"],
          ].map(([num, label]) => (
            <div key={label}>
              <p className="text-[#111] text-xl font-medium">{num}</p>
              <p className="text-[#111]/50 text-xs">{label}</p>
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

        <div className="w-full max-w-[400px]">
          <h1 className="text-2xl font-medium text-white mb-1">Sign in</h1>
          <p className="text-sm text-white/40 mb-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#b5cc18] hover:underline">
              Create one
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-white/50" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-xs text-[#b5cc18] hover:underline">
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

            {/* Error */}
            {loginError && (
              <p className="text-red-400 text-xs -mt-1">{loginError}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-[#b5cc18] text-[#111] font-medium text-sm py-3 rounded-lg hover:bg-[#c8e01a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-xs text-white/20 text-center mt-8">
            © 2025 RKK Logistics Limited
          </p>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send. Please try again.");
      }

      setSent(true);
      setName("");
      setContact("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {sent && (
        <div className="bg-[#2955c8]/10 border border-[#2955c8]/30 rounded-md px-4 py-3 text-sm text-[#2955c8]">
          ✓ Message sent — we&apos;ll get back to you shortly.
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md px-4 py-3 text-sm text-red-600">
          ✕ {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="bg-white border border-[#e2ddd0] rounded-md px-4 py-3 text-sm text-[#10233d] placeholder:text-[#5c6a7a]/60 focus:outline-none focus:border-[#2955c8]/50"
      />
      <input
        type="text"
        placeholder="Phone or email"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        required
        className="bg-white border border-[#e2ddd0] rounded-md px-4 py-3 text-sm text-[#10233d] placeholder:text-[#5c6a7a]/60 focus:outline-none focus:border-[#2955c8]/50"
      />
      <textarea
        rows={4}
        placeholder="Tell us about your shipment or vehicle..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="bg-white border border-[#e2ddd0] rounded-md px-4 py-3 text-sm text-[#10233d] placeholder:text-[#5c6a7a]/60 focus:outline-none focus:border-[#2955c8]/50 resize-none"
      />

      <button
        type="submit"
        disabled={sending}
        className="bg-[#2955c8] text-white text-sm font-medium py-3 rounded-md hover:bg-[#1f45a8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

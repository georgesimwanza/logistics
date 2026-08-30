"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "260777547157"; // no +, no spaces

export default function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `Hi GreatNorth, my name is ${name}.\nContact: ${contact}\n\n${message}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
        className="bg-[#2955c8] text-white text-sm font-medium py-3 rounded-md hover:bg-[#1f45a8] transition-colors"
      >
        Send on WhatsApp →
      </button>
    </form>
  );
}

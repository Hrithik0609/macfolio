"use client";

import { useState } from "react";
import { profile } from "@/lib/data/profile";

export function ContactApp() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  function send() {
    const url = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject || "Hello from your portfolio"
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#1e1e22] text-white/90">
      {/* Mail toolbar */}
      <div className="flex shrink-0 items-center justify-between border-b border-[var(--hairline)] bg-black/20 px-4 py-2.5">
        <span className="text-[13px] font-medium text-white/70">
          New Message
        </span>
        <button
          onClick={send}
          className="flex items-center gap-1.5 rounded-md bg-mac-accent px-3 py-1.5 text-[13px] font-medium text-white transition hover:bg-[#0a74e0]"
        >
          ➤ Send
        </button>
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-0 border-b border-[var(--hairline)] text-[13px]">
        <Field label="To" value={profile.email} readOnly />
        <div className="flex items-center gap-3 border-b border-[var(--hairline)] px-4 py-2.5">
          <span className="w-16 shrink-0 text-white/40">Subject</span>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="What's this about?"
            className="flex-1 bg-transparent text-white/85 placeholder:text-white/30 outline-none"
          />
        </div>
      </div>

      {/* Body */}
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your message…"
        className="mac-scroll flex-1 resize-none bg-transparent p-4 text-[14px] leading-relaxed text-white/85 placeholder:text-white/30 outline-none"
      />

      {/* Footer links */}
      <div className="flex shrink-0 flex-wrap items-center gap-4 border-t border-[var(--hairline)] bg-black/20 px-4 py-3 text-[13px]">
        <span className="text-white/40">Or reach me at:</span>
        <a
          href={profile.socials.linkedin}
          target="_blank"
          rel="noreferrer"
          className="text-mac-accent hover:underline"
        >
          LinkedIn
        </a>
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noreferrer"
          className="text-mac-accent hover:underline"
        >
          GitHub
        </a>
        <span className="text-white/55">{profile.phone}</span>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  readOnly,
}: {
  label: string;
  value: string;
  readOnly?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-[var(--hairline)] px-4 py-2.5">
      <span className="w-16 shrink-0 text-white/40">{label}</span>
      <input
        defaultValue={value}
        readOnly={readOnly}
        className="flex-1 bg-transparent text-white/85 outline-none"
      />
    </div>
  );
}

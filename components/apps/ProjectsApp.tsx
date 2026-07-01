"use client";

import { useState } from "react";
import { projects, type Project } from "@/lib/data/projects";

function FolderIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14 drop-shadow">
      <path
        d="M6 16a4 4 0 0 1 4-4h14l5 6h25a4 4 0 0 1 4 4v6H6z"
        fill="#6db3f2"
      />
      <path
        d="M6 22h56v28a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z"
        fill="#4a9eea"
      />
      <path d="M6 22h56v4H6z" fill="#3f8fd8" opacity="0.6" />
    </svg>
  );
}

export function ProjectsApp() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div className="flex h-full min-h-0 bg-[#1e1e22] text-white/90">
      {/* Grid */}
      <div
        className={`mac-scroll flex-1 overflow-auto p-6 ${
          selected ? "hidden md:block" : ""
        }`}
      >
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-wide text-white/40">
          Projects — {projects.length} items
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(108px,1fr))] gap-x-3 gap-y-5">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              onDoubleClick={() => window.open(p.liveUrl, "_blank")}
              className={`group flex flex-col items-center gap-1.5 rounded-lg p-2 text-center ${
                selected?.id === p.id ? "bg-white/15" : "hover:bg-white/[0.07]"
              }`}
            >
              <FolderIcon />
              <span className="line-clamp-2 text-[12.5px] leading-tight text-white/80">
                {p.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Detail pane */}
      {selected && (
        <aside className="mac-scroll w-full overflow-auto border-l border-[var(--hairline)] bg-black/25 p-6 md:w-[340px] md:shrink-0">
          <button
            onClick={() => setSelected(null)}
            className="mb-4 text-sm text-mac-accent hover:underline md:hidden"
          >
            ‹ Back
          </button>
          <div className="mb-4 flex flex-col items-center text-center">
            <FolderIcon />
            <h2 className="mt-2 text-lg font-semibold text-white">
              {selected.name}
            </h2>
            <span className="mt-1 rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/60">
              {selected.tag}
            </span>
          </div>
          <p className="text-[14px] leading-relaxed text-white/75">
            {selected.blurb}
          </p>
          <ul className="mt-4 space-y-2">
            {selected.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-[13px] text-white/65">
                <span className="mt-1 text-mac-accent">▸</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <a
            href={selected.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-mac-accent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0a74e0]"
          >
            Open Live ↗ {selected.liveLabel}
          </a>
        </aside>
      )}
    </div>
  );
}

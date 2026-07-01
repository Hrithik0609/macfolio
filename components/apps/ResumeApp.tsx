"use client";

import { profile, education, certifications } from "@/lib/data/profile";
import { experience } from "@/lib/data/experience";
import { skills } from "@/lib/data/skills";
import { projects } from "@/lib/data/projects";

export function ResumeApp() {
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#2a2a2e]">
      {/* Preview toolbar */}
      <div className="flex shrink-0 items-center justify-between border-b border-[var(--hairline)] bg-black/20 px-4 py-2">
        <span className="text-[13px] text-white/55">Resume.pdf</span>
        <a
          href="/Resume.pdf"
          download
          className="flex items-center gap-1.5 rounded-md bg-mac-accent px-3 py-1.5 text-[13px] font-medium text-white transition hover:bg-[#0a74e0]"
        >
          ↓ Download PDF
        </a>
      </div>

      {/* Paper */}
      <div className="mac-scroll flex-1 overflow-auto p-5 sm:p-8">
        <div className="mx-auto max-w-[680px] rounded-md bg-white px-8 py-9 text-[#222] shadow-2xl sm:px-12">
          <header className="text-center">
            <h1 className="text-2xl font-bold tracking-wide">
              {profile.name.toUpperCase()}
            </h1>
            <p className="mt-1 text-[12px] text-[#444]">
              {profile.phone} ⋄ {profile.location}
            </p>
            <p className="text-[12px] text-[#1155cc]">
              {profile.email} ⋄ LinkedIn ⋄ Portfolio
            </p>
          </header>

          <Section title="Summary">
            <p className="text-[12.5px] leading-relaxed text-[#333]">
              {profile.summary}
            </p>
          </Section>

          <Section title="Education">
            {education.map((e) => (
              <div key={e.school} className="mb-2">
                <div className="flex justify-between">
                  <p className="text-[12.5px] font-semibold">{e.degree}</p>
                  <p className="text-[12px] text-[#555]">{e.period}</p>
                </div>
                <p className="text-[12px] text-[#555]">
                  {e.school} — {e.detail}
                </p>
              </div>
            ))}
          </Section>

          <Section title="Skills">
            <div className="space-y-1">
              {skills.map((g) => (
                <div key={g.label} className="flex gap-3 text-[12.5px]">
                  <span className="w-44 shrink-0 font-semibold">{g.label}</span>
                  <span className="text-[#333]">{g.items.join(", ")}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Experience">
            {experience.map((x) => (
              <div key={x.company} className="mb-4">
                <div className="flex justify-between">
                  <p className="text-[12.5px] font-semibold">{x.role}</p>
                  <p className="text-[12px] text-[#555]">{x.period}</p>
                </div>
                <p className="text-[12px] italic text-[#555]">
                  {x.company}, {x.location}
                </p>
                <ul className="mt-1 list-disc space-y-0.5 pl-5">
                  {x.bullets.map((b, i) => (
                    <li key={i} className="text-[12px] leading-snug text-[#333]">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>

          <Section title="Projects">
            {projects.map((p) => (
              <div key={p.id} className="mb-3">
                <p className="text-[12.5px] font-semibold">{p.name}</p>
                <p className="text-[12px] text-[#333]">{p.blurb}</p>
                <p className="text-[12px] text-[#1155cc]">Live: {p.liveLabel}</p>
              </div>
            ))}
          </Section>

          <Section title="AWS Certified Developer Associate">
            {certifications.map((c) => (
              <p key={c.name} className="text-[12px] text-[#333]">
                {c.detail}.{" "}
                <span className="text-[#1155cc]">Validate at aws.amazon.com</span>
              </p>
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5">
      <h2 className="mb-1.5 border-b border-[#999] pb-0.5 text-[12px] font-bold uppercase tracking-wide">
        {title}
      </h2>
      {children}
    </section>
  );
}

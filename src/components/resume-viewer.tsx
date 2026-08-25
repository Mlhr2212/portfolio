"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ResumeDownloadCard } from "@/components/resume-download-card";
import { useIsDesktop } from "@/lib/use-is-desktop";
import { isTabKey, nextTabIndex } from "@/lib/tabs";

export interface ResumeDoc {
  id: string;
  label: string;
  title: string;
  file: string;
  updated?: string;
}

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

// Tabs (Technical / Campus & Leadership) + the panel for the active one.
// Desktop renders the PDF inline via a native <object>, whose fallback
// children (ResumeDownloadCard) render automatically if the file 404s —
// no load-event JS needed. Mobile never mounts an embed at all, so it never
// fetches a PDF it isn't going to show.
export function ResumeViewer({ resumes }: { resumes: ResumeDoc[] }) {
  const [selected, setSelected] = useState(0);
  const [focusIndex, setFocusIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isDesktop = useIsDesktop();
  const active = resumes[selected] ?? resumes[0];

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!isTabKey(event.key)) return;
    event.preventDefault();
    const next = nextTabIndex(event.key, focusIndex, resumes.length);
    setFocusIndex(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="mt-10">
      <div
        role="tablist"
        aria-label="Résumé versions"
        className="flex gap-2 border-b border-border"
        onKeyDown={handleKeyDown}
      >
        {resumes.map((resume, index) => (
          <button
            key={resume.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`resume-tab-${resume.id}`}
            aria-selected={selected === index}
            aria-controls={`resume-panel-${resume.id}`}
            tabIndex={focusIndex === index ? 0 : -1}
            onClick={() => {
              setSelected(index);
              setFocusIndex(index);
            }}
            className={`-mb-px border-b-2 px-4 py-3 font-mono text-sm transition-motion ${focusRing} ${
              selected === index
                ? "border-accent text-accent"
                : "border-transparent text-text-secondary hover:text-text-primary"
            }`}
          >
            {resume.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`resume-panel-${active.id}`}
        aria-labelledby={`resume-tab-${active.id}`}
        className="py-8"
      >
        {isDesktop ? (
          <object
            data={active.file}
            type="application/pdf"
            className="h-[80vh] w-full rounded-lg border border-border"
            aria-label={active.title}
          >
            <ResumeDownloadCard
              title={active.title}
              file={active.file}
              updated={active.updated}
              message="Inline preview isn't available right now — the file may not be uploaded yet."
            />
          </object>
        ) : (
          <ResumeDownloadCard title={active.title} file={active.file} updated={active.updated} />
        )}
      </div>
    </div>
  );
}

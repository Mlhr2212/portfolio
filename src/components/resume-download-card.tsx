const focusRing =
  "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

// Used two places: the mobile branch of ResumeViewer, and the fallback
// children of the desktop <object> when a PDF 404s. No server-side fetch
// happens for either usage — links point straight at the static file.
export function ResumeDownloadCard({
  title,
  file,
  updated,
  message,
}: {
  title: string;
  file: string;
  updated?: string;
  message?: string;
}) {
  const fileName = file.split("/").pop() ?? "resume.pdf";

  return (
    <div className="flex flex-col items-start gap-4 rounded-lg border border-border bg-surface p-8">
      <p className="font-mono text-sm uppercase tracking-wide text-accent">Résumé</p>
      <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
      {updated ? (
        <p className="font-mono text-xs text-text-secondary">Updated {updated}</p>
      ) : null}
      {message ? <p className="text-sm text-text-secondary">{message}</p> : null}
      <div className="flex flex-wrap gap-3">
        <a
          href={file}
          download={fileName}
          className={`rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-motion hover:opacity-90 ${focusRing}`}
        >
          Download
        </a>
        <a
          href={file}
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded-md border border-border px-5 py-2.5 text-sm font-medium text-text-primary transition-motion hover:border-accent hover:text-accent ${focusRing}`}
        >
          Open in new tab
        </a>
      </div>
    </div>
  );
}

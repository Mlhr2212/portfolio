const stages = [
  {
    number: "01",
    label: "Define",
    title: "Infrastructure as code",
    tools: "Terraform · AWS · IAM",
  },
  {
    number: "02",
    label: "Ship",
    title: "Tested delivery",
    tools: "GitHub Actions · Docker",
  },
  {
    number: "03",
    label: "Run",
    title: "Resilient workloads",
    tools: "Kubernetes · Helm · EKS",
  },
  {
    number: "04",
    label: "Learn",
    title: "Observable systems",
    tools: "Prometheus · Chaos testing",
  },
] as const;

export function SystemsFlow() {
  return (
    <section aria-labelledby="systems-flow-heading" className="border-b border-border pb-20 sm:pb-24">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">The operating loop</p>
          <h2 id="systems-flow-heading" className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
            Build it. Ship it. Break it. Improve it.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-text-secondary">
          A practical approach to infrastructure: every change is reproducible, every service is observable, and every failure teaches the next version.
        </p>
      </div>

      <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage, index) => (
          <li key={stage.number} className="group relative bg-surface p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-accent">{stage.number}</span>
              {index < stages.length - 1 && (
                <span className="hidden text-lg text-border lg:block" aria-hidden="true">→</span>
              )}
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">{stage.label}</p>
            <h3 className="mt-2 text-lg font-semibold text-text-primary">{stage.title}</h3>
            <p className="mt-3 font-mono text-xs leading-5 text-text-secondary">{stage.tools}</p>
            <span className="absolute bottom-0 left-5 right-5 h-px origin-left scale-x-0 bg-accent transition-motion group-hover:scale-x-100" aria-hidden="true" />
          </li>
        ))}
      </ol>
    </section>
  );
}

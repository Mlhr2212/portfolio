import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { ResumeViewer, type ResumeDoc } from "@/components/resume-viewer";
import { profile } from "../../../content/profile";

export const metadata: Metadata = {
  title: `Résumé — ${profile.name}`,
  description: `Technical and campus & leadership résumés for ${profile.name}.`,
};

// Two résumé variants, backed by static files in public/resume/. Add a row
// here (plus the PDF in public/resume/) to ship a third.
const resumes: ResumeDoc[] = [
  {
    id: "technical",
    label: "Technical",
    title: "Technical Résumé",
    file: "/resume/technical.pdf",
    updated: "August 19, 2026",
  },
  {
    id: "campus-leadership",
    label: "Campus & Leadership",
    title: "Campus & Leadership Résumé",
    file: "/resume/campus-leadership.pdf",
  },
];

export default function ResumePage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Container className="flex flex-col py-16">
          <h1 className="font-mono text-sm uppercase tracking-wide text-accent">Résumé</h1>
          <p className="mt-4 max-w-xl text-text-secondary">
            Two versions, same person: the technical résumé for engineering roles, and the
            campus &amp; leadership résumé for on-campus and operations work.
          </p>
          <ResumeViewer resumes={resumes} />
        </Container>
      </main>
      <Footer />
    </>
  );
}

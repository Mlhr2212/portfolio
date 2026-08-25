// Education and honors. Populated by content-architect in Phase 1.

export interface EducationEntry {
  school: string;
  degree: string;
  period: string;
  gpa?: string;
  deansList?: string[];
  coursework?: string[];
}

export const education: EducationEntry[] = [
  {
    school: "San Francisco State University",
    degree: "B.S. Computer Science",
    period: "Aug 2023 – May 2027 (expected)",
    gpa: "3.9",
    deansList: ["Fall 2023", "Spring 2024", "Spring 2026"],
    coursework: [
      "Data Structures & Algorithms",
      "Software Engineering",
      "Machine Structures",
      "Natural Language Technologies",
    ],
  },
];

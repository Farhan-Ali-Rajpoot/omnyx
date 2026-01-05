import { SiRust, SiTypescript } from "react-icons/si";
import { FounderGithubLink } from "../founder/socialLinks";


export type Project = {
  name: string;
  href: string;
  description?: string;
  githubLink?: string;
};

export type ProjectStack = {
  name: string;
  icon: React.ReactNode;
  projects: Project[];
};

export type ProjectStacks = ProjectStack[];

export const projects: ProjectStacks = [
  {
    name: "Rust",
    icon: <SiRust />,
    projects: [
      {
        name: "Dataseal",
        description: "Secure vault",
        href: "/work/projects/rust/dataseal",
      },
    ],
  },
  {
    name: "ts/js",
    icon: <SiTypescript />,
    projects: [
      {
        name: "Nexa",
        description: "Real-time Chat app",
        href: "/work/projects/ts/nexa",
      },
    ],
  },
];

export const projectsGithubLinks = {
  nexa: `${FounderGithubLink}/nexa`,
  dataseal: `${FounderGithubLink}/dataseal`,
};
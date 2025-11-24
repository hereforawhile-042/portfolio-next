export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export const PROFILE = {
  name: "Jeremiah Egemonye",
  role: "Frontend and Mobile Developer",
  bio: "I build accessible, pixel-perfect, and performant web experiences.",
  email: "jeremiah@example.com",
  github: "https://github.com/ttjerry",
  linkedin: "https://linkedin.com",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80", // Placeholder
};

export interface Skill {
  name: string;
  icon: string;
  color: string;
}

export const SKILLS: Skill[] = [
  { name: "React", icon: "react", color: "#61DAFB" },
  { name: "React Native", icon: "react", color: "#61DAFB" },
  { name: "Next.js", icon: "nextdotjs", color: "#FFFFFF" },
  { name: "TypeScript", icon: "typescript", color: "#3178C6" },
  { name: "Tailwind CSS", icon: "tailwindcss", color: "#06B6D4" },
  { name: "Node.js", icon: "nodedotjs", color: "#339933" },
  { name: "PostgreSQL", icon: "postgresql", color: "#4169E1" },
  { name: "GraphQL", icon: "graphql", color: "#E10098" },
  { name: "Framer Motion", icon: "framer", color: "#0055FF" },
  { name: "GSAP", icon: "greensock", color: "#88CE02" },
];

export const EXPERIENCES: Experience[] = [
  {
    id: "1",
    role: "Senior Frontend Engineer",
    company: "Tech Corp",
    period: "2022 - Present",
    description:
      "Leading the frontend team in building a scalable SaaS platform using Next.js and TypeScript. Improved performance by 40%.",
  },
  {
    id: "2",
    role: "Frontend and Mobile Developer",
    company: "Creative Agency",
    period: "2020 - 2022",
    description:
      "Developed custom e-commerce solutions for various clients. Integrated Stripe and headless CMS solutions.",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "E-Commerce Dashboard",
    slug: "ecommerce-dashboard",
    description:
      "A comprehensive analytics dashboard for online retailers, featuring real-time data visualization and inventory management.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "2",
    title: "Task Management App",
    slug: "task-manager",
    description:
      "A collaborative task management tool with drag-and-drop functionality and real-time updates.",
    technologies: ["React", "Firebase", "Framer Motion", "Styled Components"],
    imageUrl:
      "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "3",
    title: "AI Content Generator",
    slug: "ai-content-gen",
    description:
      "An application that uses OpenAI's API to help writers generate blog post ideas and outlines.",
    technologies: ["Next.js", "OpenAI API", "Tailwind CSS"],
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
  },
];

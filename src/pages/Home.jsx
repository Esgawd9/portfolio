// ==========================================
// FILE: Home.jsx
// DESCRIPTION: Home page component for the portfolio website.
// ==========================================

import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Github,
  FileText,
  Terminal,
  Briefcase,
  GraduationCap,
  Code,
  Hash,
  Cpu,
  Palette,
  Gamepad2,
  Linkedin,
  User,
  ExternalLink,
  Download,
  CircleUserRound,
} from "lucide-react";

// Theme configuration
import { THEME } from "../config/theme";

// SEO
import SEO from "../components/SEO";

// Components
import ProjectCard from "../components/ProjectCard";
import SkillCard from "../components/SkillCard";
import ContactModal from "../components/ContactModal";
import ExperienceCard from "../components/ExperienceCard";
import EducationCard from "../components/EducationCard";

// Icons
import {
  FaPython,
  FaJava,
  FaReact,
  FaPhp,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiJavascript,
  SiMysql,
  SiPlatformdotsh,
  SiTailwindcss,
  SiC,
  SiDocker,
  SiSvelte,
  SiFirebase
} from "react-icons/si";

// ==========================================
// COMPONENT: HOME PAGE
// ==========================================
const Home = ({ isDarkMode, openContact }) => {
  const textSub = isDarkMode ? THEME.dark.textSub : THEME.light.textSub;
  const cardBg = isDarkMode ? THEME.dark.card : THEME.light.card;
  const border = isDarkMode ? THEME.dark.border : THEME.light.border;

  const social = isDarkMode ? THEME.dark.social : THEME.light.social;
  const socialHover = isDarkMode
    ? THEME.dark.socialHover
    : THEME.light.socialHover;
  const socialBorder = isDarkMode
    ? THEME.dark.socialBorder
    : THEME.light.socialBorder;

  const headerSocial = `${social} ${socialHover} ${socialBorder} inline-flex items-center
  w-50 md:justify-center md:w-auto gap-2 px-4 py-2 rounded-full border-2`;

  const EXPERIENCES = [
  {
    title: "Full-Stack Developer",
    company: "IT NET Solution LTD",
    period: "2026 Jan - Present",
    points: [
      {
        label: "Core Architecture & Backend",
        text: "Architected a visual middleware platform using SvelteKit and Slim PHP, building RESTful API endpoints, secure session authentication, and core server-side logic.",
      },
      {
        label: "Visual Workflow Builder",
        text: "Developed an advanced drag-and-drop automation canvas using Svelte 5 and Svelte Flow, featuring smart collision-resolution, 'Drop to Connect' mechanics, and automated Dagre layouts.",
      },
      {
        label: "Enterprise Integration",
        text: "Designed a custom Expression Engine to compile UI rules into OData queries, and built a metadata abstraction layer to normalize data from complex APIs (e.g., SAP Business One, Zoho CRM).",
      },
      {
        label: "Database & State Management",
        text: "Managed MariaDB migrations with DBmate and engineered an immutable state history engine (Undo/Redo) with strict Directed Acyclic Graph (DAG) validation to prevent execution loops.",
      },
    ],
  },
  {
    title: "Intern - Web Developer",
    company: "origin/develop Kft.",
    period: "2025 (3 months)",
    points: [
      {
        label: "Frontend Development",
        text: "Developed and maintained responsive UI components using Liquid, JavaScript, and Tailwind CSS.",
      },
      {
        label: "Performance Optimization",
        text: "Optimized Core Web Vitals via Lighthouse audits, SEO fixes, and 301 redirects.",
      },
      {
        label: "UI/UX & Accessibility",
        text: "Implemented Dark Mode and ensured WCAG-compliant accessibility.",
      },
      {
        label: "Agile Collaboration",
        text: "Worked in agile workflows using Git/GitHub, PRs, and release management.",
      },
    ],
  },
];

  const EDUCATION = [
    {
      degree: "Software Engineering BSc",
      institution: "University of Szeged",
      period: "2022 – Present",
    },
    {
      degree: "High School Diploma",
      institution: "Dombóvári Illyés Gyula Gimnázium",
      period: "2017 – 2021",
    },
  ];

  const SKILLS = [
  // --- Modern Frontend ---
  {
    name: "Svelte 5",
    icon: SiSvelte,
    color: "bg-orange-600",
    text: "text-white",
  },
  {
    name: "React",
    icon: FaReact,
    color: "bg-sky-500",
    text: "text-white",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "bg-yellow-400",
    text: "text-black",
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    color: "bg-gray-700",
    text: "text-white",
  },
  {
    name: "HTML",
    icon: FaHtml5,
    color: "bg-orange-500",
    text: "text-white",
  },
  {
    name: "CSS",
    icon: FaCss3Alt,
    color: "bg-blue-500",
    text: "text-white",
  },

  // --- Backend & Languages ---
  {
    name: "PHP 8.x",
    icon: FaPhp,
    color: "bg-indigo-500",
    text: "text-white",
  },
  {
    name: "Python",
    icon: FaPython,
    color: "bg-blue-800",
    text: "text-white",
  },
  {
    name: "Java",
    icon: FaJava,
    color: "bg-red-500",
    text: "text-white",
  },
  {
    name: "C++",
    icon: SiCplusplus,
    color: "bg-blue-700",
    text: "text-white",
  },
  {
    name: "C",
    icon: SiC,
    color: "bg-indigo-700",
    text: "text-white",
  },

  // --- Database, DevOps & Tools ---
  {
    name: "Docker",
    icon: SiDocker,
    color: "bg-blue-600",
    text: "text-white",
  },
  {
    name: "Firebase",
    icon: SiFirebase,
    color: "bg-yellow-500",
    text: "text-white",
  },
  {
    name: "SQL",
    icon: SiMysql,
    color: "bg-blue-500",
    text: "text-white",
  },
  {
    name: "Git",
    icon: FaGitAlt,
    color: "bg-orange-600",
    text: "text-white",
  },
];

  //  --- SCHEMA.ORG: HOME ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Zsombor Pintér",
    url: "https://www.zsombor-pinter.site",
    image: "https://www.zsombor-pinter.site/og-image.png",
    sameAs: [
      "https://github.com/Esgawd9",
      "https://www.linkedin.com/in/zsombor-pinter",
    ],
    jobTitle: "Software Engineering Student",
    worksFor: {
      "@type": "Organization",
      name: "University of Szeged",
    },
    description: "Aspiring Software Engineer and Origami Artist from Hungary",
    knowsAbout: SKILLS.map((skill) => skill.name),
  };

  // Projects
  const PROJECTS = [
    {
      id: 1,
      title: "Portfolio Website",
      subtitle: "Mobile App",
      description:
        "My personal portfolio built to showcase my work. Features a secure Firebase-powered Admin Dashboard that allows for full CRUD operations to manage gallery content in real-time.",
      icon: CircleUserRound,
      tags: ["React", "Tailwind CSS", "Firebase", "Vite"],
      link: "https://www.zsombor-pinter.site",
    },
    {
      id: 2,
      title: "Reflex Game",
      subtitle: "Mobile App",
      description:
        "A simple mobile game developed in Java/Gradle using Firebase for backend services. Players can test their reaction times and compete on leaderboards.",
      icon: Gamepad2,
      tags: ["Android", "Java/Gradle", "Firebase"],
      link: null,
      repo: "https://github.com/Esgawd9/Reflex-Game",
    },
  ];

  return (
    <>
      <SEO
        title="Zsombor Pintér | Portfolio"
        description="I'm Zsombor Pintér, a software engineering student from Hungary. Check out my coding projects and art gallery here!"
        path="/"
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="space-y-24">
        {/* HERO SECTION */}
        <header
          className={`text-center pt-16 pb-16 rounded-xl ${cardBg} ${border} border px-4`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Zsombor <span className={THEME.accent.text}>Pintér</span>
          </h1>

          <p
            className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto ${textSub}`}
          >
            Software Engineer | Full-stack Developer | Origami Artist
          </p>

          {/* Contact Links */}
          <div className="flex flex-wrap flex-col md:flex-row items-center justify-center gap-4 mb-10 text-sm sm:flex-row sm:flex-wrap">
            {/* GitHub */}
            <a
              href="https://github.com/Esgawd9"
              target="_blank"
              rel="noreferrer"
              className={`
      
      ${headerSocial}
        
      } "}]"}
    `}
              aria-label="GitHub"
            >
              <Github size={16} className={THEME.accent.text} />
              GitHub
              <ExternalLink size={10} className="ml-auto" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/zsombor-pinter"
              target="_blank"
              rel="noreferrer"
              className={`
      
      ${headerSocial}
      } "}]"}
    `}
              aria-label="LinkedIn"
            >
              <Linkedin size={16} className={THEME.accent.text} />
              LinkedIn
              <ExternalLink size={10} className="ml-auto"/>
            </a>

            {/* Email */}
            <a
              href="mailto:zsombor.pinter0105@gmail.com"
              rel="noreferrer"
              className={`
      
      ${headerSocial}
      } "}]"}
    `}
              aria-label="LinkedIn"
            >
              <Mail size={16} className={THEME.accent.text} />
              Email
            </a>

            {/* Gallery */}
            <Link
              to="/gallery"
              className={`
      
      
      ${headerSocial} 
       "}]"}
    `}
              aria-label="Art Gallery"
            >
              <Palette size={16} className={THEME.accent.text} />
              Gallery
            </Link>

            {/* Resume */}
            <a
              href="/resume.pdf"
              target="_blank"
              className={`
      
      ${headerSocial}
      } "}]"}
    `}
              aria-label="Download Resume"
            >
              <FileText size={18} className={THEME.accent.text} />
              CV
              <ExternalLink size={10} className="ml-auto"/>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={openContact}
              className={`cursor-pointer px-8 py-3 ${THEME.accent.bg} text-white rounded-full font-bold ${THEME.accent.bgHover} inline-flex items-center`}
              aria-label="Get in Touch"
            >
              <Mail size={16} className="mr-2" />
              Get in Touch
            </button>
          </div>
        </header>

        {/* ABOUT ME */}
        <section>
          <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
            <User className={`w-6 h-6 ${THEME.accent.text}`} />
            <h2 className="text-3xl font-bold">About Me</h2>
          </div>
          <div className={`p-6 rounded-xl border ${cardBg} ${border}`}>
            <p className={`text-lg leading-relaxed ${THEME.text}`}>
              I'm a <strong>Software Engineering student</strong> based in,{" "}
              <strong>Hungary</strong>. I focus on creating clean, responsive
              applications that prioritize user experience and minimalistic
              design. Beyond coding, I'm passionate about origami art, which
              allows me to explore creativity and precision in a different
              medium.
            </p>
          </div>
        </section>

        {/* SKILLS */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Terminal className={`w-6 h-6 ${THEME.accent.text}`} />
            <h2 className="text-3xl font-bold">Technical Skills</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {SKILLS.map((skill) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section id="projects">
          <div className="flex items-center gap-3 mb-8">
            <Code className={`w-6 h-6 ${THEME.accent.text}`} />
            <h2 className="text-3xl font-bold">Featured Projects</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION */}
        <div className="grid md:grid-cols-2 gap-12">
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className={`w-6 h-6 ${THEME.accent.text}`} />
              <h2 className="text-3xl font-bold">Experience</h2>
            </div>

            <div className="space-y-6">
              {EXPERIENCES.map((exp, index) => (
                <ExperienceCard
                  key={index}
                  experience={exp}
                  isDarkMode={isDarkMode}
                  theme={THEME}
                />
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className={`w-6 h-6 ${THEME.accent.text}`} />
              <h2 className="text-3xl font-bold">Education</h2>
            </div>

            <div className="space-y-6">
              {EDUCATION.map((edu, index) => (
                <EducationCard
                  key={index}
                  education={edu}
                  isDarkMode={isDarkMode}
                  theme={THEME}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;

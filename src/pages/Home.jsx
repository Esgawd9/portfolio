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
  ExternalLink,
} from "lucide-react";
import { THEME } from "../config/theme";
import ProjectCard from "../components/ProjectCard";
import SkillCard from "../components/SkillCard";

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
} from "react-icons/si";

// ==========================================
// COMPONENT: HOME PAGE (DIGITAL CV)
// ==========================================
const Home = ({ isDarkMode }) => {
  const textSub = isDarkMode ? THEME.dark.textSub : THEME.light.textSub;
  const cardBg = isDarkMode ? THEME.dark.card : THEME.light.card;
  const border = isDarkMode ? THEME.dark.border : THEME.light.border;

  // Skills
  const SKILLS = [
    {
      name: "Python",
      icon: FaPython,
      color: "bg-blue-800",
      text: "text-white",
    },
    { name: "Java", icon: FaJava, color: "bg-red-500", text: "text-white" },
    {
      name: "C/C++",
      icon: SiCplusplus,
      color: "bg-blue-700",
      text: "text-white",
    },
    {
      name: "JavaScript",
      icon: SiJavascript,
      color: "bg-yellow-400",
      text: "text-black",
    },
    { name: "React", icon: FaReact, color: "bg-sky-500", text: "text-white" },
    { name: "PHP", icon: FaPhp, color: "bg-indigo-500", text: "text-white" },
    {
      name: "HTML/CSS",
      icon: FaHtml5,
      color: "bg-orange-500",
      text: "text-white",
    },
    { name: "SQL", icon: SiMysql, color: "bg-blue-600", text: "text-white" },
    { name: "Git", icon: FaGitAlt, color: "bg-orange-600", text: "text-white" },
    {
      name: "Tailwind",
      icon: SiTailwindcss,
      color: "bg-gray-700",
      text: "text-white",
    },
  ];

  // Define your projects data here
  const PROJECTS = [
    {
      id: 1,
      title: "Reflex Game",
      subtitle: "Mobile Application",
      description:
        "A simple reflex game developed in Java/Gradle using Firebase for backend services. Players can test their reaction times and compete on leaderboards.",
      icon: Cpu,
      tags: ["App", "Game", "Firebase"],
      link: null, // No live link for this one
      repo: "https://github.com/Esgawd9/mobilalk_beadando_2025",
    },
    {
      id: 2,
      title: "Project 2",
      subtitle: "Subtitle Here",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: Cpu,
      tags: ["Tag1", "Tag2", "Tag3"],
      link: null, // No live link for this one
      repo: "https://github.com/Esgawd9",
    },
  ];

  return (
    <div className="space-y-24 animate-in slide-in-from-left-4 duration-500">
      {/* 1. HERO SECTION */}
      <header className="text-center py-12">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Zsombor <span className={THEME.accent.text}>Pinter</span>
        </h1>

        <p className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto ${textSub}`}>
          Software Engineer
        </p>

        {/* Contact Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm">
          <a
            href="mailto:zsombor.pinter0105@gmail.com"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${border} ${
              isDarkMode ? "hover:bg-slate-800" : "hover:bg-stone-100"
            }`}
          >
            <Mail size={16} className={THEME.accent.text} />
            Email
          </a>

          <a
            href="https://github.com/Esgawd9"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${border} ${
              isDarkMode ? "hover:bg-slate-800" : "hover:bg-stone-100"
            }`}
          >
            <Github size={16} className={THEME.accent.text} />
            GitHub
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/gallery"
            className={`px-8 py-3 ${THEME.accent.bg} text-white rounded-full font-bold ${THEME.accent.bgHover} transition-transform hover:-translate-y-1 inline-flex items-center`}
          >
            Check out my Art
          </Link>

          {/* Download Resume Button */}
          <a
            href="/resume.pdf"
            download="Zsombor_Pinter_Resume.pdf"
            className={`px-8 py-3 rounded-full font-bold border inline-flex items-center gap-2 transition-transform hover:-translate-y-1 ${border} ${
              isDarkMode ? "hover:bg-slate-800" : "hover:bg-stone-100"
            }`}
          >
            <FileText size={18} />
            Download CV
          </a>
        </div>
      </header>

      {/* 2. TECHNICAL SKILLS */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <Terminal className={`w-6 h-6 ${THEME.accent.text}`} />
          <h2 className="text-3xl font-bold">Technical Skills</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {SKILLS.map((skill) => (
            <SkillCard key={skill.name} skill={skill} isDarkMode={isDarkMode} />
          ))}
        </div>
      </section>

      {/* 3. EXPERIENCE & EDUCATION */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Experience */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className={`w-6 h-6 ${THEME.accent.text}`} />
            <h2 className="text-3xl font-bold">Experience</h2>
          </div>
          <div className={`p-6 rounded-2xl border ${cardBg} ${border}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">Intern - Web Developer</h3>
                <p className={`${THEME.accent.text} font-bold`}>
                  origin/develop Kft.
                </p>
              </div>
              <span className="text-sm opacity-60 shrink-0 ml-4">
                2025 (3 months)
              </span>
            </div>
            <ul
              className={`list-disc list-inside space-y-3 text-sm leading-relaxed ${textSub}`}
            >
              <li>
                Developed and maintained frontend features for a
                PlatformOS-hosted website using HTML, CSS, JavaScript, and
                Liquid.
              </li>
              <li>
                Collaborated in an agile team, ensuring seamless integration of
                frontend components.
              </li>
              <li>
                Debugged and optimized code to improve website performance.
              </li>
              <li>Assisted in version control workflows using Git.</li>
            </ul>
          </div>
        </section>

        {/* Education */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className={`w-6 h-6 ${THEME.accent.text}`} />
            <h2 className="text-3xl font-bold">Education</h2>
          </div>
          <div className="space-y-6">
            <div className={`p-6 rounded-2xl border ${cardBg} ${border}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">Software Engineering BSc</h3>
                <span className="text-sm opacity-60 shrink-0 ml-4">
                  2022 - Present
                </span>
              </div>
              <p className={`${THEME.accent.text} font-medium`}>
                University of Szeged
              </p>
              <p className={`text-sm mt-2 ${textSub}`}>
                Faculty of Science and Informatics
              </p>
            </div>
            <div
              className={`p-6 rounded-2xl border opacity-60 ${cardBg} ${border}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold">High School Diploma</h3>
                <span className="text-sm shrink-0 ml-4">2017 - 2021</span>
              </div>
              <p>Dombóvári Illyés Gyula Gimnázium</p>
            </div>
          </div>
        </section>
      </div>

      {/* 4. FEATURED PROJECTS (Refactored) */}
      {/* TODO */}
      {/* <section id="projects">
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
      </section> */}
    </div>
  );
};

export default Home;

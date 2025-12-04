import React from "react";
import { ExternalLink, Github } from "lucide-react";
import { THEME } from "../config/theme";

const ProjectCard = ({ project, isDarkMode }) => {
  // Theme shortcuts to keep JSX clean
  const cardBg = isDarkMode ? THEME.dark.card : THEME.light.card;
  const border = isDarkMode ? THEME.dark.border : THEME.light.border;
  const bgSecondary = isDarkMode ? "bg-slate-700" : "bg-stone-100";
  const textSub = isDarkMode ? THEME.dark.textSub : THEME.light.textSub;

  // Destructure project data
  const {
    title,
    subtitle,
    description,
    icon: Icon,
    tags,
    link,
    repo,
  } = project;

  return (
    <div
      className={`rounded-2xl overflow-hidden shadow-md border flex flex-col ${cardBg} ${border}`}
    >
      {/* Top Section: Icon & Title */}
      <div
        className={`p-8 grow flex flex-col justify-center items-center ${bgSecondary}`}
      >
        <Icon size={64} className={`${THEME.accent.text} mb-4`} />
        <h3 className="text-2xl font-bold text-center">{title}</h3>
      </div>

      {/* Bottom Section: Details */}
      <div className="p-8 flex flex-col h-full">
        <h3 className="text-xl font-bold mb-2">{subtitle}</h3>
        <p className={`mb-4 text-sm leading-relaxed ${textSub}`}>
          {description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs rounded font-bold ${THEME.accent.lightBg} ${THEME.accent.lightText}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 ${THEME.accent.text} font-bold hover:underline`}
            >
              Launch <ExternalLink size={16} />
            </a>
          )}
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 ${THEME.accent.text} font-bold hover:underline`}
            >
              GitHub <Github size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

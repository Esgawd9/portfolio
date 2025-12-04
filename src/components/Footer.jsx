import React from "react";
import { Github, Mail } from "lucide-react";
import { THEME } from "../config/theme";

// ==========================================
// COMPONENT: FOOTER
// ==========================================
const Footer = ({ isDarkMode }) => {
  const year = new Date().getFullYear();
  const textClass = isDarkMode ? "text-slate-500" : "text-stone-500";
  const footerClass = isDarkMode ? THEME.dark.footer : THEME.light.footer;

  return (
    <footer className={`py-10 text-center border-t mt-20 ${footerClass}`}>
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className={textClass}>
          © {year} Zsombor Pintér. Built with React & Firebase.
        </p>
        <div className="flex gap-6 text-sm font-medium">
          <a
            href="https://github.com/Esgawd9"
            target="_blank"
            rel="noreferrer"
            className={`${textClass} hover:text-red-500 transition-colors flex items-center gap-1`}
          >
            <Github size={14} /> GitHub
          </a>
          <a
            href="mailto:zsombor.pinter0105@gmail.com"
            className={`${textClass} hover:text-red-500 transition-colors flex items-center gap-1`}
          >
            <Mail size={14} /> Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

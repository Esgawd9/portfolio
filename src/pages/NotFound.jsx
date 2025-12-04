import React from "react";
import { Link } from "react-router-dom";
import { Hash } from "lucide-react";
import { THEME } from "../config/theme";

// ==========================================
// COMPONENT: NOT FOUND (404)
// ==========================================
const NotFound = ({ isDarkMode }) => (
  <div className="text-center py-32 animate-in fade-in zoom-in duration-500">
    <div className="inline-block p-6 rounded-full bg-red-50 dark:bg-slate-800 mb-6">
      <Hash size={64} className="text-red-500" />
    </div>
    <h1 className={`text-6xl font-bold mb-4 ${THEME.accent.text}`}>404</h1>
    <p
      className={`text-xl mb-8 ${
        isDarkMode ? "text-slate-400" : "text-stone-600"
      }`}
    >
      Nothing to see here.
    </p>
    <Link
      to="/"
      className={`px-8 py-3 ${THEME.accent.bg} text-white rounded-full font-bold ${THEME.accent.bgHover} transition-transform hover:-translate-y-1 inline-block`}
    >
      Return Home
    </Link>
  </div>
);

export default NotFound;

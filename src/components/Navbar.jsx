import { Link, useLocation } from "react-router-dom";
import { Layers, LogOut, Lock, Sun, Moon } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { THEME } from "../config/theme";

// ==========================================
// COMPONENT: NAVBAR
// ==========================================
const Navbar = ({ isDarkMode, toggleTheme, user, setShowLoginModal }) => {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path
      ? THEME.accent.text
      : `${THEME.accent.textHover}`;
  const navClasses = `${isDarkMode ? THEME.dark.nav : THEME.light.nav} ${
    isDarkMode ? THEME.dark.border : THEME.light.border
  }`;
  const textClasses = isDarkMode ? THEME.dark.text : THEME.light.text;

  return (
    <nav
      className={`sticky top-0 z-40 backdrop-blur-md border-b ${navClasses}`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity"
        >
          <img src="/origami_bird.svg" alt="Origami Bird" className="w-6 h-6" />
          <span className={textClasses}>Portfolio</span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 font-medium text-sm">
            <Link to="/" className={`transition-colors ${isActive("/")}`}>
              Home
            </Link>
            <Link
              to="/gallery"
              className={`transition-colors ${isActive("/gallery")}`}
            >
              Gallery
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <button
                onClick={() => signOut(auth)}
                className={`${THEME.accent.text} text-sm font-bold flex items-center gap-1 mr-2`}
              >
                <LogOut size={16} />
              </button>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className={`opacity-20 hover:opacity-100 transition-opacity mr-2 ${textClasses}`}
              >
                <Lock size={16} />
              </button>
            )}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isDarkMode
                  ? "hover:bg-slate-700 text-yellow-400"
                  : "hover:bg-stone-200 text-stone-600"
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

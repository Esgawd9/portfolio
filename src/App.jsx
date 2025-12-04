import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config/firebase";
import { THEME } from "./config/theme";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import OrigamiDetail from "./pages/OrigamiDetail";
import NotFound from "./pages/NotFound";

// Helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  // Initialize state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // localStorage
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme !== null) {
      return savedTheme === "dark";
    }

    // device preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return true;
    }

    // default light
    return false;
  });

  // save to localStorage on change
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);
  const [user, setUser] = useState(null);

  // login modal state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>
      setUser(currentUser)
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowLoginModal(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Login Failed" + error.message);
    }
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <Router>
      <ScrollToTop />
      <div
        className={`min-h-screen flex flex-col transition-colors duration-300 ${
          isDarkMode
            ? `dark ${THEME.dark.bg} ${THEME.dark.text}`
            : `${THEME.light.bg} ${THEME.light.text}`
        }`}
      >
        <Navbar
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          user={user}
          setShowLoginModal={setShowLoginModal}
        />

        {/* Login Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <form
              onSubmit={handleLogin}
              className="bg-white p-8 rounded-lg shadow-xl w-96 text-black"
            >
              <h2 className="text-xl font-bold mb-4">Admin Access</h2>
              <input
                type="email"
                placeholder="Email"
                className="w-full mb-3 p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full mb-4 p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="px-4 py-2 text-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 ${THEME.accent.bg} text-white rounded ${THEME.accent.bgHover}`}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        )}

        <main className="max-w-6xl mx-auto px-4 py-12 grow w-full">
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
            <Route
              path="/gallery"
              element={<Gallery isDarkMode={isDarkMode} user={user} />}
            />
            <Route
              path="/gallery/:id"
              element={<OrigamiDetail isDarkMode={isDarkMode} />}
            />
            <Route path="*" element={<NotFound isDarkMode={isDarkMode} />} />
          </Routes>
        </main>

        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
};

export default App;

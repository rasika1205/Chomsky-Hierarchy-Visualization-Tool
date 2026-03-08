import { Link, useLocation } from "react-router";
import { Brain, Home, BookOpen, TestTube2, GitBranch, MessageCircle, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

export function Navbar() {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/languages/regular", label: "Languages", icon: BookOpen },
    { path: "/classifier", label: "Classifier", icon: TestTube2 },
    { path: "/dfa-visualizer", label: "DFA Visualizer", icon: GitBranch },
    { path: "/quiz", label: "Quiz", icon: GraduationCap },
    { path: "/chatbot", label: "Chatbot", icon: MessageCircle },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Brain className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <div className="absolute inset-0 bg-purple-500/30 blur-lg group-hover:bg-purple-500/50 transition-all" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Chomsky Explorer
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path}>
                <motion.div
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all relative ${
                    isActive(path)
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive(path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg border border-purple-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="text-sm relative z-10">{label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

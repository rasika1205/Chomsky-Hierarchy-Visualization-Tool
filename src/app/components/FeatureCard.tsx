import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, description, path, delay = 0 }: FeatureCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      onClick={() => navigate(path)}
      className="cursor-pointer group"
    >
      <div className="relative p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-xl border border-purple-500/30 hover:border-purple-500/60 transition-all h-full">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/5 to-blue-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Icon */}
        <div className="relative mb-4">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/30 group-hover:border-purple-400/60 transition-all">
            <Icon className="w-7 h-7 text-purple-400 group-hover:text-purple-300 transition-colors" />
          </div>
          <div className="absolute inset-0 bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Content */}
        <div className="relative">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

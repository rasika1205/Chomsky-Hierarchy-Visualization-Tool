import { motion } from "framer-motion";
import { HierarchyGraph } from "../components/HierarchyGraph";
import { VennDiagram } from "../components/VennDiagram";
import { FeatureCard } from "../components/FeatureCard";
import { TestTube2, GitBranch, MessageCircle, GraduationCap } from "lucide-react";

export function Home() {
  return (
    <div className="min-h-screen pb-20">
      {/* Hierarchy Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Chomsky Hierarchy of Languages
            </h1>
            <p className="text-gray-400 text-lg">
              Explore the four levels of formal languages through interactive visualizations
            </p>
          </motion.div>

          <HierarchyGraph />
        </div>
      </section>

      {/* Venn Diagram Section */}
      <section className="px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              Containment Relationships
            </h2>
            <p className="text-gray-400 text-lg">
              Visual representation of how language classes contain each other
            </p>
            <p className="text-lg font-medium text-center">
  <span className="text-purple-400">Regular</span>
  <span className="mx-2 text-gray-400">⊂</span>
  <span className="text-indigo-400">Context Free</span>
  <span className="mx-2 text-gray-400">⊂</span>
  <span className="text-blue-400">Context Sensitive</span>
  <span className="mx-2 text-gray-400">⊂</span>
  <span className="text-pink-400">Recursively Enumerable</span>
</p>
          </motion.div>

          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl border border-purple-500/30 rounded-xl p-8">
            <VennDiagram />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              Interactive Learning Tools
            </h2>
            <p className="text-gray-400 text-lg">
              Master Theory of Computation through hands-on exploration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={TestTube2}
              title="Language Classifier"
              description="Input a language and determine its class in the Chomsky hierarchy"
              path="/classifier"
              delay={0.7}
            />
            <FeatureCard
              icon={GitBranch}
              title="DFA Visualizer"
              description="Generate and visualize DFA graphs from transition tables"
              path="/dfa-visualizer"
              delay={0.8}
            />
            <FeatureCard
              icon={MessageCircle}
              title="TOC Chatbot"
              description="Ask questions about Theory of Computation and get instant answers"
              path="/chatbot"
              delay={0.9}
            />
            <FeatureCard
              icon={GraduationCap}
              title="Interactive Quiz"
              description="Test your knowledge of language classes with interactive quizzes"
              path="/quiz"
              delay={1.0}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

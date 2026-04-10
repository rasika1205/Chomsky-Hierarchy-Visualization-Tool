import { motion } from "framer-motion";
import { useState } from "react";
import { TestTube2, Sparkles, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

export function Classifier() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    languageClass: string;
    automaton: string;
    explanation: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const classifyLanguage = async () => {
  if (!input.trim()) return;

  setIsLoading(true);

  try {
    const response = await fetch("http://localhost:5000/api/classify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language: input }),
    });

    const data = await response.json();

    setResult({
      languageClass: data.languageClass,
      automaton: data.automaton,
      explanation: data.explanation,
    });

  } catch (error) {
    console.error(error);
  }

  setIsLoading(false);
};

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/30">
              <TestTube2 className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Language Classifier
          </h1>
          <p className="text-gray-400 text-lg">
            Determine which class a language belongs to in the Chomsky hierarchy
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl border border-purple-500/30 rounded-xl p-8"
        >
          <label className="block text-white font-semibold mb-3">Enter a language expression:</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && classifyLanguage()}
            placeholder="e.g., a^n b^n, (a+b)*, a^n b^n c^n"
            className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />

          <button
            onClick={classifyLanguage}
            disabled={!input.trim() || isLoading}
            className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold text-white transition-all flex items-center justify-center space-x-2 group"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Classifying...</span>
              </>
            ) : (
              <>
                <span>Classify Language</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </motion.div>

        {/* Examples */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-gradient-to-br from-purple-900/10 to-blue-900/10 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6"
        >
          <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span>Example Inputs:</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <button
              onClick={() => setInput("a^n b^n")}
              className="text-left px-4 py-2 bg-black/40 border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-all text-gray-300 hover:text-white"
            >
              a^n b^n
            </button>
            <button
              onClick={() => setInput("(a+b)*")}
              className="text-left px-4 py-2 bg-black/40 border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-all text-gray-300 hover:text-white"
            >
              (a+b)*
            </button>
            <button
              onClick={() => setInput("a^n b^n c^n")}
              className="text-left px-4 py-2 bg-black/40 border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-all text-gray-300 hover:text-white"
            >
              a^n b^n c^n
            </button>
            <button
              onClick={() => setInput("balanced parentheses")}
              className="text-left px-4 py-2 bg-black/40 border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-all text-gray-300 hover:text-white"
            >
              balanced parentheses
            </button>
          </div>
        </motion.div>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mt-8 bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-xl border-2 border-purple-500/50 rounded-xl p-8 shadow-2xl"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center border border-purple-500/40">
                <Sparkles className="w-6 h-6 text-purple-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">Classification Result</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-black/40 rounded-lg p-5 border border-purple-500/20">
                <div className="text-sm text-purple-300 mb-1">Language Class</div>
                <div className="text-2xl font-bold text-white">{result.languageClass}</div>
              </div>

              <div className="bg-black/40 rounded-lg p-5 border border-purple-500/20">
                <div className="text-sm text-purple-300 mb-1">Automaton Type</div>
                <div className="text-xl font-semibold text-white">{result.automaton}</div>
              </div>

              <div className="bg-black/40 rounded-lg p-5 border border-purple-500/20">
                <div className="text-sm text-purple-300 mb-2">Explanation</div>
                <div className="text-gray-300 prose prose-invert max-w-none">
                  <ReactMarkdown>
                    {result.explanation}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

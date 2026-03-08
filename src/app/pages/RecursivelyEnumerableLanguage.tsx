import { motion } from "motion/react";
import { ArrowLeft, Info, Cpu, FileText, Lightbulb, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";

interface SectionProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

function Section({ icon: Icon, title, children, delay = 0 }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-all"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
          <Icon className="w-5 h-5 text-purple-400" />
        </div>
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
      </div>
      <div className="text-gray-300 space-y-3">{children}</div>
    </motion.div>
  );
}

export function RecursivelyEnumerableLanguage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Hierarchy</span>
          </button>

          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Recursively Enumerable Languages
          </h1>
          <p className="text-gray-400 text-lg">
            The most powerful class, recognized by Turing machines
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Definition */}
          <Section icon={Info} title="Definition" delay={0.1}>
            <p>
              Recursively enumerable languages (also called{" "}
              <span className="text-purple-400 font-semibold">computably enumerable</span>) represent the broadest
              class in the Chomsky hierarchy. They encompass all languages that can be recognized by a Turing machine.
            </p>
            <p>
              A language L is recursively enumerable if there exists a Turing machine that will accept all strings in L
              and either reject or loop forever on strings not in L.
            </p>
            <p className="text-sm text-purple-300">
              Note: If a Turing machine halts and accepts/rejects for ALL inputs, the language is called{" "}
              <strong>recursive</strong> (or decidable), which is a proper subset of RE languages.
            </p>
          </Section>

          {/* Automaton Type */}
          <Section icon={Cpu} title="Automaton Type" delay={0.2}>
            <p>
              Recursively enumerable languages are recognized by{" "}
              <span className="text-purple-400 font-semibold">Turing Machines</span>:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong className="text-white">Infinite Tape:</strong> Unbounded memory that extends infinitely in both
                directions
              </li>
              <li>
                <strong className="text-white">Read/Write Head:</strong> Can read, write, and move left or right on the
                tape
              </li>
              <li>
                <strong className="text-white">Computational Universality:</strong> Can simulate any algorithm or
                computational process
              </li>
              <li>
                <strong className="text-white">May Not Halt:</strong> For some inputs, the machine might run forever
              </li>
            </ul>
            <p className="mt-3">
              Turing machines are the theoretical foundation of modern computers and define the limits of computation.
            </p>
          </Section>

          {/* Grammar Rules */}
          <Section icon={FileText} title="Grammar Rules" delay={0.3}>
            <p>
              Recursively enumerable languages use{" "}
              <span className="text-purple-400 font-semibold">Type-0 (Unrestricted) Grammars</span>.
            </p>
            <p className="mt-2">Production rules have the form:</p>
            <div className="bg-black/40 rounded-lg p-4 mt-3 font-mono text-sm border border-purple-500/20">
              <div>α → β</div>
            </div>
            <p className="text-sm mt-2">
              where α and β are arbitrary strings of terminals and non-terminals, with the only constraint that α
              contains at least one non-terminal. No restrictions on contractions or expansions.
            </p>
            <div className="bg-black/40 rounded-lg p-4 mt-3 font-mono text-sm border border-purple-500/20">
              <div className="text-purple-300 mb-2">Example productions:</div>
              <div>AB → BA (swap)</div>
              <div>ABC → D (contraction)</div>
              <div>A → BCD (expansion)</div>
            </div>
          </Section>

          {/* Example Languages */}
          <Section icon={Lightbulb} title="Example Languages" delay={0.4}>
            <div className="space-y-3">
              <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
                <div className="text-purple-400 font-semibold mb-2">
                  L₁ = {"{⟨M, w⟩ | M is a TM that accepts w}"}
                </div>
                <div className="text-sm text-gray-400">
                  The acceptance problem for Turing machines (RE but not decidable)
                </div>
              </div>
              <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
                <div className="text-purple-400 font-semibold mb-2">L₂ = All decidable languages</div>
                <div className="text-sm text-gray-400">
                  Every context-sensitive language, context-free language, and regular language
                </div>
              </div>
              <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
                <div className="text-purple-400 font-semibold mb-2">L₃ = {"{⟨M⟩ | M is a TM that halts on ε}"}</div>
                <div className="text-sm text-gray-400">Languages involving Turing machine behavior properties</div>
              </div>
            </div>
          </Section>

          {/* Visual Representation */}
          <Section icon={Cpu} title="Turing Machine Characteristics" delay={0.5}>
            <div className="space-y-4">
              <div className="bg-black/40 rounded-lg p-6 border border-purple-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-400">Infinite Tape</div>
                </div>
                <div className="flex space-x-1 mb-4 overflow-x-auto">
                  <div className="w-12 h-12 border-2 border-gray-600/50 bg-gray-800/30 rounded flex items-center justify-center font-mono text-gray-500">
                    ...
                  </div>
                  {["1", "0", "1", "1", "0", "1"].map((symbol, idx) => (
                    <div
                      key={idx}
                      className={`w-12 h-12 border-2 ${
                        idx === 3 ? "border-purple-500 bg-purple-500/20" : "border-blue-500/50 bg-blue-500/10"
                      } rounded flex items-center justify-center font-mono`}
                    >
                      {symbol}
                    </div>
                  ))}
                  <div className="w-12 h-12 border-2 border-gray-600/50 bg-gray-800/30 rounded flex items-center justify-center font-mono text-gray-500">
                    ...
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                    <span className="text-gray-400">Can read and write symbols</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-gray-400">Can move left or right</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-pink-500 rounded-full" />
                    <span className="text-gray-400">Unbounded computation time and space</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                The Turing machine is the most powerful computational model in the Chomsky hierarchy, capable of
                simulating any algorithm that can be performed by a modern computer.
              </p>
            </div>
          </Section>

          {/* Key Properties */}
          <Section icon={CheckCircle} title="Key Properties" delay={0.6}>
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">Closure Properties:</h3>
                <p className="text-sm">
                  Closed under union, intersection, concatenation, Kleene star, and projection. NOT closed under
                  complementation (the complement of an RE language may not be RE).
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">The Halting Problem:</h3>
                <p className="text-sm">
                  The famous undecidable problem: determining whether an arbitrary Turing machine halts on a given input
                  is impossible. This proves fundamental limits of computation.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Decidable vs. Undecidable:</h3>
                <p className="text-sm">
                  <strong>Decidable (Recursive):</strong> TM halts on all inputs
                  <br />
                  <strong>Undecidable (RE but not Recursive):</strong> TM may loop forever on some inputs
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Church-Turing Thesis:</h3>
                <p className="text-sm">
                  The hypothesis that any effectively calculable function can be computed by a Turing machine. This
                  defines the theoretical limits of computation.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Applications:</h3>
                <p className="text-sm">
                  Foundation of computer science, computability theory, complexity theory, and understanding the
                  theoretical limits of what computers can and cannot do.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

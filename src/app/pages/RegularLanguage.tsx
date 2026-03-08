import { motion } from "motion/react";
import { AutomataGraph } from "../components/AutomataGraph";
import { Node, Edge } from "reactflow";
import { ArrowLeft, Info, Cpu, FileText, Lightbulb, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";

const dfaNodes: Node[] = [
  {
    id: "q0",
    type: "state",
    position: { x: 150, y: 200 },
    data: { label: "q0", isStart: true, isAccept: false },
  },
  {
    id: "q1",
    type: "state",
    position: { x: 450, y: 200 },
    data: { label: "q1", isStart: false, isAccept: true },
  },
];

const dfaEdges: Edge[] = [
  {
    id: "q0-q1",
    source: "q0",
    target: "q1",
    label: "a",
    type: "straight",
    animated: false,
    style: {
      stroke: "#a855f7",
      strokeWidth: 4,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#a855f7",
      width: 20,
      height: 20,
    },
  },
];

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

export function RegularLanguage() {
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
            Regular Languages
          </h1>
          <p className="text-gray-400 text-lg">
            The simplest class in the Chomsky hierarchy, recognized by finite automata
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Definition */}
          <Section icon={Info} title="Definition" delay={0.1}>
            <p>
              Regular languages are the most restrictive class in the Chomsky hierarchy. They can be recognized by{" "}
              <span className="text-purple-400 font-semibold">finite automata</span> (DFA or NFA) without any
              additional memory beyond a fixed number of states.
            </p>
            <p>
              A language L is regular if and only if it can be described by a regular expression or accepted by a
              finite automaton.
            </p>
          </Section>

          {/* Automaton Type */}
          <Section icon={Cpu} title="Automaton Type" delay={0.2}>
            <p>
              Regular languages are recognized by <span className="text-purple-400 font-semibold">Finite Automata</span>:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong className="text-white">DFA (Deterministic Finite Automaton):</strong> For each state and input
                symbol, there is exactly one transition
              </li>
              <li>
                <strong className="text-white">NFA (Nondeterministic Finite Automaton):</strong> Multiple transitions
                are allowed for a given state and input
              </li>
            </ul>
            <p className="mt-3">Both DFA and NFA have equivalent computational power.</p>
          </Section>

          {/* Grammar Rules */}
          <Section icon={FileText} title="Grammar Rules" delay={0.3}>
            <p>
              Regular languages use <span className="text-purple-400 font-semibold">Type-3 (Regular) Grammars</span>.
            </p>
            <p className="mt-2">Production rules must be in one of these forms:</p>
            <div className="bg-black/40 rounded-lg p-4 mt-3 font-mono text-sm border border-purple-500/20">
              <div>A → aB (right-linear)</div>
              <div>A → a</div>
              <div>A → ε</div>
            </div>
            <p className="text-sm mt-2">where A and B are non-terminals, and a is a terminal symbol.</p>
          </Section>

          {/* Example Languages */}
          <Section icon={Lightbulb} title="Example Languages" delay={0.4}>
            <div className="space-y-3">
              <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
                <div className="text-purple-400 font-semibold mb-2">L₁ = (a + b)*</div>
                <div className="text-sm text-gray-400">All strings over alphabet {"{a, b}"}</div>
              </div>
              <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
                <div className="text-purple-400 font-semibold mb-2">L₂ = a*b*</div>
                <div className="text-sm text-gray-400">Zero or more a's followed by zero or more b's</div>
              </div>
              <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
                <div className="text-purple-400 font-semibold mb-2">L₃ = (ab)*</div>
                <div className="text-sm text-gray-400">Even-length strings alternating a and b</div>
              </div>
            </div>
          </Section>

          {/* Visual Automaton */}
          <Section icon={Cpu} title="Example DFA" delay={0.5}>
            <p className="mb-4">
              Below is a DFA that accepts strings containing at least one 'a':
            </p>
            <AutomataGraph nodes={dfaNodes} edges={dfaEdges} />
            <div className="mt-4 flex items-start space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full border-2 border-green-500 bg-green-500/20" />
                <span>Start State</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full border-2 border-purple-500 bg-purple-500/20 ring-2 ring-purple-500/30" />
                <span>Accept State</span>
              </div>
            </div>
          </Section>

          {/* Key Properties */}
          <Section icon={CheckCircle} title="Key Properties" delay={0.6}>
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">Closure Properties:</h3>
                <p className="text-sm">
                  Regular languages are closed under union, intersection, concatenation, Kleene star, and
                  complementation.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Pumping Lemma:</h3>
                <p className="text-sm">
                  If L is regular, then there exists a pumping length p such that any string s in L with |s| ≥ p can
                  be divided into xyz where |xy| ≤ p, |y| {">"} 0, and xy^i z ∈ L for all i ≥ 0.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Limitations:</h3>
                <p className="text-sm">
                  Cannot count unbounded quantities. For example, the language {"{a^n b^n | n ≥ 0}"} is NOT regular
                  because it requires counting a's to match b's.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

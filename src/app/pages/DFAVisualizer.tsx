import { motion } from "framer-motion";
import { useState } from "react";
import { GitBranch, Plus, Trash2, Play } from "lucide-react";
import { AutomataGraph } from "../components/AutomataGraph";
import { Node, Edge } from "reactflow";

interface TransitionRow {
  state: string;
  onA: string;
  onB: string;
  isStart: boolean;
  isAccept: boolean;
}

export function DFAVisualizer() {
  const [transitions, setTransitions] = useState<TransitionRow[]>([
    { state: "q0", onA: "q1", onB: "q0", isStart: true, isAccept: false },
    { state: "q1", onA: "q1", onB: "q1", isStart: false, isAccept: true },
  ]);
  const [generatedGraph, setGeneratedGraph] = useState<string | null>(null);

  const addRow = () => {
    setTransitions([
      ...transitions,
      { state: `q${transitions.length}`, onA: "q0", onB: "q0", isStart: false, isAccept: false },
    ]);
  };

  const removeRow = (index: number) => {
    setTransitions(transitions.filter((_, i) => i !== index));
  };

  const updateTransition = (index: number, field: keyof TransitionRow, value: string | boolean) => {
    const updated = [...transitions];
    updated[index] = { ...updated[index], [field]: value };
    setTransitions(updated);
  };

  const generateDFA = async () => {

  const states = transitions.map(t => t.state)

  const start_state =
    transitions.find(t => t.isStart)?.state || states[0]

  const accept_states =
    transitions.filter(t => t.isAccept).map(t => t.state)

  const edges:any[] = []

  transitions.forEach(t => {

    if (t.onA) {
      edges.push({
        from: t.state,
        to: t.onA,
        symbol: "a"
      })
    }

    if (t.onB) {
      edges.push({
        from: t.state,
        to: t.onB,
        symbol: "b"
      })
    }

  })

  const dfaData = {
    states,
    start_state,
    accept_states,
    transitions: edges
  }

  const res = await fetch("http://127.0.0.1:5000/generate-dfa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dfaData)
  })

  const data = await res.json()

  setGeneratedGraph(data.svg)
}

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/30">
              <GitBranch className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            DFA Visualizer
          </h1>
          <p className="text-gray-400 text-lg">
            Create and visualize Deterministic Finite Automata from transition tables
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Transition Table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Transition Table</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-purple-500/30">
                      <th className="px-3 py-2 text-left text-purple-300">State</th>
                      <th className="px-3 py-2 text-left text-purple-300">On 'a'</th>
                      <th className="px-3 py-2 text-left text-purple-300">On 'b'</th>
                      <th className="px-3 py-2 text-center text-purple-300">Start</th>
                      <th className="px-3 py-2 text-center text-purple-300">Accept</th>
                      <th className="px-3 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {transitions.map((t, idx) => (
                      <tr key={idx} className="border-b border-purple-500/10 hover:bg-purple-500/5">
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={t.state}
                            onChange={(e) => updateTransition(idx, "state", e.target.value)}
                            className="w-full px-2 py-1 bg-black/40 border border-purple-500/20 rounded text-white text-sm focus:outline-none focus:border-purple-500/50"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={t.onA}
                            onChange={(e) => updateTransition(idx, "onA", e.target.value)}
                            className="w-full px-2 py-1 bg-black/40 border border-purple-500/20 rounded text-white text-sm focus:outline-none focus:border-purple-500/50"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={t.onB}
                            onChange={(e) => updateTransition(idx, "onB", e.target.value)}
                            className="w-full px-2 py-1 bg-black/40 border border-purple-500/20 rounded text-white text-sm focus:outline-none focus:border-purple-500/50"
                          />
                        </td>
                        <td className="px-3 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={t.isStart}
                            onChange={(e) => updateTransition(idx, "isStart", e.target.checked)}
                            className="w-4 h-4 accent-purple-500"
                          />
                        </td>
                        <td className="px-3 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={t.isAccept}
                            onChange={(e) => updateTransition(idx, "isAccept", e.target.checked)}
                            className="w-4 h-4 accent-purple-500"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <button
                            onClick={() => removeRow(idx)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex space-x-3">
                <button
                  onClick={addRow}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg text-white transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add State</span>
                </button>

                <button
                  onClick={generateDFA}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg text-white font-semibold transition-all"
                >
                  <Play className="w-4 h-4" />
                  <span>Generate DFA</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Graph Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">DFA Graph</h2>

              {generatedGraph ? (
              <>
                <div
                  className="bg-black/40 p-4 rounded-lg overflow-auto"
                  dangerouslySetInnerHTML={{
                    __html: atob(generatedGraph)
                  }}
                />
                  <div className="mt-4 flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full border-2 border-green-500 bg-green-500/20" />
                      <span className="text-gray-300">Start State</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full border-2 border-purple-500 bg-purple-500/20 ring-2 ring-purple-500/30" />
                      <span className="text-gray-300">Accept State</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-[500px] flex items-center justify-center border-2 border-dashed border-purple-500/30 rounded-xl">
                  <div className="text-center">
                    <GitBranch className="w-16 h-16 text-purple-400/50 mx-auto mb-3" />
                    <p className="text-gray-400">Click "Generate DFA" to visualize your automaton</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

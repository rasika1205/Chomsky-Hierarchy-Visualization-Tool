import { motion } from "framer-motion";
import { useState } from "react";

const layers = [
  {
    name: "Recursively Enumerable",
    example: "All Turing Machine recognizable languages",
    size: 600,
    color: "#ef4444"
  },
  {
    name: "Context Sensitive",
    example: "aⁿbⁿcⁿ",
    size: 460,
    color: "#f59e0b"
  },
  {
    name: "Context Free",
    example: "aⁿbⁿ, balanced parentheses",
    size: 320,
    color: "#3b82f6"
  },
  {
    name: "Regular",
    example: "(a+b)*, a*b*",
    size: 180,
    color: "#10b981"
  }
];

export function VennDiagram() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="flex justify-center items-center h-[650px]">
      <div className="relative flex items-center justify-center">

        {layers.map((layer, i) => (
          <motion.div
            key={layer.name}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            animate={{ scale: active === i ? 1.03 : 1 }}
            className="absolute flex items-center justify-center rounded-full"
            style={{
              width: layer.size,
              height: layer.size,
              border: `3px solid ${layer.color}`,
              backgroundColor: `${layer.color}15`
            }}
          >
            {active === i && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-black/90 border border-purple-500/50 px-4 py-2 rounded-lg text-center"
              >
                <div className="text-white font-semibold">{layer.name}</div>
                <div className="text-purple-300 text-sm">
                  Example: {layer.example}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}

      </div>
    </div>
  );
}

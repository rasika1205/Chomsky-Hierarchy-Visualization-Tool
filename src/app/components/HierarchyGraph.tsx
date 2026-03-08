import { useCallback } from "react";
import { useNavigate } from "react-router";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion } from "framer-motion";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data }: any) => {
  return (
    <motion.div
      className="px-8 py-6 rounded-xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-xl border-2 border-purple-500/50 shadow-2xl cursor-pointer min-w-[280px] relative"
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 40px rgba(168, 85, 247, 0.6)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* TOP HANDLE */}
      <Handle type="target" position={Position.Top}  />

      <div className="text-center">
        <div className="text-2xl font-bold text-white mb-2">
          {data.label}
        </div>
        <div className="text-sm text-purple-300">
          {data.description}
        </div>
      </div>

      {/* BOTTOM HANDLE */}
      <Handle type="source" position={Position.Bottom} />

      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 rounded-xl animate-pulse" />
    </motion.div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 250, y: 0 },
    data: {
      label: "Recursively Enumerable",
      description: "Turing Machine",
      path: "/languages/recursively-enumerable",
    },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 250, y: 150 },
    data: {
      label: "Context Sensitive",
      description: "Linear Bounded Automaton",
      path: "/languages/context-sensitive",
    },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 250, y: 300 },
    data: {
      label: "Context Free",
      description: "Pushdown Automaton",
      path: "/languages/context-free",
    },
  },
  {
    id: "4",
    type: "custom",
    position: { x: 250, y: 450 },
    data: {
      label: "Regular",
      description: "Finite Automaton",
      path: "/languages/regular",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    style: {
      stroke: "#a855f7",
      strokeWidth: 3,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#a855f7",
    },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    style: {
      stroke: "#a855f7",
      strokeWidth: 3,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#a855f7",
    },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    style: {
      stroke: "#a855f7",
      strokeWidth: 3,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#a855f7",
    },
  },
];

export function HierarchyGraph() {
  const navigate = useNavigate();
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback(
    (_event: any, node: Node) => {
      navigate(node.data.path);
    },
    [navigate]
  );

  return (
    <div className="h-[700px] w-full rounded-xl overflow-hidden border border-purple-500/30 bg-black/30 backdrop-blur-sm">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-transparent"
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#a855f7" gap={20} size={1} className="opacity-20" />
        <Controls className="bg-purple-900/50 border border-purple-500/30" />
      </ReactFlow>
    </div>
  );
}

import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { Handle, Position } from "reactflow";
import { motion } from "framer-motion";

const CustomStateNode = ({ data }: any) => {
  return (
    <motion.div
      className={`w-20 h-20 rounded-full flex items-center justify-center border-4 relative ${
        data.isStart
          ? "border-green-500 bg-green-500/20"
          : data.isAccept
          ? "border-purple-500 bg-purple-500/20 ring-4 ring-purple-500/30"
          : "border-blue-500 bg-blue-500/20"
      }`}
      whileHover={{ scale: 1.1 }}
    >
      {/* incoming */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#a855f7" }}
      />

      <span className="text-white text-lg font-bold">{data.label}</span>

      {/* outgoing */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#a855f7" }}
      />
    </motion.div>
  );
};

const nodeTypes = {
  state: CustomStateNode,
};

interface AutomataGraphProps {
  nodes: Node[];
  edges: Edge[];
}

export function AutomataGraph({ nodes, edges }: AutomataGraphProps) {
  const [nodesState, , onNodesChange] = useNodesState(nodes);
  const [edgesState, , onEdgesChange] = useEdgesState(edges);

  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden border border-purple-500/30 bg-black/30 backdrop-blur-sm">
      <ReactFlow
        nodes={nodesState}
        edges={edgesState}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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

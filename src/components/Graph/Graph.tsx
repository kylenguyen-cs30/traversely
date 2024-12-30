import { motion } from "framer-motion";
import { PRESET_NODES, PRESET_EDGES } from "@/constants/graphData";
/* import "@/styles/components/Graph.scss"; */

const Graph = () => {
  return (
    <div className="graph-container">
      <svg className="graph-svg">
        {PRESET_EDGES.map((edge) => {
          const sourceNode = PRESET_NODES.find((n) => n.id === edge.source);
          const targetNode = PRESET_NODES.find((n) => n.id === edge.target);

          if (!sourceNode || !targetNode) return null;

          return (
            <motion.line
              key={edge.id}
              x1={sourceNode.position.x}
              y1={sourceNode.position.y}
              x2={targetNode.position.x}
              y2={targetNode.position.y}
              className={`edge ${edge.visited ? "visited" : ""}`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          );
        })}
        {PRESET_NODES.map((node) => (
          <motion.g key={node.id}>
            <motion.circle
              cx={node.position.x}
              cy={node.position.y}
              r={20}
              className={`node ${node.visited ? "visited" : ""}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
            />
            <motion.text
              x={node.position.x}
              y={node.position.y}
              dy=".3em"
              textAnchor="middle"
              className="node-text"
            >
              {node.value}
            </motion.text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
};

export default Graph;

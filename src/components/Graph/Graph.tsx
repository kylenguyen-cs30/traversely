import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GRAPH_STRUCTURES } from "@/constants/graphData";
import GraphModal from "./GraphModal";
import { GraphStructure } from "@/types/graph";

const Graph = () => {
  const [selectedStructure, setSelectedStructure] =
    useState<GraphStructure | null>(null);
  const [modalStructure, setModalStructure] = useState<GraphStructure | null>(
    null,
  );

  // onmount
  useEffect(() => {
    // set initial structure after checking if GRAPH_STRUCTURES exists and has its structure
    if (GRAPH_STRUCTURES && GRAPH_STRUCTURES.length > 0) {
      setSelectedStructure(GRAPH_STRUCTURES[0]);
    }
    console.log("GRAPH_STRUCTURES:", GRAPH_STRUCTURES); //debug log
  }, []);

  if (!selectedStructure) {
    return <div>Loading...</div>;
  }

  // extract nodes and edges from initialState
  const nodes = Array.from(selectedStructure.initialState.nodes.values());
  const edges = Array.from(selectedStructure.initialState.edges.values());

  return (
    <div className="graph-wrapper">
      <div className="graph-types">
        {GRAPH_STRUCTURES.map((structure) => (
          <motion.div
            key={structure.id}
            className={`graph-type-button ${
              selectedStructure.id === structure.id ? "active" : ""
            }`}
            onClick={() => setSelectedStructure(structure)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {structure.title}
          </motion.div>
        ))}
      </div>

      <div
        className="graph-container"
        onClick={() => setModalStructure(selectedStructure)}
      >
        <svg className="graph-svg" viewBox="0 0 400 400">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="27"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
            </marker>
          </defs>

          {edges.map((edge) => {
            const sourceNode = nodes.find((n) => n.id === edge.source);
            const targetNode = nodes.find((n) => n.id === edge.target);
            if (!sourceNode || !targetNode) return null;

            return (
              <g key={edge.id}>
                <motion.line
                  x1={sourceNode.position.x}
                  y1={sourceNode.position.y}
                  x2={targetNode.position.x}
                  y2={targetNode.position.y}
                  className={`edge ${edge.visited ? "visited" : ""}`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                  markerEnd={edge.directed ? "url(#arrowhead)" : undefined}
                  strokeWidth="2"
                />
                {edge.weight !== undefined && (
                  <text
                    x={(sourceNode.position.x + targetNode.position.x) / 2}
                    y={(sourceNode.position.y + targetNode.position.y) / 2}
                    dy="-5"
                    className="edge-weight"
                  >
                    {edge.weight}
                  </text>
                )}
              </g>
            );
          })}

          {nodes.map((node) => (
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

      <GraphModal
        structure={modalStructure}
        onClose={() => setModalStructure(null)}
      />
    </div>
  );
};

export default Graph;

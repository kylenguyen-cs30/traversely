import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraphStructure } from "@/types/graph";

interface GraphModalProps {
  structure: GraphStructure | null;
  onClose: () => void;
}

const GraphModal: React.FC<GraphModalProps> = ({ structure, onClose }) => {
  /* if the data is not mounted return null */
  if (!structure) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>{structure.title}</h2>
          <p>{structure.description}</p>
          <h3>Applicable Algorithms:</h3>
          <div className="algorithms-list">
            {structure.algorithm.map((algorithm) => (
              <div key={algorithm.id} className="algorithm-card">
                <h4>{algorithm.name}</h4>
                <p>{algorithm.description}</p>
                <div className="complexity">
                  <p>Time Complexity: {algorithm.timeComplexity}</p>
                  <p>Space Complexity: {algorithm.spaceComplexity}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GraphModal;

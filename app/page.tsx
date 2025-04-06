"use client";
import { useState, useEffect, useRef } from "react";
import Graph from "./components/Graph/Graph";
import Controls from "./components/Controls/Controls";
import { Graph as GraphType, Node } from "./types/graph";
import styles from "./styles/Graph.module.scss";
import { bfs } from "./algorithms/bfs";
import { dfs } from "./algorithms/dfs";

export default function Home() {
  // Sample initial  graph - this is what will be displayed
  const initialGraph: GraphType = {
    nodes: [
      { id: "1", label: "A", visited: false, x: 250, y: 50 },
      { id: "2", label: "B", visited: false, x: 100, y: 150 },
      { id: "3", label: "C", visited: false, x: 400, y: 150 },
      { id: "4", label: "D", visited: false, x: 50, y: 300 },
      { id: "5", label: "E", visited: false, x: 250, y: 300 },
      { id: "6", label: "F", visited: false, x: 450, y: 300 },
    ],
    edges: [
      { source: "1", target: "2" },
      { source: "1", target: "3" },
      { source: "2", target: "4" },
      { source: "2", target: "5" },
      { source: "3", target: "5" },
      { source: "3", target: "6" },
      { source: "1", target: "2" },
      { source: "1", target: "2" },
    ],
  };

  const [graph, setGraph] = useState<GraphType>(initialGraph);
  const [algorithm, setAlgorithm] = useState<"bfs" | "dfs">("bfs");
  const [traversalResult, setTraversalResult] = useState<Node[]>([]);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [currentNode, setCurrentNode] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalSteps, setTotalSteps] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const runAlgorithm = () => {
    //reset visualization
    resetVisualization();

    // run the selected algorithm
    const startNodeId = "1"; // start from node A
    const result =
      algorithm === "bfs" ? bfs(graph, startNodeId) : dfs(graph, startNodeId);

    setTraversalResult(result);
    setTotalSteps(result.length);

    // start visualization
    startVisualization(result);
  };

  const startVisualization = (result: Node[]) => {
    if (result.length === 0) return;

    setIsRunning(true);
    setCurrentStep(1);
    setVisitedNodes([result[0].id]);
    setCurrentNode(result[0].id);

    let step = 1;
  };
  // for now just to see the styling in action
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([
    "2",
    "3",
  ]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Graph Algorithm Visualization</h1>
      <h2>Basic Graph Display</h2>

      <Graph
        graph={graph}
        visitedNodes={highlightedNodes}
        currentNode={currentNode}
      />

      <div className={styles.controls}>
        <p>This is a basic graph display using React Flow.</p>
        <p>Node A (red) is the current node.</p>
        <p>Nodes B and C (green) are visited nodes.</p>
      </div>
    </div>
  );
}

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
      { source: "4", target: "5" },
      { source: "5", target: "6" },
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
    console.log("Traversal result: ", result);
    if (!result || result.length === 0) {
      console.log("Result is empty");
      return;
    }

    setIsRunning(true);
    setCurrentStep(1);
    setVisitedNodes([result[0].id]);
    setCurrentNode(result[0].id);

    let step = 1;

    intervalRef.current = setInterval(() => {
      console.log("current step: ", step, "result length", result.length);

      // stop the interval
      if (step >= result.length) {
        console.log("Animation complete or invalid step");
        clearInterval(intervalRef.current!);
        setIsRunning(false);
        return;
      }

      try {
        // capture result[step] outside first
        const currentNodeId = result[step].id;

        setCurrentStep(step + 1);
        // only update if we have a valid result
        if (result[step] && typeof result[step].id === "string") {
          setVisitedNodes((prev) => [...prev, currentNodeId]);
          setCurrentNode(result[step].id);
        } else {
          console.error("Invalid node at step", step);
        }
      } catch (error) {
        console.error("error during animation step : ", error);
        clearInterval(intervalRef.current!);
        setIsRunning(false);
        return;
      }

      // increment the step
      step++;
    }, 500); // 0.5 second interval between step
  };

  const resetVisualization = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setCurrentStep(0);
    setVisitedNodes([]);
    setCurrentNode("");
    setTraversalResult([]);
    setTotalSteps(0);
  };

  // handleNext animation
  const handleNext = () => {
    if (currentStep < traversalResult.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      // update visited node and current node
      setVisitedNodes(
        traversalResult.slice(0, nextStep).map((node) => node.id),
      );
      setCurrentNode(traversalResult[nextStep - 1].id);
    }
  };

  // handlePrev step
  const handlePrev = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);

      // update visited node
      setVisitedNodes(
        traversalResult.slice(0, prevStep).map((node) => node.id),
      );
      setCurrentNode(traversalResult[prevStep - 1].id);
    } else if (currentStep === 1) {
      // reset initial state
      setCurrentStep(0);
      setVisitedNodes([]);
      setCurrentNode("");
    }
  };

  const handleAlgorithmChange = (algo: "bfs" | "dfs") => {
    setAlgorithm(algo);
    resetVisualization();
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

      <div className={styles.graphContainer}>
        <Graph
          graph={graph}
          visitedNodes={visitedNodes}
          currentNode={currentNode}
        />
      </div>

      <Controls
        onRunAlgorithm={runAlgorithm}
        onNext={handleNext}
        onPrev={handlePrev}
        onReset={resetVisualization}
        onAlgorithmChange={handleAlgorithmChange}
        selectedAlgorithm={algorithm}
        isRunning={isRunning}
        currentStep={currentStep}
        totalSteps={totalSteps}
      ></Controls>

      <div className={styles.traversalPath}>
        <div className={styles.traversalPathTitle}>Traversal Path:</div>
        <div>
          {visitedNodes.length > 0
            ? visitedNodes
                .map((id) => {
                  const node = graph.nodes.find((n) => n.id === id);
                  return node ? node.label : id;
                })
                .join(" ➡️")
            : "Run Algorithm to see the traveral path"}
        </div>
      </div>
    </div>
  );
}

"use client";
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  MarkerType,
} from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";
import "@xyflow/react/dist/style.css";
import styles from "@/app/styles/Graph.module.scss";
import { Graph as GraphType, Node as GraphNode } from "@/app/types/graph";

interface GraphProps {
  graph: GraphType;
  visitedNodes: string[];
  currentNode?: string;
}

const Graph = ({ graph, visitedNodes, currentNode }: GraphProps) => {
  // convert our graph model to react flow nodes
  const createReactFlowNodes = useCallback(
    (graphData: GraphType, visited: string[], current?: string) => {
      return graphData.nodes.map((node) => {
        // determine node style based on state
        let className = styles.flowNode;

        if (current === node.id) {
          // current node being processed
          className += ` ${styles.currentNode}`;
        } else if (visited.includes(node.id)) {
          // already visited node
          className += ` ${styles.visitedNode}`;
        } else {
          // default node
          className += ` ${styles.defaultNode}`;
        }

        return {
          id: node.id,
          data: { label: node.label },
          position: { x: node.x || 0, y: node.y || 0 },
          className,
        } as Node;
      });
    },
    [],
  );

  // convert our graph model to React Flow edges
  const createReactFlowEdges = useCallback((graphData: GraphType) => {
    return graphData.edges.map((edge) => ({
      id: `e${edge.source}-${edge.target}`,
      source: edge.source,
      target: edge.target,
      type: "default",
      animated: false,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    })) as Edge[];
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Update nodes and edges when graph, visitedNodes, or currentNode changes

  useEffect(() => {
    const flowNodes = createReactFlowNodes(graph, visitedNodes, currentNode);
    const flowEdges = createReactFlowEdges(graph);

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [
    graph,
    visitedNodes,
    currentNode,
    createReactFlowNodes,
    createReactFlowEdges,
    setEdges,
  ]);

  return (
    <div className={styles.graphContainer}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-left"
        connectionLineType={ConnectionLineType.SmoothStep}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default Graph;

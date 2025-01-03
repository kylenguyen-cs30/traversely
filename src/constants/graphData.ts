// src/constants/graphData.ts
import {
  Node,
  Edge,
  Algorithm,
  GraphStructure,
  GraphState,
  NodeMap,
} from "@/types/graph";

const algorithms: Algorithm[] = [
  {
    id: "bfs",
    name: "Breath-First Search",
    description:
      "Explores nodes level by level, useful for finding shortest path in unweighted graphs.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    applicableTypes: ["undirected", "directed", "bst", "balanced-tree"],
  },

  {
    id: "dfs",
    name: "Depth-First Search",
    description:
      "Explores as far as possible along each branch before backtracking.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    applicableTypes: ["undirected", "directed", "bst", "balanced-tree"],
  },
  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    description:
      "Finds the shortest paths in weighted graphs with non-negative weights.",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)",
    applicableTypes: ["weighted"],
  },
  {
    id: "astar",
    name: "A* Search Algorithm",
    description: "Find the shortest path using heuristics to guide the search",
    timeComplexity: "O(E)",
    spaceComplexity: "O(V)",
    applicableTypes: ["undirected", "directed", "bst", "balanced-tree"],
  },
];

// helper function to create NodeMap and Edgemap
const createGraphState = (nodes: Node[], edges: Edge[]): GraphState => {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const edgeMap = new Map(edges.map((edge) => [edge.id, edge]));

  return {
    nodes: nodeMap,
    edges: edgeMap,
    selectedNode: null,
    algorithm: null,
    isPlaying: false,
    speed: 1,
  };
};

export const GRAPH_STRUCTURES: GraphStructure[] = [
  /* NOTE: undirected graph descritption */

  {
    id: "undirected",
    title: "Undirected Graph",
    type: "graph",
    subtype: "undirected",
    description:
      "A graph where edges have no direction, representing symmetric relationships.",
    algorithms: [
      algorithms.find((a) => a.id === "bfs"),
      algorithms.find((a) => a.id === "dfs"),
    ],
    initialState: createGraphState(
      [
        { id: "1", position: { x: 100, y: 100 }, value: "1", distance: 0 },
        { id: "2", position: { x: 200, y: 100 }, value: "2", distance: 0 },
        { id: "3", position: { x: 300, y: 100 }, value: "3", distance: 0 },
        { id: "4", position: { x: 200, y: 200 }, value: "4", distance: 0 },
      ],
      [
        { id: "e1-2", source: "1", target: "2" },
        { id: "e2-3", source: "2", target: "3" },
        { id: "e2-4", source: "2", target: "4" },
        { id: "e3-4", source: "3", target: "4" },
      ],
    ),
  },
  /* NOTE: directed graph descritption */
  {
    id: "directed",
    title: "Directed Graph",
    type: "graph",
    subtype: "directed",
    description:
      "A graph where edges have direction, representing one-way relationships.",
    algorithms: [
      algorithms.find((a) => a.id === "bfs"),
      algorithms.find((a) => a.id === "dfs"),
    ],
    initialState: createGraphState(
      [
        { id: "1", position: { x: 100, y: 100 }, value: "1", distance: 0 },
        { id: "2", position: { x: 200, y: 100 }, value: "2", distance: 0 },
        { id: "3", position: { x: 300, y: 100 }, value: "3", distance: 0 },
        { id: "4", position: { x: 200, y: 200 }, value: "4", distance: 0 },
      ],
      [
        { id: "e1-2", source: "1", target: "2", directed: true },
        { id: "e2-3", source: "2", target: "3", directed: true },
        { id: "e2-4", source: "2", target: "4", directed: true },
        { id: "e3-4", source: "3", target: "4", directed: true },
      ],
    ),
  },

  /* NOTE: weighted graph descritption */

  {
    id: "weighted",
    title: "Weighted Graph",
    type: "graph",
    subtype: "weighted",
    description:
      "A graph where edges have weights, representing costs or distances.",
    algorithms: [
      algorithms.find((a) => a.id === "dijkstra"),
      algorithms.find((a) => a.id === "astar"),
    ],
    initialState: createGraphState(
      [
        { id: "1", position: { x: 100, y: 100 }, value: "1", distance: 0 },
        { id: "2", position: { x: 200, y: 100 }, value: "2", distance: 0 },
        { id: "3", position: { x: 300, y: 100 }, value: "3", distance: 0 },
        { id: "4", position: { x: 200, y: 200 }, value: "4", distance: 0 },
      ],
      [
        { id: "e1-2", source: "1", target: "2", weight: 4 },
        { id: "e2-3", source: "2", target: "3", weight: 2 },
        { id: "e2-4", source: "2", target: "4", weight: 3 },
        { id: "e3-4", source: "3", target: "4", weight: 1 },
      ],
    ),
  },

  /* NOTE: bst graph descritption */
  {
    id: "bst",
    title: "Binary Search Tree",
    type: "tree",
    subtype: "bst",
    description:
      "A binary tree where left subtree contains smaller values and right subtree contains larger values.",
    algorithms: [
      algorithms.find((a) => a.id === "bfs"),
      algorithms.find((a) => a.id === "dfs"),
    ],
    initialState: createGraphState(
      [
        {
          id: "1",
          position: { x: 200, y: 50 },
          value: 8,
          distance: 0,
          type: "root",
        },
        { id: "2", position: { x: 100, y: 150 }, value: 3, distance: 0 },
        { id: "3", position: { x: 300, y: 150 }, value: 10, distance: 0 },
        { id: "4", position: { x: 50, y: 250 }, value: 1, distance: 0 },
        { id: "5", position: { x: 150, y: 250 }, value: 6, distance: 0 },
      ],
      [
        { id: "e1-2", source: "1", target: "2" },
        { id: "e1-3", source: "1", target: "3" },
        { id: "e2-4", source: "2", target: "4" },
        { id: "e2-5", source: "2", target: "5" },
      ],
    ),
  },
];
